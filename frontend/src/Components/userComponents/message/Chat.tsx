import { RefObject, useEffect, useRef, useState } from "react";
import { ChatProps, userChat } from "../../../interface/interface";
import noChat from '../../../assets/icon/sad.png'
import { NavigationBar } from "../Index";
import Messsage from './Message'
import { getChatUsers } from "../../../Api/userApi";

export default function Chat({ userId }: ChatProps) {
  const searchInputRef: RefObject<HTMLInputElement> = useRef(null)
  const [chats, setChats] = useState<userChat[]>([])
  const [searchData, setSearchData] = useState<string>('')
  const [filteredChats, setFilteredChats] = useState<userChat[]>([])
  const [chatId, setChatId] = useState<string>('')

  useEffect(() => {
    (async () => {
      const { data } = await getChatUsers()
      setChats(data.formattedChats)
    })()
    setChatId(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (searchInputRef.current)
      searchInputRef.current.focus()
  }, [])

  useEffect(() => {
    const filteredChats = chats.filter(item =>
      item.participants[0].username.toLowerCase().includes(searchData.toLowerCase())
    );
    setFilteredChats(filteredChats);
  }, [searchData, chats])

  return (
    <div className="flex min-h-screen dark:bg-slate-950">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 sm:ml-20 md:ml-60 flex-grow dark:text-white">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <div className="border-r">
            <div className="sm:mr-2">
              <div className="w-grow mt-3 sm:flex-shrink">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    ref={searchInputRef}
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    className="block w-full p-3 pl-10 text-sm truncate text-gray-900 border border-gray-300 rounded-lg focus:outline-none bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    placeholder="Search Chat"
                    required
                  />
                </div>
              </div>
            </div>
            {filteredChats && filteredChats.length > 0 ? (
              <div className="mt-3">
                {
                  filteredChats.map((item) => {
                    return (
                      <div key={item.participants[0]._id} className="flex gap-3 my-5 cursor-pointer" onClick={() => setChatId(item.participants[0]._id)}>
                        <img src={item.participants[0].profileImage} className="rounded-full w-9 h-9" alt="" />
                        <h1 className="mt-1 text-lg font-medium">{item.participants[0].username}</h1>
                      </div>
                    )
                  })
                }
              </div>
            ) : (
              <div className="flex items-center mt-10 align-middle justify-center">
                <h1>No Chats</h1>
              </div>
            )}
          </div>
          <div className="col-span-2">
            {chatId ? (
              <Messsage userId={chatId} />
            ) : (
              <div className="min-h-screen flex justify-center align-middle items-center">
                <img src={noChat} alt="" className="cursor-not-allowed"/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
