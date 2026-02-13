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
        // Initial delay to let CSS load
        setTimeout(resolve, 100)

        const observer = new MutationObserver(resolve)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-accent"],
        })
        return () => observer.disconnect()
    }, [])

    return color
}

// ─── Fluid Distortion Plane ───
// A plane that covers the screen and distorts based on mouse movement
const FluidShader = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uAccent: { value: new THREE.Color("#a855f7") },
        uResolution: { value: new THREE.Vector2(1, 1) }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uAccent;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Correct aspect ratio
      vec2 st = gl_FragCoord.xy / uResolution.xy;
      st.x *= uResolution.x / uResolution.y;
      
      vec2 mouse = uMouse;
      mouse.x *= uResolution.x / uResolution.y;

      // Distance from mouse
      float dist = distance(st, mouse);
      
      // Ripple effect
      float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.03;
      
      // Fluid noise background
      float noise = snoise(st * 3.0 + uTime * 0.1);
      
      // Combine for liquid-like distortion
      float intensity = 0.0;
      intensity += 0.1 / (dist + 0.1); // Glow near mouse
      intensity += noise * 0.05;
      intensity += ripple * (1.0 - min(dist, 1.0)); // Ripples fade out

      // Color mixing
      vec3 color = mix(vec3(0.02), uAccent, intensity * 0.6);
      
      // Add subtle grid lines
      float grid = step(0.98, fract(st.x * 20.0)) + step(0.98, fract(st.y * 20.0));
      color += vec3(grid * 0.03);

      gl_FragColor = vec4(color, 1.0);
    }
  `
}

function FluidBackground({ mouse, accent }: { mouse: React.MutableRefObject<{ x: number, y: number }>, accent: string }) {
    const mesh = useRef<THREE.Mesh>(null)
    const material = useRef<THREE.ShaderMaterial>(null)
    const { size } = useThree()

    // Smooth mouse interpolation
    const smoothMouse = useRef(new THREE.Vector2(0, 0))

    useFrame((state) => {
        if (!material.current) return

        // Update uniforms
        material.current.uniforms.uTime.value = state.clock.getElapsedTime()
        material.current.uniforms.uResolution.value.set(size.width, size.height)
        material.current.uniforms.uAccent.value.set(accent)

        // Lerp mouse
        smoothMouse.current.x += (mouse.current.x * 0.5 + 0.5 - smoothMouse.current.x) * 0.1
        smoothMouse.current.y += (mouse.current.y * 0.5 + 0.5 - smoothMouse.current.y) * 0.1
        material.current.uniforms.uMouse.value.copy(smoothMouse.current)
    })

    return (
        <mesh ref={mesh} scale={[size.width, size.height, 1]}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={material}
                args={[FluidShader]}
                transparent
                depthWrite={false}
            />
        </mesh>
    )
}

// ─── Main Scene Export ───
export function Scene3D() {
    const mouse = useRef({ x: 0, y: 0 })
    const accent = useAccentColor()

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }, [])

    return (
        <div className="fixed inset-0 z-0 bg-background">
            <div
                onMouseMove={handleMouseMove}
                className="absolute inset-0 z-10"
            >
                <Canvas
                    camera={{ position: [0, 0, 1] }}
                    gl={{ alpha: true, antialias: true }}
                >
                    <FluidBackground mouse={mouse} accent={accent} />
                </Canvas>
            </div>
        </div>
    )
}
