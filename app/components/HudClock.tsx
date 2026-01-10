'use client'

import { useState, useEffect } from 'react'

export default function HudClock() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    
    updateClock()
    const interval = setInterval(updateClock, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hud-clock__display">
      {time ?? '--:--:--'}
    </div>
  )
}
