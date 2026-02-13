"use client"

import { useRef, useMemo, useState, useEffect, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// ─── Theme Color Hook ───
function useAccentColor() {
    const [color, setColor] = useState("#a855f7")

    useEffect(() => {
        const resolve = () => {
            const accent = getComputedStyle(document.documentElement)
                .getPropertyValue("--accent")
                .trim()
            if (accent) setColor(accent)
        }
        resolve()
        const observer = new MutationObserver(resolve)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-accent"],
        })
        return () => observer.disconnect()
    }, [])

    return color
}

// ─── Interactive Wireframe Sphere ───
function InteractiveSphere({
    mouse,
    clicked,
    accent,
}: {
    mouse: React.MutableRefObject<{ x: number; y: number }>
    clicked: React.MutableRefObject<number>
    accent: string
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const wireRef = useRef<THREE.LineSegments>(null)
    const glowRef = useRef<THREE.Mesh>(null)
    const basePositions = useRef<Float32Array | null>(null)
    const currentDistort = useRef(0)
    const clickWave = useRef(0)

    const geo = useMemo(() => {
        const g = new THREE.IcosahedronGeometry(1.8, 4)
        basePositions.current = new Float32Array(g.attributes.position.array)
        return g
    }, [])

    const edges = useMemo(() => new THREE.EdgesGeometry(geo, 15), [geo])

    const accentColor = useMemo(() => new THREE.Color(accent), [accent])
    const darkAccent = useMemo(() => {
        const c = new THREE.Color(accent)
        c.multiplyScalar(0.3)
        return c
    }, [accent])

    useFrame((state) => {
        if (!meshRef.current || !basePositions.current) return
        const t = state.clock.getElapsedTime()
        const positions = geo.attributes.position.array as Float32Array
        const base = basePositions.current

        // Mouse proximity factor (0..1)
        const mx = mouse.current.x
        const my = mouse.current.y
        const mouseDist = Math.sqrt(mx * mx + my * my)
        const proximity = Math.max(0, 1 - mouseDist * 0.8)

        // Target distortion based on mouse proximity
        const targetDistort = proximity * 0.35
        currentDistort.current += (targetDistort - currentDistort.current) * 0.08

        // Click ripple decay
        if (clicked.current > 0) {
            clickWave.current = 1.0
            clicked.current = 0
        }
        clickWave.current *= 0.94

        // Vertex distortion
        for (let i = 0; i < positions.length; i += 3) {
            const bx = base[i], by = base[i + 1], bz = base[i + 2]
            const len = Math.sqrt(bx * bx + by * by + bz * bz)
            const nx = bx / len, ny = by / len, nz = bz / len

            // Organic noise-like distortion
            const noise = Math.sin(bx * 3 + t * 0.8) * Math.cos(by * 2.5 + t * 0.6) * Math.sin(bz * 2 + t * 0.4)

            // Mouse pull: vertices facing mouse get pulled outward
            const mousePull = (nx * mx + ny * my) * currentDistort.current

            // Click ripple
            const ripple = clickWave.current * Math.sin(len * 8 - t * 12) * 0.15

            const d = noise * 0.06 * (1 + proximity * 2) + mousePull * 0.3 + ripple

            positions[i] = bx + nx * d
            positions[i + 1] = by + ny * d
            positions[i + 2] = bz + nz * d
        }
        geo.attributes.position.needsUpdate = true
        geo.computeVertexNormals()

        // Rotation
        meshRef.current.rotation.y = t * 0.08
        meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.12

        // Parallax position
        meshRef.current.position.x += (mx * 0.6 - meshRef.current.position.x) * 0.03
        meshRef.current.position.y += (my * 0.4 - meshRef.current.position.y) * 0.03

        if (wireRef.current) {
            wireRef.current.rotation.copy(meshRef.current.rotation)
            wireRef.current.position.copy(meshRef.current.position)
        }
        if (glowRef.current) {
            glowRef.current.rotation.copy(meshRef.current.rotation)
            glowRef.current.position.copy(meshRef.current.position)
            const glowScale = 1.02 + proximity * 0.06 + clickWave.current * 0.08
            glowRef.current.scale.setScalar(glowScale)
        }
    })

    return (
        <group>
            {/* Solid inner mesh — very dark, barely visible */}
            <mesh ref={meshRef} geometry={geo}>
                <meshStandardMaterial
                    color="#080808"
                    emissive={darkAccent}
                    emissiveIntensity={0.4}
                    roughness={0.7}
                    metalness={0.3}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Wireframe overlay — the main visual */}
            <lineSegments ref={wireRef} geometry={edges}>
                <lineBasicMaterial
                    color={accentColor}
                    transparent
                    opacity={0.5}
                    linewidth={1}
                />
            </lineSegments>

            {/* Glow shell */}
            <mesh ref={glowRef} geometry={geo}>
                <meshBasicMaterial
                    color={accentColor}
                    transparent
                    opacity={0.04}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    )
}

