'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Play, Pause, RotateCcw, Eye, Activity, 
  Smile, ShieldCheck, Zap, Sparkles, ExternalLink, Sliders, CheckCircle2
} from 'lucide-react'

// Simulated 15-second telemetry timeline at 1-second intervals
interface FrameData {
  time: number
  eyeContact: number // percentage
  yawDeg: number // degrees
  tiltDeg: number
  smileRatio: number
  entropy: number // Shannon entropy bits
  emotion: 'Neutral' | 'Engaged' | 'Thoughtful' | 'Smiling'
  feedbackEvent?: string
}

const TELEMETRY_STREAM: FrameData[] = [
  { time: 0, eyeContact: 92, yawDeg: 0.8, tiltDeg: 0.5, smileRatio: 0.15, entropy: 1.42, emotion: 'Engaged' },
  { time: 1, eyeContact: 95, yawDeg: -1.2, tiltDeg: -0.4, smileRatio: 0.22, entropy: 1.55, emotion: 'Engaged' },
  { time: 2, eyeContact: 88, yawDeg: 2.1, tiltDeg: 1.0, smileRatio: 0.18, entropy: 1.60, emotion: 'Engaged' },
  { time: 3, eyeContact: 72, yawDeg: 5.4, tiltDeg: 2.1, smileRatio: 0.12, entropy: 1.74, emotion: 'Thoughtful', feedbackEvent: 'Head turned slightly while formulating point' },
  { time: 4, eyeContact: 65, yawDeg: 7.2, tiltDeg: 3.0, smileRatio: 0.10, entropy: 1.81, emotion: 'Thoughtful' },
  { time: 5, eyeContact: 84, yawDeg: 3.0, tiltDeg: 1.2, smileRatio: 0.25, entropy: 1.85, emotion: 'Engaged' },
  { time: 6, eyeContact: 91, yawDeg: 0.4, tiltDeg: 0.2, smileRatio: 0.38, entropy: 1.90, emotion: 'Smiling', feedbackEvent: 'Natural rapport established' },
  { time: 7, eyeContact: 94, yawDeg: -0.6, tiltDeg: -0.5, smileRatio: 0.35, entropy: 1.88, emotion: 'Smiling' },
  { time: 8, eyeContact: 89, yawDeg: -1.8, tiltDeg: -1.1, smileRatio: 0.20, emotion: 'Engaged', entropy: 1.82 },
  { time: 9, eyeContact: 82, yawDeg: 3.5, tiltDeg: 0.8, smileRatio: 0.14, emotion: 'Engaged', entropy: 1.78 },
  { time: 10, eyeContact: 96, yawDeg: 0.2, tiltDeg: 0.1, smileRatio: 0.28, emotion: 'Engaged', entropy: 1.80 },
  { time: 11, eyeContact: 90, yawDeg: -2.0, tiltDeg: -0.7, smileRatio: 0.21, emotion: 'Engaged', entropy: 1.75 },
  { time: 12, eyeContact: 93, yawDeg: 1.1, tiltDeg: 0.4, smileRatio: 0.30, emotion: 'Engaged', entropy: 1.79 },
  { time: 13, eyeContact: 87, yawDeg: -3.8, tiltDeg: -1.5, smileRatio: 0.18, entropy: 1.76, emotion: 'Thoughtful' },
  { time: 14, eyeContact: 94, yawDeg: 0.5, tiltDeg: 0.2, smileRatio: 0.24, entropy: 1.83, emotion: 'Engaged' },
  { time: 15, eyeContact: 95, yawDeg: -0.2, tiltDeg: 0.0, smileRatio: 0.26, entropy: 1.85, emotion: 'Engaged' },
]

