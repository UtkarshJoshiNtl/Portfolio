"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

// ─── Tilt Tile Component ───
export function Tile({
    children,
    className = "",
    delay = 0,
    onClick
}: {
    children: React.ReactNode
    className?: string
    delay?: number
    onClick?: () => void
}) {
    const ref = useRef<HTMLDivElement>(null)

    // Mouse position from center (0 = center, 1 = edge)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spring physics for smooth tilt
    const mouseX = useSpring(x, { stiffness: 500, damping: 30 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 30 })

    // Transform to rotation
    // Tilt range: -8deg to +8deg
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        // Normalized coordinates (-0.5 to 0.5)
        const mouseXPos = (e.clientX - rect.left) / width - 0.5
        const mouseYPos = (e.clientY - rect.top) / height - 0.5
        x.set(mouseXPos)
        y.set(mouseYPos)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: delay * 0.05
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`relative group ${className} ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div
                style={{ transform: "translateZ(0px)" }}
                className="absolute inset-0 bg-[#0a0a12] border border-white/[0.08] shadow-2xl overflow-hidden transition-colors duration-300 md:group-hover:border-accent/40"
            >
                {/* Accent Overlay on Hover */}
                <div className="absolute inset-0 bg-accent opacity-0 md:group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none" />

                {/* Content Container */}
                <div className="relative h-full w-full p-6 flex flex-col pointer-events-none">
                    {children}
                </div>
            </div>
        </motion.div>
    )
}

// ─── Metro Grid Layout ───
export function MetroGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative z-10 w-full min-h-screen p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] gap-4">
                {children}
            </div>
        </div>
    )
}