// ─── Mouse Trail Particles ───
function TrailParticles({
    mouse,
    accent,
}: {
    mouse: React.MutableRefObject<{ x: number; y: number }>
    accent: string
}) {
    const pointsRef = useRef<THREE.Points>(null)
    const trailCount = 80
    const trailIdx = useRef(0)

    const positions = useMemo(() => new Float32Array(trailCount * 3), [])
    const opacities = useMemo(() => {
        const arr = new Float32Array(trailCount)
        arr.fill(0)
        return arr
    }, [])

    const accentColor = useMemo(() => new THREE.Color(accent), [accent])

    useFrame((state) => {
        if (!pointsRef.current) return
        const { viewport } = state

        // Add new trail point at mouse position
        const i = trailIdx.current % trailCount
        positions[i * 3] = mouse.current.x * viewport.width * 0.5
        positions[i * 3 + 1] = mouse.current.y * viewport.height * 0.5
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5
        opacities[i] = 0.7
        trailIdx.current++

        // Fade all
        for (let j = 0; j < trailCount; j++) {
            opacities[j] *= 0.96
            if (opacities[j] < 0.01) opacities[j] = 0
        }

        const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
        posAttr.needsUpdate = true
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color={accentColor}
                size={0.04}
                transparent
                opacity={0.35}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

// ─── Ambient Floating Particles ───
function AmbientParticles({ accent }: { accent: string }) {
    const ref = useRef<THREE.Points>(null)
    const count = 300

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 18
            arr[i * 3 + 1] = (Math.random() - 0.5) * 12
            arr[i * 3 + 2] = (Math.random() - 0.5) * 8
        }
        return arr
    }, [])

    const accentColor = useMemo(() => new THREE.Color(accent), [accent])

    useFrame((state) => {
        if (!ref.current) return
        const t = state.clock.getElapsedTime()
        ref.current.rotation.y = t * 0.015
        ref.current.rotation.x = Math.sin(t * 0.08) * 0.03
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color={accentColor}
                size={0.02}
                transparent
                opacity={0.25}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

// ─── Main Scene Export ───
export function Scene3D() {
    const mouse = useRef({ x: 0, y: 0 })
    const clicked = useRef(0)
    const accent = useAccentColor()

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }, [])

    const handleClick = useCallback(() => {
        clicked.current = 1
    }, [])

    return (
        <div
            className="fixed inset-0 z-0"
            style={{ pointerEvents: "none" }}
        >
            <div
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                style={{ position: "fixed", inset: 0, pointerEvents: "auto", zIndex: 0 }}
            >
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 50 }}
                    dpr={[1, 1.5]}
                    gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                    style={{ background: "transparent" }}
                >
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
                    <pointLight
                        position={[0, 3, 3]}
                        intensity={0.5}
                        color={accent}
                    />
                    <pointLight
                        position={[-4, -2, 2]}
                        intensity={0.3}
                        color={accent}
                    />

                    <InteractiveSphere mouse={mouse} clicked={clicked} accent={accent} />
                    <TrailParticles mouse={mouse} accent={accent} />
                    <AmbientParticles accent={accent} />
                </Canvas>
            </div>
        </div>
    )
}
