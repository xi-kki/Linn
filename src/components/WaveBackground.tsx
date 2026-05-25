import { useEffect, useRef } from 'react'

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      time += 0.005
      ctx.fillStyle = '#0A0F1E'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)

      for (let i = 0; i < 3; i++) {
        const offset = i * 0.3
        const amplitude = 40 + i * 20
        const frequency = 0.002 + i * 0.0005
        const yOffset = canvas.height * (0.4 + i * 0.15)

        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.015)')
        gradient.addColorStop(0.5, 'rgba(0, 255, 179, 0.025)')
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0.015)')

        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x <= canvas.width; x += 2) {
          const y = yOffset +
            Math.sin(x * frequency + time + offset) * amplitude +
            Math.sin(x * frequency * 2 + time * 0.7 + offset) * amplitude * 0.5
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
