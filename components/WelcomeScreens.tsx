"use client"

import React from "react";
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Snowflake, Users, Mountain, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MouseMoveEffect } from "./MouseMoveEffect"

const screens = [
  {
    id: 1,
    title: "Bienvenido a SnowConnect",
    description: "Encuentra compañeros para tus aventuras en la nieve",
    color: "bg-zinc-900",
    icon: Snowflake,
    backgroundImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OTf4uIWm9zL9hnDWOOhpR3LgL7MLTv.png",
  },
  {
    id: 2,
    title: "Conecta con riders",
    description: "Conoce riders de tu nivel y estilo en tu centro de esquí favorito",
    color: "bg-zinc-900",
    icon: Users,
    backgroundImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hTAn4Sdjwnt9T6jWgKtcUibjIDumXE.png",
  },
  {
    id: 3,
    title: "Comparte la montaña",
    description: "Organiza salidas y mejora tu técnica con otros riders",
    color: "bg-zinc-900",
    icon: Mountain,
    backgroundImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oPTojQEjKo5kIBeLdduL60WMPBJ0oA.png",
  },
]

interface WelcomeScreensProps {
  onComplete: () => void
}

export function WelcomeScreens({ onComplete }: WelcomeScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleNext = () => {
    if (currentScreen === screens.length - 1) {
      onComplete()
    } else {
      setCurrentScreen((prev) => prev + 1)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      onComplete()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
      {/* <MouseMoveEffect /> */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="min-h-screen w-full"
        >
          <div className={`relative min-h-screen w-full px-6 py-12 flex flex-col`}>
            {/* Background Image */}
            {screens[currentScreen].backgroundImage && (
              <div className="absolute inset-0 z-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${screens[currentScreen].backgroundImage})`,
                  }}
                />
                <div
                  className={`absolute inset-0 ${
                    currentScreen === 2
                      ? "bg-gradient-to-b from-black/90 via-black/50 to-black/90"
                      : "bg-gradient-to-b from-black/80 via-black/50 to-black/80"
                  } backdrop-blur-sm`}
                />
              </div>
            )}

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center space-y-8 sm:space-y-16">
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {React.createElement(screens[currentScreen].icon, {
                    className: "w-24 h-24 text-[#CCFF00]",
                  })}
                </div>
              </div>
              <div className="text-center space-y-6">
                <motion.h1
                  className="text-4xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {screens[currentScreen].title}
                </motion.h1>
                <motion.p
                  className="text-lg text-zinc-400 max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {screens[currentScreen].description}
                </motion.p>
              </div>
            </div>

            {currentScreen === screens.length - 1 ? (
              <motion.div
                className="relative z-10 w-full max-w-sm mx-auto mt-8 sm:mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 space-y-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-zinc-800/50 border-zinc-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Contraseña
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-zinc-800/50 border-zinc-700 text-white"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 h-12 text-lg mt-4"
                      disabled={!email || !password}
                    >
                      Iniciar sesión
                    </Button>
                  </form>
                  <div className="text-center">
                    <Button variant="link" className="text-zinc-400 hover:text-[#CCFF00]">
                      ¿No tienes cuenta? Regístrate
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="relative z-10 space-y-8 w-full max-w-sm mx-auto">
                <div className="flex justify-center space-x-2">
                  {screens.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentScreen ? "w-8 bg-[#CCFF00]" : "w-2 bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 h-12 text-lg"
                >
                  Siguiente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
          <footer className="fixed bottom-0 left-0 right-0 text-center py-2 text-xs text-zinc-500">
            Made by Dani Bustamante 🏂
          </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