export default function AIInterviewDemo() {
  const [currentTime, setCurrentTime] = useState(6)
  const [isPlaying, setIsPlaying] = useState(false)
  const [wireframeMesh, setWireframeMesh] = useState(true)
  const [archTab, setArchTab] = useState<'edge' | 'server'>('edge')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Current frame interpolation
  const currentFrame = TELEMETRY_STREAM[Math.min(currentTime, TELEMETRY_STREAM.length - 1)]

  // Playback loop
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 15) {
            setIsPlaying(false)
            return 15
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  // Canvas Drawing for Simulated FaceMesh (468 points)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Base face outline center
    const cx = canvas.width / 2 + currentFrame.yawDeg * 3.5
    const cy = canvas.height / 2 + currentFrame.tiltDeg * 2.5

    // Dark sleek background
    ctx.fillStyle = '#09090b'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Simulated Head Silhouette
    ctx.beginPath()
    ctx.ellipse(cx, cy, 95, 125, (currentFrame.tiltDeg * Math.PI) / 180, 0, 2 * Math.PI)
    ctx.fillStyle = '#141418'
    ctx.fill()
    ctx.strokeStyle = '#27272a'
    ctx.lineWidth = 1.5
    ctx.stroke()

    if (wireframeMesh) {
      // Draw Mesh Points
      ctx.fillStyle = '#06b6d4'
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)'
      ctx.lineWidth = 1

      // Triangular wireframe lattice
      const points: [number, number][] = [
        [cx - 40, cy - 35], [cx - 15, cy - 40], [cx + 15, cy - 40], [cx + 40, cy - 35], // Brows
        [cx - 30, cy - 15], [cx - 10, cy - 15], [cx + 10, cy - 15], [cx + 30, cy - 15], // Eyes
        [cx, cy + 10], [cx - 12, cy + 25], [cx + 12, cy + 25], // Nose
        [cx - 28, cy + 55], [cx, cy + 50 + currentFrame.smileRatio * 15], [cx + 28, cy + 55], // Mouth
        [cx, cy + 70], [cx - 65, cy], [cx + 65, cy], [cx - 50, cy + 60], [cx + 50, cy + 60] // Jaw
      ]

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = Math.hypot(points[i][0] - points[j][0], points[i][1] - points[j][1])
          if (dist < 55) {
            ctx.beginPath()
            ctx.moveTo(points[i][0], points[i][1])
            ctx.lineTo(points[j][0], points[j][1])
            ctx.stroke()
          }
        }
      }

      // Draw points
      points.forEach(([px, py]) => {
        ctx.beginPath()
        ctx.arc(px, py, 2, 0, 2 * Math.PI)
        ctx.fill()
      })

      // Draw Eye Gaze Vector
      const eyeContactColor = currentFrame.eyeContact > 80 ? '#10b981' : '#f59e0b'
      ctx.strokeStyle = eyeContactColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(cx - 20, cy - 15)
      ctx.lineTo(cx - 20 - currentFrame.yawDeg * 2, cy - 15)
      ctx.moveTo(cx + 20, cy - 15)
      ctx.lineTo(cx + 20 - currentFrame.yawDeg * 2, cy - 15)
      ctx.stroke()
    }

    // Overlay scanline
    ctx.fillStyle = 'rgba(6, 182, 212, 0.03)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [currentFrame, wireframeMesh])

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans">
      {/* Top Header */}
      <header className="border-b border-[#27272a] bg-[#111113]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/#projects" 
              className="text-xs font-mono text-[#a1a1aa] hover:text-white flex items-center gap-1.5 transition-colors border border-[#27272a] px-2.5 py-1.5 rounded-md hover:bg-[#18181b]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
            </Link>
            <span className="text-[#3f3f46]">/</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-white">AI Mock Interview</span>
              <span className="text-[11px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded">
                Behavioral Telemetry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/maazabdulbasith/ai-video" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-mono text-[#a1a1aa] hover:text-white flex items-center gap-1 transition-colors"
            >
              Client Repo <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://github.com/maazabdulbasith/video-module" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-mono text-[#a1a1aa] hover:text-white flex items-center gap-1 transition-colors"
            >
              Backend Pipe <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-mono bg-[#18181b] border border-[#27272a] px-2.5 py-1 rounded text-[#a1a1aa]">
              MediaPipe FaceMesh (WASM)
            </span>
            <span className="text-[10px] font-mono bg-[#18181b] border border-[#27272a] px-2.5 py-1 rounded text-[#a1a1aa]">
              Whisper Audio
            </span>
            <span className="text-[10px] font-mono bg-[#18181b] border border-[#27272a] px-2.5 py-1 rounded text-[#a1a1aa]">
              Shannon Entropy
            </span>
            <span className="text-[10px] font-mono bg-[#18181b] border border-[#27272a] px-2.5 py-1 rounded text-cyan-400 border-cyan-900">
              Gemini 1.5 Flash Narrative
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Edge-Processed Facial Telemetry & AI Interview Evaluator
          </h1>
          <p className="text-sm text-[#a1a1aa] max-w-3xl leading-relaxed">
            By shifting 468-point facial landmark geometry from server-side OpenCV/Celery queues to client-side browser WebAssembly, 
            end-to-end feedback latency was reduced from 60 seconds to 5.2 seconds while enforcing zero-knowledge video privacy.
          </p>
        </div>

        {/* Section 1: Telemetry Scrubber & FaceMesh Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Visual Canvas Player (5 cols) */}
          <div className="lg:col-span-5 bg-[#121215] border border-[#27272a] rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-[#71717a] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> FaceMesh 468 Wireframe
                </span>
                <button
                  onClick={() => setWireframeMesh(!wireframeMesh)}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
                >
                  {wireframeMesh ? 'Hide Mesh' : 'Show Mesh'}
                </button>
              </div>

              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#27272a] bg-black flex items-center justify-center">
                <canvas 
                  ref={canvasRef} 
                  width={380} 
                  height={285}
                  className="w-full h-full object-contain"
                />
                
                {/* HUD Overlay Stamp */}
                <div className="absolute top-2.5 left-2.5 text-[10px] font-mono text-cyan-400/80 bg-black/60 px-2 py-0.5 rounded border border-cyan-900/50">
                  FRAME: {currentTime}s / 15s | WASM_OK
                </div>

                <div className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-900/50">
                  STATE: {currentFrame.emotion}
                </div>
              </div>
            </div>

            {/* Playback Controls & Time Scrubber */}
            <div className="mt-4 pt-3 border-t border-[#27272a]">
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setCurrentTime(0)}
                  className="p-2 rounded bg-[#18181b] border border-[#27272a] hover:bg-[#27272a] text-[#a1a1aa] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-white">
                  00:{currentTime < 10 ? `0${currentTime}` : currentTime} / 00:15
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={currentTime}
                onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Telemetry Dashboard (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {/* Eye Contact */}
              <div className="bg-[#121215] border border-[#27272a] rounded-xl p-4">
                <div className="flex items-center justify-between text-[#71717a] text-xs font-mono mb-1">
                  <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-cyan-400" /> Eye Contact Ratio</span>
                  <span className="text-white font-bold">{currentFrame.eyeContact}%</span>
                </div>
                <div className="w-full bg-[#18181b] rounded-full h-2 overflow-hidden mt-2">
                  <div 
                    className="bg-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${currentFrame.eyeContact}%` }}
                  />
                </div>
                <div className="text-[10px] text-[#71717a] mt-2">
                  Target &gt; 80% direct camera gaze
                </div>
              </div>

              {/* Head Yaw Angle */}
              <div className="bg-[#121215] border border-[#27272a] rounded-xl p-4">
                <div className="flex items-center justify-between text-[#71717a] text-xs font-mono mb-1">
                  <span>Head Yaw Angle</span>
                  <span className={`font-bold ${Math.abs(currentFrame.yawDeg) > 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {currentFrame.yawDeg > 0 ? `+${currentFrame.yawDeg}°` : `${currentFrame.yawDeg}°`}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#a1a1aa] mt-1">
                  Threshold: ±0.08 rad (4.6°)
                </div>
                <div className="text-[10px] text-[#71717a] mt-2">
                  {Math.abs(currentFrame.yawDeg) > 4.6 ? '⚠️ Looking away detected' : '✓ Facing forward aligned'}
                </div>
              </div>

              {/* Smile / Engagement Ratio */}
              <div className="bg-[#121215] border border-[#27272a] rounded-xl p-4">
                <div className="flex items-center justify-between text-[#71717a] text-xs font-mono mb-1">
                  <span className="flex items-center gap-1.5"><Smile className="w-3.5 h-3.5 text-amber-400" /> Smile Index</span>
                  <span className="text-white font-bold">{currentFrame.smileRatio.toFixed(2)}</span>
                </div>
                <div className="text-xs font-mono text-[#a1a1aa] mt-1">
                  Measured via lip-corner displacement
                </div>
                <div className="text-[10px] text-[#71717a] mt-2">
                  Dynamic micro-expression tracking
                </div>
              </div>

              {/* Shannon Entropy */}
              <div className="bg-[#121215] border border-[#27272a] rounded-xl p-4">
                <div className="flex items-center justify-between text-[#71717a] text-xs font-mono mb-1">
                  <span>Shannon Emotion Entropy</span>
                  <span className="text-cyan-400 font-bold">{currentFrame.entropy.toFixed(2)} bits</span>
                </div>
                <div className="text-xs font-mono text-[#a1a1aa] mt-1">
                  H(X) = -Σ P(x) log₂ P(x)
                </div>
                <div className="text-[10px] text-[#71717a] mt-2">
                  Quantifies expressive vitality (vs flat affect)
                </div>
              </div>
            </div>

            {/* Gemini 1.5 Flash Synthesized Feedback Report */}
            <div className="bg-[#121215] border border-[#27272a] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-[#71717a] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Gemini 1.5 Flash Structured Assessment
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 px-2 py-0.5 rounded">
                  Score: 8.4 / 10
                </span>
              </div>
              <div className="bg-[#09090b] border border-[#27272a] rounded p-3 text-xs font-mono text-[#e4e4e7] space-y-1.5">
                <div className="text-cyan-400 font-semibold">Executive Narrative:</div>
                <p className="text-[#a1a1aa] leading-relaxed">
                  "Candidate maintained strong ocular focus (avg 89.2%) with confident head stabilization. At 00:03-00:05, a slight lateral yaw (+7.2°) coincided with verbal synthesis before smoothly re-centering. Micro-expression entropy (1.81 bits) reflects authentic engagement rather than rehearsed rigidity."
                </p>
                <div className="pt-2 border-t border-[#1f1f23] flex flex-wrap gap-2 text-[10px]">
                  <span className="text-emerald-400">✓ Consistent Camera Eye-Line</span>
                  <span className="text-cyan-400">✓ Natural Emotion Distribution</span>
                  <span className="text-amber-400">! Minimize Right-Hand Gaze Shifts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Architecture Evolution (Server vs Edge WASM) */}
        <section className="bg-[#121215] border border-[#27272a] rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Architecture Pivot: Server Processing vs. Client WASM
            </h2>
            <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded p-0.5">
              <button
                onClick={() => setArchTab('edge')}
                className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                  archTab === 'edge' ? 'bg-cyan-500 text-black font-semibold' : 'text-[#a1a1aa]'
                }`}
              >
                Edge Pipeline (Current)
              </button>
              <button
                onClick={() => setArchTab('server')}
                className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                  archTab === 'server' ? 'bg-[#27272a] text-white' : 'text-[#a1a1aa]'
                }`}
              >
                Server Pipeline (Legacy)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-[#09090b] border border-[#27272a] rounded p-3">
              <div className="text-[#71717a] text-[10px] uppercase">End-to-End Latency</div>
              <div className="text-xl font-bold mt-1 text-white">
                {archTab === 'edge' ? '5.2 seconds' : '58.4 seconds'}
              </div>
              <div className="text-[10px] text-cyan-400 mt-1">
                {archTab === 'edge' ? '91% latency reduction' : 'Queue + transcode bottleneck'}
              </div>
            </div>

            <div className="bg-[#09090b] border border-[#27272a] rounded p-3">
              <div className="text-[#71717a] text-[10px] uppercase">Bandwidth / Network</div>
              <div className="text-xl font-bold mt-1 text-white">
                {archTab === 'edge' ? '~180 KB (JSON)' : '~65 MB (.webm video)'}
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">
                {archTab === 'edge' ? 'Zero video upload required' : 'Heavy S3 & network I/O'}
              </div>
            </div>

            <div className="bg-[#09090b] border border-[#27272a] rounded p-3">
              <div className="text-[#71717a] text-[10px] uppercase">Privacy & Compute Cost</div>
              <div className="text-xl font-bold mt-1 text-white">
                {archTab === 'edge' ? 'Zero-Knowledge Video' : 'Dedicated GPU Server'}
              </div>
              <div className="text-[10px] text-[#a1a1aa] mt-1">
                {archTab === 'edge' ? 'Video never leaves user browser' : 'AWS g4dn GPU instances'}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
