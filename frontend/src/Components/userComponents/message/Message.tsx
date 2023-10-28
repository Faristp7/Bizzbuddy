import { useEffect, useState } from "react";
import { ChatProps } from "../../../interface/interface";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKENDURL)

export default function Message({ userId }: ChatProps) {
    const [room, setRoom] = useState<string>('')
    const [newMessage, setNewMessage] = useState<string>("");
    const [m, setM] = useState<string>('')


    const joinRoom = () => {
        if (room !== "") {            
            socket.emit("joinRoom", room)
        }
    }
    const sendMessage = () => {
        const message = {
            room,
            text: newMessage
        }
        socket.emit('sendMessage',  message )
        setNewMessage('')
    }

    useEffect(() => {
        socket.on('receiveMessage', (data) => {       
            setM(data.text)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    return (
        <div>
            {userId}
            <div className="flex flex-col gap-5">
                <input type="text"
                    placeholder="Room"
                    onChange={(e) => {
                        setRoom(e.target.value)
                    }} />
                    <button className="bg-green-600" onClick={joinRoom}>Join Room</button>
                <input type="text"
                    className="border"
                    placeholder="value"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage} className="bg-blue-900 text-white">Send</button>

                <p className="font-extrabold text-5xl">Message : {m}</p>
                {m}
            </div>
        </div>
    )
}
