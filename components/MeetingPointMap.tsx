"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, MapPin } from "lucide-react"

interface MeetingPointMapProps {
  onClose: () => void
  meetingPoint: string
}

export function MeetingPointMap({ onClose, meetingPoint }: MeetingPointMapProps) {
  const [userLocation] = useState({ x: 50, y: 80 })
  const [destinationLocation] = useState({ x: 70, y: 30 })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-3xl bg-zinc-900 rounded-lg overflow-hidden"
      >
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Ruta a {meetingPoint}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-zinc-400 hover:bg-white hover:text-black transition-colors"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="relative h-[60vh] bg-zinc-800 p-4">
          {/* Simulated map */}
          <div className="absolute inset-0 bg-zinc-700 rounded-lg overflow-hidden">
            {/* Simulated path */}
            <svg className="w-full h-full">
              <path
                d={`M ${userLocation.x} ${userLocation.y} Q ${(userLocation.x + destinationLocation.x) / 2} ${
                  (userLocation.y + destinationLocation.y) / 2
                } ${destinationLocation.x} ${destinationLocation.y}`}
                fill="none"
                stroke="#CCFF00"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>

            {/* User location */}
            <div
              className="absolute w-4 h-4 bg-blue-500 rounded-full"
              style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%`, transform: "translate(-50%, -50%)" }}
            />

            {/* Destination */}
            <div
              className="absolute"
              style={{
                left: `${destinationLocation.x}%`,
                top: `${destinationLocation.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <MapPin className="h-8 w-8 text-[#CCFF00]" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-zinc-900 p-2 rounded-lg">
            <p className="text-white text-sm">Distancia estimada: 500m</p>
            <p className="text-white text-sm">Tiempo estimado: 5 min</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

