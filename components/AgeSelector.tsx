"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface AgeSelectorProps {
  value: number
  onChange: (age: number) => void
  onNext: () => void
  onBack: () => void
}

export function AgeSelector({ value, onChange, onNext, onBack }: AgeSelectorProps) {
  const [selectedAge, setSelectedAge] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef<number | null>(null)
  const ages = Array.from({ length: 80 }, (_, i) => i + 1) // 1-80 años
  const itemHeight = 40 // altura de cada item

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollPosition = (selectedAge - 1) * itemHeight
      container.scrollTop = scrollPosition - container.clientHeight / 2 + itemHeight / 2
    }
  }, [selectedAge])

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollPosition = container.scrollTop
      const index = Math.round((scrollPosition + container.clientHeight / 2 - itemHeight / 2) / itemHeight)
      const newAge = ages[index]
      if (newAge !== selectedAge) {
        setSelectedAge(newAge)
        onChange(newAge)
      }
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (containerRef.current) {
      containerRef.current.scrollTop += e.deltaY
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return
    const deltaY = startY.current - e.touches[0].clientY
    if (containerRef.current) {
      containerRef.current.scrollTop += deltaY
    }
    startY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    startY.current = null
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-full touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative h-[200px] w-full max-w-[200px] overflow-hidden cursor-grab active:cursor-grabbing"
        ref={containerRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
      >
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="h-[80px] w-full border-t border-b border-[#CCFF00] top-1/2 -translate-y-1/2 absolute" />
        </div>
        <div className="absolute inset-0 overflow-y-scroll">
          <div style={{ height: `${itemHeight * (ages.length + 4)}px` }}>
            {ages.map((age) => (
              <motion.div
                key={age}
                className={`h-[${itemHeight}px] flex items-center justify-center ${
                  age === selectedAge ? "text-[#CCFF00] text-3xl font-bold" : "text-zinc-400 text-xl"
                }`}
                animate={{
                  scale: age === selectedAge ? 1.2 : 1,
                  opacity: age === selectedAge ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
              >
                {age}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-8 w-full max-w-[200px]">
        <Button
          variant="outline"
          className="flex-1 bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white"
          onClick={onBack}
        >
          Atrás
        </Button>
        <Button className="flex-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90" onClick={onNext}>
          Siguiente
        </Button>
      </div>
    </div>
  )
}

