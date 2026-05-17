"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export function MusicVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioUrl, setRadioUrl] = useState("https://classicrock.out.airtime.pro:8443/classicrock_aac");
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;
      }

      if (audioRef.current && !sourceRef.current && audioContextRef.current) {
        try {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          const analyser = audioContextRef.current.createAnalyser();
          analyser.fftSize = 256;
          if (sourceRef.current) {
            sourceRef.current.connect(analyser);
            analyser.connect(audioContextRef.current.destination);
            analyserRef.current = analyser;
          }
        } catch (error) {
          console.error("Failed to create audio source:", error);
        }
      }
    };

    window.addEventListener("click", initAudio, { once: true });
    return () => window.removeEventListener("click", initAudio);
  }, []);

  const togglePlayPause = async () => {
    if (!audioContextRef.current) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      if (audioRef.current && !sourceRef.current) {
        sourceRef.current = audioContext.createMediaElementSource(audioRef.current);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        sourceRef.current.connect(analyser);
        analyser.connect(audioContext.destination);
        analyserRef.current = analyser;
      }
    }

    if (isPlaying) {
      audioRef.current?.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsPlaying(false);
    } else {
      try {
        audioRef.current!.src = radioUrl;
        audioRef.current?.play();
        setIsPlaying(true);
        drawVisualizer();
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    }
  };

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyserRef.current!.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgb(15, 23, 42)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        const hue = (i / bufferLength) * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          togglePlayPause();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            togglePlayPause();
          }
        }}
        className="flex items-center justify-center w-full h-8 bg-white/20 hover:bg-white/30 rounded transition-colors cursor-pointer"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white" />
        ) : (
          <Play className="w-4 h-4 text-white" />
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={120}
        height={60}
        className="w-full h-12 rounded bg-slate-950"
      />
      <audio ref={audioRef} crossOrigin="anonymous" />
    </div>
  );
}
