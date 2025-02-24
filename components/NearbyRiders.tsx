"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  MessageCircle,
  Settings,
  Users,
  Map,
  Coffee,
  AlertTriangle,
  Bell,
  UserPlus,
  Snowflake,
} from "lucide-react"
import { Chat } from "./Chat"
import { RiderProfile } from "./RiderProfile"
import { SkiMap } from "./SkiMap"
import { Notifications } from "./Notifications"
import { mockRiders } from "../utils/constants"
import { CreateGroup } from "./CreateGroup"
import { MouseMoveEffect } from "./MouseMoveEffect"
import { Settings as SettingsComponent } from "./Settings" // Import the Settings component
import { MeetingPointMap } from "./MeetingPointMap" // Added import for MeetingPointMap
import { ChatList } from "./ChatList"
import { motion } from "framer-motion"

interface NearbyRidersProps {
  userLocation: string
  setUserLocation: (newLocation: string) => void // Added setUserLocation function
}

interface Group {
  id: number
  name: string
  members: any[]
}

export function NearbyRiders({ userLocation, setUserLocation }: NearbyRidersProps) {
  const [showChat, setShowChat] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [selectedRider, setSelectedRider] = useState<any | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showSettings, setShowSettings] = useState(false) // Added state for settings
  const [notificationCount, setNotificationCount] = useState(2)
  const [groups, setGroups] = useState<Group[]>([])
  const [friends, setFriends] = useState<any[]>([])
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [selectedMeetingPoint, setSelectedMeetingPoint] = useState<string | null>(null) // Added state for selected meeting point
  const [ongoingChats, setOngoingChats] = useState<
    Array<{
      id: string
      name: string
      avatar: string
      lastMessage: string
    }>
  >([])
  const riders = mockRiders[userLocation] ?? []
  const onlineRiders = riders.slice(0, 8)

  const handleRiderClick = (rider: any) => {
    setSelectedRider(rider)
    setShowProfile(true)
  }

  const handleStartChat = (rider?: any) => {
    if (rider) {
      const existingChat = ongoingChats.find((chat) => chat.id === rider.id.toString())
      if (!existingChat) {
        setOngoingChats((prev) => [
          ...prev,
          {
            id: rider.id.toString(),
            name: rider.name,
            avatar: rider.avatar,
            lastMessage: "Iniciaste una conversación",
          },
        ])
      }
      setSelectedRider(rider)
    }
    setShowChat(true)
  }

  const handleCreateGroup = (group: { name: string; members: any[] }) => {
    const newGroup = { id: Date.now(), ...group }
    setGroups([...groups, newGroup])
  }

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group)
    setShowCreateGroup(true)
  }

  const handleSaveEditedGroup = (editedGroup: Group) => {
    setGroups(groups.map((g) => (g.id === editedGroup.id ? editedGroup : g)))
    setEditingGroup(null)
  }

  const handleAcceptFriendRequest = (rider: any) => {
    setFriends([...friends, rider])
    setNotificationCount(notificationCount - 1)
  }

  const handleChangeLocation = (newLocation: string) => {
    // Here you would typically update the user's location in your backend
    // For now, we'll just update the local state
    setUserLocation(newLocation)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 relative overflow-hidden">
      <MouseMoveEffect />
      {/* Enhanced Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/95 via-black/90 to-transparent backdrop-blur-md">
        <div className="container mx-auto max-w-7xl">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center py-4"
          >
            <div className="relative">
              <Snowflake className="w-8 h-8 text-[#CCFF00]" />
              <motion.div
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Snowflake className="w-5 h-5 text-white" />
              </motion.div>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold text-[#CCFF00] ml-2"
            >
              SnowConnect
            </motion.h1>
          </motion.div>

          {/* Location and Actions Bar */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-zinc-800/50">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <MapPin className="h-5 w-5 text-[#CCFF00]" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute -inset-1 bg-[#CCFF00]/20 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-zinc-400">Tu ubicación</span>
                <span className="text-sm font-medium text-white">{userLocation}</span>
              </div>
            </motion.div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:bg-[#CCFF00] hover:text-black transition-colors duration-200 relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {notificationCount}
                  </motion.span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:bg-[#CCFF00] hover:text-black transition-colors duration-200"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative w-full h-48 sm:h-72 md:h-96 overflow-hidden flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OTf4uIWm9zL9hnDWOOhpR3LgL7MLTv.png")',
            filter: "brightness(0.7) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative text-center px-4"
        >
          <p className="text-sm font-medium text-[#CCFF00] mb-2">DESTACADO</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Descubre nuevas rutas</h2>
        </motion.div>
      </motion.div>

      {/* Spacer with subtle gradient */}
      <div className="h-16 bg-gradient-to-b from-black to-transparent" />

      {/* Main content */}
      <div className="pt-0 px-4 sm:px-6 space-y-6 sm:space-y-8 pb-32">
        {/* Connected riders */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#CCFF00]" />
              <h2 className="text-white font-medium text-lg">Conectados ahora</h2>
            </div>
            <Badge variant="outline" className="bg-[#CCFF00]/10 text-[#CCFF00] border-0">
              {onlineRiders.length} online
            </Badge>
          </div>

          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {onlineRiders.map((rider) => (
                <button
                  key={rider.id}
                  className="flex flex-col items-center space-y-2"
                  onClick={() => handleRiderClick(rider)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 ring-2 ring-[#CCFF00]/20">
                      <AvatarImage src={rider.avatar} />
                      <AvatarFallback>{rider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#CCFF00] ring-2 ring-black`} />
                  </div>
                  <span className="text-sm text-zinc-400">{rider.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </section>
        {/* Groups */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#CCFF00]" />
              <h2 className="text-white font-medium text-lg">Grupos</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-black bg-[#CCFF00] border-[#CCFF00] hover:bg-[#CCFF00]/90 hover:text-black"
              onClick={() => setShowCreateGroup(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Crear grupo
            </Button>
          </div>

          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {groups.map((group) => (
                <button
                  key={group.id}
                  className="flex flex-col items-center space-y-2"
                  onClick={() => handleStartChat(group)}
                >
                  <Avatar className="h-16 w-16 ring-2 ring-[#CCFF00]/20">
                    <AvatarFallback>{group.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-zinc-400">{group.name}</span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </section>
        {/* Chats iniciados */}
        {ongoingChats.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-[#CCFF00]" />
                <h2 className="text-white font-medium text-lg">Chats iniciados</h2>
              </div>
            </div>
            <ChatList
              chats={ongoingChats}
              onChatSelect={(chatId) => {
                const rider = riders.find((r) => r.id.toString() === chatId)
                if (rider) {
                  handleStartChat(rider)
                }
              }}
            />
          </section>
        )}
        {/* Friends */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#CCFF00]" />
              <h2 className="text-white font-medium text-lg">Amigos</h2>
            </div>
          </div>

          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {friends.map((friend) => (
                <button
                  key={friend.id}
                  className="flex flex-col items-center space-y-2"
                  onClick={() => handleStartChat()}
                >
                  <Avatar className="h-16 w-16 ring-2 ring-[#CCFF00]/20">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-zinc-400">{friend.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </section>
        {/* Ski Map Button */}
        <section>
          <Button
            className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 h-12 text-lg flex items-center justify-center space-x-2"
            onClick={() => setShowMap(true)}
          >
            <Map className="h-5 w-5" />
            <span>Ver mapa del centro de ski</span>
          </Button>
        </section>
        {/* Meeting Points */}
        <section className="px-4 sm:px-0">
          <h2 className="text-white font-medium text-lg mb-4">Puntos de encuentro</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Cafetería Central", "Rental de Equipos", "Base de Telesilla Principal", "Escuela de Ski"].map(
              (point, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-[#CCFF00] p-4 flex items-center space-x-3 h-auto transition-colors duration-200"
                  onClick={() => setSelectedMeetingPoint(point)}
                >
                  <Coffee className="h-6 w-6 text-[#CCFF00] flex-shrink-0" />
                  <span className="text-sm text-left">{point}</span>
                </Button>
              ),
            )}
          </div>
        </section>
        {/* Slope Status */}
        <section>
          <h2 className="text-white font-medium text-lg mb-4">Estado de las pistas</h2>
          <div className="space-y-3">
            {[
              "Pista Negra: Abierta",
              "Pista Roja: Cerrada por mantenimiento",
              "Pista Azul: Abierta",
              "Pista Verde: Abierta",
            ].map((status, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${status.includes("Abierta") ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-zinc-300 text-sm">{status}</span>
              </div>
            ))}
          </div>
        </section>
        {/* Nearby riders grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-medium text-lg">Riders cercanos</h2>
            <span className="text-sm text-zinc-400">{riders.length} disponibles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {riders.map((rider) => (
              <Card key={rider.id} className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-all">
                <div className="p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleRiderClick(rider)}>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={rider.avatar} />
                        <AvatarFallback>{rider.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-medium">{rider.name}</h3>
                        <p className="text-sm text-zinc-400">{rider.style}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-transparent border-zinc-700 text-zinc-400">
                      12 km
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 bg-white/10 text-white hover:bg-[#CCFF00] hover:text-black transition-colors"
                      onClick={() => handleStartChat(rider)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Mensaje
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 bg-white/10 text-white hover:bg-[#CCFF00] hover:text-black transition-colors"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      S.O.S
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {showProfile && selectedRider && (
        <RiderProfile rider={selectedRider} onClose={() => setShowProfile(false)} onStartChat={handleStartChat} />
      )}

      {showChat && (
        <Chat
          onClose={() => setShowChat(false)}
          otherUser={selectedRider}
          group={selectedGroup}
          onEditGroup={handleEditGroup}
        />
      )}

      {showMap && <SkiMap onClose={() => setShowMap(false)} riders={onlineRiders} />}

      {showNotifications && (
        <Notifications
          onClose={() => setShowNotifications(false)}
          setNotificationCount={setNotificationCount}
          onAcceptFriendRequest={handleAcceptFriendRequest}
        />
      )}

      {showCreateGroup && (
        <CreateGroup
          onClose={() => {
            setShowCreateGroup(false)
            setEditingGroup(null)
          }}
          riders={[...riders, ...friends]}
          onCreateGroup={handleCreateGroup}
          onEditGroup={handleSaveEditedGroup}
          editingGroup={editingGroup}
        />
      )}
      {showSettings && (
        <SettingsComponent
          onClose={() => setShowSettings(false)}
          currentLocation={userLocation}
          onChangeLocation={handleChangeLocation}
        />
      )}
      {selectedMeetingPoint && (
        <MeetingPointMap onClose={() => setSelectedMeetingPoint(null)} meetingPoint={selectedMeetingPoint} />
      )}
      {/* Enhanced Footer */}
      <footer className="fixed bottom-0 left-0 right-0 text-center py-2 text-xs text-zinc-500 bg-black/90 backdrop-blur-md">
        Made by Dani Bustamante 🏂
      </footer>
    </div>
  )
}

