import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, MessageSquare, ThumbsUp, HelpCircle } from "lucide-react"
import { locations } from "../utils/constants"

interface SettingsProps {
  onClose: () => void
  currentLocation: string
  onChangeLocation: (location: string) => void
}

export function Settings({ onClose, currentLocation, onChangeLocation }: SettingsProps) {
  const [location, setLocation] = useState(currentLocation)

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation)
    onChangeLocation(newLocation)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-md">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-white">Configuración</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 
            ">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Centro de Ski</label>
              <Select value={location} onValueChange={handleLocationChange}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Selecciona un centro de ski" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700">
              <HelpCircle className="mr-2 h-4 w-4" /> Hablar con soporte
            </Button>
            <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700">
              <ThumbsUp className="mr-2 h-4 w-4" /> Dejar feedback
            </Button>
            <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700">
              <MessageSquare className="mr-2 h-4 w-4" /> Preferencias de notificaciones
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

