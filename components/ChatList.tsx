import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ChatListProps {
  chats: Array<{
    id: string
    name: string
    avatar: string
    lastMessage: string
  }>
  onChatSelect: (chatId: string) => void
}

export function ChatList({ chats, onChatSelect }: ChatListProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId)
    onChatSelect(chatId)
  }

  if (chats.length === 0) return null

  return (
    <div className="bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden backdrop-blur-sm">
      <ScrollArea className="h-auto max-h-[300px]">
        <div className="p-1">
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                className={`w-full justify-start text-left p-3 rounded-lg transition-all duration-200 
                  ${selectedChat === chat.id ? "bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20" : "hover:bg-zinc-800/50"}`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <div className="flex items-center w-full gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-transparent transition-colors duration-200 group-hover:border-[#CCFF00]/20">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#CCFF00] rounded-full border-2 border-zinc-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white truncate">{chat.name}</p>
                      <span className="text-xs text-zinc-500">12:30</span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate mt-1">{chat.lastMessage}</p>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

