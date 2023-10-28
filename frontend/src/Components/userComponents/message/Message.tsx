import { useEffect, useState } from "react";
import { ChatProps } from "../../../interface/interface";
import io from "socket.io-client";
import { sendMessage , getMessage} from "../../../Api/userApi";

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
    const sendMessageSocket = () => {
        const message = {
            room,
            text: newMessage
        }
        socket.emit('sendMessage', message)
    }

    const setmessageToDatabase = async (text: string) => {
        console.log(newMessage);

        await sendMessage({ text, recipientId: userId })
        setNewMessage('')
    }

    useEffect(() => {
        (async () => {
            const data = await getMessage(userId)
            console.log(data);
        })()
    },[])

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setM(data.text)
            if (data.text) {
                setmessageToDatabase(data.text)
            }
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
                <button onClick={sendMessageSocket} className="bg-blue-900 text-white">Send</button>

                <p className="font-extrabold text-5xl">Message : {m}</p>
                {m}
            </div>
        </div>
    )
}
