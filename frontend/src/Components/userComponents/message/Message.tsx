import { useEffect, useState } from "react";
import { ChatProps } from "../../../interface/interface";
import socketIOClient from "socket.io-client";

const socket = socketIOClient(import.meta.env.VITE_BACKENDURL);


export default function Message({ userId }: ChatProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messsages, setMessages] = useState<any>([]);
    const [newMessage, setNewMessage] = useState<string>("");


    useEffect(() => {
        
        socket.on("message", (message) => {
            setMessages([...messsages, message]);
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messsages]);

    const sendMessage = () => {
        const message = {
            recipientId: userId,
            text: newMessage
        }
        socket.emit('sendMessage', message)
        setMessages([...messsages, message])
        setNewMessage('')
    }
    return (
        <div>
            {userId}
            <div>
                <input type="text"
                    className="border"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage} className="bg-blue-900 text-white">Send</button>
            </div>
        </div>
    )
}
