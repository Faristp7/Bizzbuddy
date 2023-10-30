import { RefObject, useEffect, useRef, useState } from "react";
import { ChatProps } from "../../../interface/interface";
import { NavigationBar } from "../Index";
import Messsage from './Message'
import { getChatUsers } from "../../../Api/userApi";

export default function Chat({ userId }: ChatProps) {
  const searchInputRef: RefObject<HTMLInputElement> = useRef(null)
  const [chats, setChats] = useState<any>([])
  const [searchData, setSearchData] = useState<string>('')

  useEffect(() => {
    (async () => {      
      const { data } = await getChatUsers()

      setChats(data.chats)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (searchInputRef.current)
      searchInputRef.current.focus()
  }, [])

  return (
    <div className="flex min-h-screen dark:bg-slate-950">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <div className="border-r">
            <div className="sm:mr-2">
              <div className="w-grow sm:flex-shrink">
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
            {chats && chats.length > 0 ? (
              <div>
                {
                  chats.map((item) => {
                    return (
                      <div>
                        <h1>{item.recipientId.username}</h1>
                      </div>
                    )
                  })
                }
              </div>
            ) : (
              <div className="min-h-full flex items-center align-middle justify-center">
                <h1>No Chats</h1>
              </div>
            )}
          </div>
          <div className="col-span-2">
            <Messsage userId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
}
