"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Snowflake } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { locations } from "../utils/constants"
import { AgeSelector } from "./AgeSelector"
import { MouseMoveEffect } from "./MouseMoveEffect"

const styles = [
  { id: "freeride", name: "Freeride", icon: "🏔️", description: "Aventuras fuera de pista" },
  { id: "freestyle", name: "Freestyle", icon: "🎪", description: "Trucos y saltos" },
  { id: "all-mountain", name: "All-Mountain", icon: "🗻", description: "Versatilidad total" },
  { id: "alpine", name: "Alpine", icon: "⛷️", description: "Velocidad y técnica" },
]

const experiences = [
  { id: "beginner", name: "Principiante", icon: "🌱", description: "Primera vez o pocas salidas" },
  { id: "intermediate", name: "Intermedio", icon: "🌿", description: "1-3 temporadas" },
  { id: "advanced", name: "Avanzado", icon: "🌲", description: "3+ temporadas" },
  { id: "expert", name: "Experto", icon: "🎯", description: "Nivel competitivo" },
]

interface OnboardingData {
  name: string
  age: number
  style: string
  experience: string
  location: string
}

export function Onboarding({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<OnboardingData>({
    name: "",
    age: 0,
    style: "",
    experience: "",
    location: "",
  })

  const updateUserData = (key: keyof OnboardingData, value: string | number) => {
    setUserData((prev) => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (step < 4) {
      setStep((prev) => prev + 1)
    } else {
      onComplete(userData)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      nextStep()
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="name" className="text-white">
                ¿Cómo te llamas?
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => updateUserData("name", e.target.value)}
                  className="pl-10 bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Tu nombre"
                />
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <AgeSelector
            value={userData.age}
            onChange={(age) => updateUserData("age", age)}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 2:
        return (
          <div className="grid grid-cols-2 gap-4">
            {styles.map((style) => (
              <motion.div key={style.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card
                  className={`cursor-pointer transition-colors h-full ${
                    userData.style === style.id
                      ? "bg-[#CCFF00]/10 border-[#CCFF00]"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                  onClick={() => updateUserData("style", style.id)}
                >
                  <CardContent className="p-4 sm:p-6 text-center space-y-2 flex flex-col justify-between h-full">
                    <div className="text-3xl sm:text-4xl">{style.icon}</div>
                    <div>
                      <h3 className="font-medium text-white">{style.name}</h3>
                      <p className="text-xs sm:text-sm text-zinc-400">{style.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="grid grid-cols-2 gap-4">
            {experiences.map((exp) => (
              <motion.div key={exp.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-full">
                <Card
                  className={`cursor-pointer transition-colors h-full ${
                    userData.experience === exp.id
                      ? "bg-[#CCFF00]/10 border-[#CCFF00]"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                  onClick={() => updateUserData("experience", exp.id)}
                >
                  <CardContent className="p-4 sm:p-6 text-center space-y-2 flex flex-col justify-between h-full">
                    <div className="text-3xl sm:text-4xl">{exp.icon}</div>
                    <div>
                      <h3 className="font-medium text-white">{exp.name}</h3>
                      <p className="text-xs sm:text-sm text-zinc-400">{exp.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white">Selecciona tu ubicación</Label>
              <Select value={userData.location} onValueChange={(value) => updateUserData("location", value)}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Elige un centro de esquí" />
                </SelectTrigger>
                <SelectContent
                  className="bg-zinc-900 border-zinc-800 max-h-[300px] overflow-y-auto z-50"
                  position="popper"
                  sideOffset={5}
                >
                  {locations.map((location) => (
                    <SelectItem key={location} value={location} className="text-white">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-4 sm:p-6 relative overflow-hidden"
    >
      <MouseMoveEffect />
      <div className="max-w-sm sm:max-w-md mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Progress */}
        <div>
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#CCFF00] rounded-full transition-all"
              style={{ width: `${((step + 1) / 5) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-zinc-400">{step + 1}/5</div>
        </div>

        {/* Header */}
        <div className="flex items-center gap-2">
          <Snowflake className="h-6 w-6 text-[#CCFF00]" />
          <div>
            <h2 className="text-2xl font-bold text-white">
              {step === 0 && "Bienvenido rider"}
              {step === 1 && "Tu edad"}
              {step === 2 && "Tu estilo"}
              {step === 3 && "Tu nivel"}
              {step === 4 && "Tu ubicación"}
            </h2>
            <p className="text-zinc-400">
              {step === 0 && "Cuéntanos sobre ti"}
              {step === 1 && "¿Cuántos años tienes?"}
              {step === 2 && "¿Cómo te gusta deslizarte?"}
              {step === 3 && "¿Cuál es tu experiencia?"}
              {step === 4 && "¿Dónde te encuentras?"}
            </p>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        {step !== 1 && (
          <div className="flex justify-between gap-4">
            {step > 0 ? (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex-1 bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white"
              >
                Atrás
              </Button>
            ) : (
              <div className="flex-1" />
            )}
            <Button
              onClick={nextStep}
              className="flex-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
              disabled={
                (step === 0 && !userData.name) ||
                (step === 2 && !userData.style) ||
                (step === 3 && !userData.experience) ||
                (step === 4 && !userData.location)
              }
            >
              {step === 4 ? "Comenzar" : "Siguiente"}
            </Button>
          </div>
        )}
      </div>
      <footer className="fixed bottom-0 left-0 right-0 text-center py-2 text-xs text-zinc-500">
        Made by Dani Bustamante 🏂
      </footer>
    </div>
  )
}

