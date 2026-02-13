"use client"

import { useCallback, useRef, createContext, useContext, useState } from "react"

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

// ─── Helpers ───

function createReverb(ctx: AudioContext, duration: number = 0.3, decay: number = 2): ConvolverNode {
    const length = ctx.sampleRate * duration
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
        const data = impulse.getChannelData(ch)
        for (let i = 0; i < length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
        }
    }
    const conv = ctx.createConvolver()
    conv.buffer = impulse
    return conv
}

function envelope(
    gain: GainNode,
    ctx: AudioContext,
    peak: number,
    attack: number,
    decay: number,
    sustain: number,
    release: number,
    sustainDur: number = 0
) {
    const now = ctx.currentTime
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(peak, now + attack)
    gain.gain.linearRampToValueAtTime(peak * sustain, now + attack + decay)
    if (sustainDur > 0) {
        gain.gain.setValueAtTime(peak * sustain, now + attack + decay + sustainDur)
    }
    gain.gain.exponentialRampToValueAtTime(0.001, now + attack + decay + sustainDur + release)
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const audioCtxRef = useRef<AudioContext | null>(null)
    const [isMuted, setIsMuted] = useState(true)

    const getCtx = useCallback(() => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext()
        }
        if (audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume()
        }
        return audioCtxRef.current
    }, [])

    // ─── Click: Low thud + high snap + noise transient ───
    const playClick = useCallback(() => {
        if (isMuted) return
        const ctx = getCtx()
        const master = ctx.createGain()
        master.gain.value = 0.12
        const reverb = createReverb(ctx, 0.15, 3)
        const dry = ctx.createGain()
        dry.gain.value = 0.8
        const wet = ctx.createGain()
        wet.gain.value = 0.2
        master.connect(dry).connect(ctx.destination)
        master.connect(reverb).connect(wet).connect(ctx.destination)

        // Low thud
        const thud = ctx.createOscillator()
        const thudGain = ctx.createGain()
        thud.type = "sine"
        thud.frequency.setValueAtTime(180, ctx.currentTime)
        thud.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08)
        envelope(thudGain, ctx, 0.15, 0.003, 0.02, 0.2, 0.06)
        thud.connect(thudGain).connect(master)
        thud.start()
        thud.stop(ctx.currentTime + 0.12)

        // High snap
        const snap = ctx.createOscillator()
        const snapGain = ctx.createGain()
        snap.type = "triangle"
        snap.frequency.setValueAtTime(2200, ctx.currentTime)
        snap.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04)
        envelope(snapGain, ctx, 0.06, 0.001, 0.015, 0.1, 0.04)
        snap.connect(snapGain).connect(master)
        snap.start()
        snap.stop(ctx.currentTime + 0.08)

        // Noise transient
        const bufferSize = Math.floor(ctx.sampleRate * 0.03)
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
        }
        const noise = ctx.createBufferSource()
        noise.buffer = buffer
        const noiseGain = ctx.createGain()
        envelope(noiseGain, ctx, 0.04, 0.001, 0.01, 0.1, 0.02)
        const hpf = ctx.createBiquadFilter()
        hpf.type = "highpass"
        hpf.frequency.value = 4000
        noise.connect(hpf).connect(noiseGain).connect(master)
        noise.start()
    }, [isMuted, getCtx])

    // ─── Hover: Pitch-sweep sine with reverb tail ───
    const playHover = useCallback(() => {
        if (isMuted) return
        const ctx = getCtx()
        const master = ctx.createGain()
        master.gain.value = 0.08
        const reverb = createReverb(ctx, 0.2, 2.5)
        const wet = ctx.createGain()
        wet.gain.value = 0.3
        master.connect(ctx.destination)
        master.connect(reverb).connect(wet).connect(ctx.destination)

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(800, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.08)
        envelope(gain, ctx, 0.08, 0.005, 0.03, 0.3, 0.08)
        osc.connect(gain).connect(master)
        osc.start()
        osc.stop(ctx.currentTime + 0.15)

        // Subtle harmonic
        const harm = ctx.createOscillator()
        const harmGain = ctx.createGain()
        harm.type = "sine"
        harm.frequency.setValueAtTime(1600, ctx.currentTime)
        harm.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + 0.08)
        envelope(harmGain, ctx, 0.02, 0.005, 0.02, 0.2, 0.06)
        harm.connect(harmGain).connect(master)
        harm.start()
        harm.stop(ctx.currentTime + 0.12)
    }, [isMuted, getCtx])

    // ─── Whoosh: Brown noise sweep with bandpass sweep ───
    const playWhoosh = useCallback(() => {
        if (isMuted) return
        const ctx = getCtx()
        const duration = 0.3
        const bufferSize = Math.floor(ctx.sampleRate * duration)
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)

        // Brown noise (integrated white noise)
        let lastVal = 0
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1
            lastVal = (lastVal + 0.02 * white) / 1.02
            data[i] = lastVal * 3.5
        }

        const source = ctx.createBufferSource()
        source.buffer = buffer
        const gain = ctx.createGain()
        envelope(gain, ctx, 0.08, 0.02, 0.08, 0.4, 0.15, 0.05)

        const bpf = ctx.createBiquadFilter()
        bpf.type = "bandpass"
        bpf.Q.value = 1.5
        bpf.frequency.setValueAtTime(500, ctx.currentTime)
        bpf.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + duration * 0.6)
        bpf.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + duration)

        const reverb = createReverb(ctx, 0.25, 2)
        const wet = ctx.createGain()
        wet.gain.value = 0.25

        source.connect(bpf).connect(gain).connect(ctx.destination)
        gain.connect(reverb).connect(wet).connect(ctx.destination)
        source.start()
    }, [isMuted, getCtx])

    // ─── Pop: Fast pitch drop + resonant filter + reverb ───
    const playPop = useCallback(() => {
        if (isMuted) return
        const ctx = getCtx()
        const master = ctx.createGain()
        master.gain.value = 0.14

        const reverb = createReverb(ctx, 0.2, 2)
        const wet = ctx.createGain()
        wet.gain.value = 0.3
        master.connect(ctx.destination)
        master.connect(reverb).connect(wet).connect(ctx.destination)

        // Main bubble
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(1000, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08)
        envelope(gain, ctx, 0.12, 0.002, 0.03, 0.3, 0.08)

        const lpf = ctx.createBiquadFilter()
        lpf.type = "lowpass"
        lpf.frequency.value = 2000
        lpf.Q.value = 5

        osc.connect(lpf).connect(gain).connect(master)
        osc.start()
        osc.stop(ctx.currentTime + 0.15)

        // Upper harmonic ping
        const ping = ctx.createOscillator()
        const pingGain = ctx.createGain()
        ping.type = "sine"
        ping.frequency.setValueAtTime(1800, ctx.currentTime)
        ping.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06)
        envelope(pingGain, ctx, 0.04, 0.001, 0.02, 0.2, 0.05)
        ping.connect(pingGain).connect(master)
        ping.start()
        ping.stop(ctx.currentTime + 0.1)
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
