import { useEffect, useState } from "react";
import { ChatProps } from "../../../interface/interface";
import io from "socket.io-client";
import { getMessage } from "../../../Api/userApi";

const socket = io(import.meta.env.VITE_BACKENDURL)

export default function Message({ userId }: ChatProps) {
    const [message, setMessage] = useState<string>('')
    const [conversationId, setConversationId] = useState<string>('')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>([])
    const [m , setM] = useState<string>('')


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
            conversationId
        })
        setMessage('')
    }

    useEffect(() => {
        socket.on("receiveMessage", (data) => {    

            setM(data.message)
            setMessages([...messages, data.message])
        })

        

    }, [messages])



    return (
        <div>
            <p>{conversationId}</p>

            <div className="flex flex-col gap-5">
                <input type="text"
                    className="border"
                    placeholder="value"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessageHandler} className="bg-blue-900 text-white">Send</button>

                <p className="font-extrabold text-5xl">Message : {m}</p>

                {messages.map((msg, index) => (
                    <div key={index}>{msg.message}</div>
                ))}
            </div>
        </div>
    )
}
