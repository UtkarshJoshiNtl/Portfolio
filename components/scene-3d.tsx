"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Float } from "@react-three/drei"
import * as THREE from "three"

function LiquidBlob({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<any>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.getElapsedTime()

        // Slow rotation
        meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15
        meshRef.current.rotation.y = t * 0.15

        // Follow mouse gently
        const targetX = mouse.current.x * 0.8
        const targetY = mouse.current.y * 0.5
        meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02
        meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02

        // Pulsing distortion
        if (materialRef.current) {
            materialRef.current.distort = 0.3 + Math.sin(t * 0.8) * 0.1
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={2.2}>
                <icosahedronGeometry args={[1, 8]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#a855f7"
                    emissive="#4c1d95"
                    emissiveIntensity={0.3}
                    roughness={0.15}
                    metalness={0.9}
                    distort={0.35}
                    speed={1.8}
                    transparent
                    opacity={0.85}
                />
            </mesh>
        </Float>
    )
}

function CodeParticles() {
    const particlesRef = useRef<THREE.Points>(null)
    const count = 600

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const sz = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20
            pos[i * 3 + 1] = (Math.random() - 0.5) * 14
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10
            sz[i] = Math.random() * 2 + 0.5
        }
        return [pos, sz]
    }, [])

    useFrame((state) => {
        if (!particlesRef.current) return
        const t = state.clock.getElapsedTime()
        particlesRef.current.rotation.y = t * 0.02
        particlesRef.current.rotation.x = Math.sin(t * 0.1) * 0.05
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#a855f7"
                size={0.03}
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

export function Scene3D() {
    const mouse = useRef({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-auto"
            onMouseMove={handleMouseMove}
            style={{ pointerEvents: "none" }}
        >
            <div onMouseMove={handleMouseMove} style={{ position: "fixed", inset: 0, pointerEvents: "auto", zIndex: 0 }}>
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 50 }}
                    dpr={[1, 1.5]}
                    gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                    style={{ background: "transparent" }}
                >
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
                    <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#a855f7" />
                    <pointLight position={[0, 3, 2]} intensity={0.6} color="#a855f7" />

                    <LiquidBlob mouse={mouse} />
                    <CodeParticles />
                </Canvas>
            </div>
        </div>
    )
}
