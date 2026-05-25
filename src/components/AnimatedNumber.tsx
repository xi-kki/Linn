import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion'

interface Props {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  format?: boolean
}

export default function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0, className = '', format = true }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20 })
  const display = useTransform(spring, (v) => {
    let num = v
    if (format) {
      return `${prefix}${num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
    }
    return `${prefix}${num.toFixed(decimals)}${suffix}`
  })

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  return <motion.span ref={ref} className={className}>{display}</motion.span>
}
