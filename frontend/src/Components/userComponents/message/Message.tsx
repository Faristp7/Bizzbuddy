import { useEffect, useState } from "react";
import { ChatProps, userChats } from "../../../interface/interface";
import io from "socket.io-client";
import { getMessage } from "../../../Api/userApi";
import { motion } from "framer-motion";
import TimeAgo from "timeago-react";

const socket = io(import.meta.env.VITE_BACKENDURL)
const Token = localStorage.getItem('JwtToken')

export default function Message({ userId }: ChatProps) {
    const [message, setMessage] = useState<string>('')
    const [conversationId, setConversationId] = useState<string>('')
    const [messages, setMessages] = useState<userChats[]>([])

    useEffect(() => {
        (async () => {
            const { data } = await getMessage(userId)

            setConversationId(data.conversationId)
            if (data.existingRoom) {
                setMessages(data.existingRoom.messages)
            }
            socket.emit('joinRoom', data.conversationId)
        })()

        return () => {
            socket.off('receiveMessage')
        }

    }, [userId])

    const sendMessageHandler = async () => {
        const trimmedMessage = message.trim();
        const wordCount = trimmedMessage.split(/\s+/).filter(Boolean).length;
        if (trimmedMessage && wordCount <= 50) {
            if (messages.length !== 0) {
                const newMessage = {
                    senderId: messages[0].senderId,
                    message,
                    timestamps: new Date().toISOString()
                }
                setMessages(prevMessages => [...prevMessages, newMessage])
            } else {
                const newMessage = {
                    senderId: userId,
                    message,
                    timestamps: new Date().toISOString()
                }
                setMessages([...messages, newMessage])
            }

            socket.emit("sendMessage", {
                message,
                conversationId,
                userId,
                senderSocketId: socket.id,
                Token
            })
            setMessage('')
        }
    }

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            const c = data.message;

            setMessages(prevMessages => {
                if (prevMessages.length !== 0) {
                    const newMessage = {
                        senderId: prevMessages[0].senderId,
                        message: c,
                        timestamps: new Date().toISOString()
                    };
                    return [...prevMessages, newMessage];
                } else {
                    const newMessage = {
                        senderId: userId,
                        message: c,
                        timestamps: new Date().toISOString()
                    };
                    return [...prevMessages, newMessage];
                }
            });
        });

        return () => {
            socket.off('receiveMessage');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col justify-end p-3 min-h-screen">
            <div className="flex flex-col gap-5 rounded-lg">
                <div className="overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2 flex">
                            {msg.senderId === userId ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className=" mr-3 ml-auto "
                                >
                                    <div className="flex gap-1.5">
                                        <p className="text-gray-300 text-sm mt-5"><TimeAgo datetime={msg.timestamps} /></p>
                                        <h1 className="bg-blue-200 dark:bg-blue-600 p-2 rounded-lg ml-auto rounded-tr-none">{msg.message}</h1>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className=""
                                >
                                    <div className="flex gap-1">
                                        <h1 className="bg-gray-200 dark:bg-gray-500 p-2 rounded-lg ml-auto rounded-tr-none">{msg.message}</h1>
                                        <p className="text-gray-300 text-sm mt-5"><TimeAgo datetime={msg.timestamps} /></p>

                                    </div>
                                </motion.div>
                            )}
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
