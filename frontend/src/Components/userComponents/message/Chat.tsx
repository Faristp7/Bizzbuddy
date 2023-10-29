import { useEffect, useState } from "react";
import { ChatProps } from "../../../interface/interface";
import { NavigationBar } from "../Index";
import Messsage from './Message'
import { getChatUsers } from "../../../Api/userApi";

export default function Chat({ userId }: ChatProps) {
    const [chats , setChats] = useState<any>([])

  useEffect(() => {
    (async () => {
      const { data } = await getChatUsers()
      setChats(data.chats)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-screen dark:bg-slate-950">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
        <div className="grid grid-cols-3">
          <div className="border-r">
            {
              chats
            }
          </div>
          <div className="col-span-2">
            <Messsage userId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
}
