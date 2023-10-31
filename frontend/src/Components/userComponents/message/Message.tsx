import { useEffect, useState } from "react";
import { ChatProps } from "../../../interface/interface";
import io from "socket.io-client";
import { getMessage } from "../../../Api/userApi";
import { motion } from "framer-motion";

const socket = io(import.meta.env.VITE_BACKENDURL)
const Token = localStorage.getItem('JwtToken')

export default function Message({ userId }: ChatProps) {
    const [message, setMessage] = useState<string>('')
    const [conversationId, setConversationId] = useState<string>('')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {
        (async () => {
            const { data } = await getMessage(userId)
            setConversationId(data.conversationId)

            socket.emit('joinRoom', data.conversationId)
        })()

        return () => {
            socket.off('receiveMessage')
        }

    }, [userId])

    const sendMessageHandler = async () => {
        socket.emit("sendMessage", {
            message,
            conversationId,
            userId,
            senderSocketId: socket.id,
            Token
        })
        setMessage('')
    }

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessages([...message, data.message])
        })

        return () => {
            socket.off('receiveMessage')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col justify-end p-6 min-h-screen">
            <div className="flex flex-col  gap-5 p-2 rounded-lg">
                <div className="overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className="mb-2">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-gray-200 p-2 rounded-lg"
                            >
                                {msg.message}
                            </motion.div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        className="border p-2 flex-grow rounded-l-lg text-gray-900 border-gray-300  focus:outline-none bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        onClick={sendMessageHandler}
                        className="bg-blue-900 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
