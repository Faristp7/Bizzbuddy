import { useEffect, useState } from "react";
import { ChatProps } from "../../../interface/interface";
import io from "socket.io-client";
import { sendMessage, getMessage } from "../../../Api/userApi";

const socket = io(import.meta.env.VITE_BACKENDURL)

export default function Message({ userId }: ChatProps) {
    const [newMessage, setNewMessage] = useState<string>("");
    const [m, setM] = useState<string>('')
    const [roomId, setRoomId] = useState<string>('')

    const joinRoom = (roomId: string) => {
        socket.emit("joinRoom", roomId)
    }

    const sendMessageSocket = async () => {
        const message = {
            roomId,
            text: newMessage
        }
        socket.emit('sendMessage', message)
    }

    const setmessageToDatabase = async (text: string) => {
        await sendMessage({ text, recipientId: userId })
        setNewMessage('')
    }

    useEffect(() => {
        (async () => {
            const { data } = await getMessage(userId)
            setRoomId(data.roomId)
            joinRoom(data.roomId)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setM(data.text)
            if (data.text) {
                setmessageToDatabase(data.text)
            }
        })

        return () => {
            socket.off('receiveMessage')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    return (
        <div>
            {roomId}
            <div className="flex flex-col gap-5">
                <input type="text"
                    className="border"
                    placeholder="value"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessageSocket} className="bg-blue-900 text-white">Send</button>

                <p className="font-extrabold text-5xl">Message : {m}</p>
                {m}
            </div>
        </div>
    )
}
