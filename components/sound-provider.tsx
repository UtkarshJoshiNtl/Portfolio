"use client"

import { useCallback, useRef, createContext, useContext, useState, useEffect } from "react"

type SoundContextType = {
    playClick: () => void
    playHover: () => void
    playWhoosh: () => void
    playPop: () => void
    isMuted: boolean
    toggleMute: () => void
}

const SoundContext = createContext<SoundContextType>({
    playClick: () => { },
    playHover: () => { },
    playWhoosh: () => { },
    playPop: () => { },
    isMuted: false,
    toggleMute: () => { },
})

export function useSounds() {
    return useContext(SoundContext)
}

// Generate sounds with Web Audio API (no external files needed)
function createSynth(audioCtx: AudioContext, type: OscillatorType, freq: number, duration: number, volume: number = 0.08) {
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
    gain.gain.setValueAtTime(volume, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start()
    osc.stop(audioCtx.currentTime + duration)
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const audioCtxRef = useRef<AudioContext | null>(null)
    const [isMuted, setIsMuted] = useState(true) // muted by default

    const getCtx = useCallback(() => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext()
        }
        if (audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume()
        }
        return audioCtxRef.current
    }, [])

    const playClick = useCallback(() => {
        if (isMuted) return
        const ctx = getCtx()
        createSynth(ctx, "square", 800, 0.06, 0.04)
    }, [isMuted, getCtx])

    const playHover = useCallback(() => {
        if (isMuted) return
        const ctx = getCtx()
        createSynth(ctx, "sine", 1200, 0.04, 0.02)
    }, [isMuted, getCtx])

    const playWhoosh = useCallback(() => {
        if (isMuted) return
        const ctx = getCtx()
        // White noise burst for whoosh
        const bufferSize = ctx.sampleRate * 0.15
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
        }
        const source = ctx.createBufferSource()
        source.buffer = buffer
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.03, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
        const filter = ctx.createBiquadFilter()
        filter.type = "highpass"
        filter.frequency.value = 2000
        source.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        source.start()
    }, [isMuted, getCtx])

    const playPop = useCallback(() => {
        if (isMuted) return
        const ctx = getCtx()
        createSynth(ctx, "sine", 600, 0.08, 0.06)
        setTimeout(() => createSynth(ctx, "sine", 900, 0.05, 0.03), 30)
    }, [isMuted, getCtx])

    const toggleMute = useCallback(() => {
        setIsMuted((prev) => !prev)
    }, [])

    return (
        <SoundContext.Provider value={{ playClick, playHover, playWhoosh, playPop, isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    )
}
