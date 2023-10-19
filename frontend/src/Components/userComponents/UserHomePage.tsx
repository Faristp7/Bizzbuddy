import { useState } from "react";
import NavigationBar from "../../Components/userComponents/SideBar/NavigationBar"
import { PostCollection, Profile } from './Index'
import './user.css'

export default function UserHomePage() {
  const filters = ['All', 'Oldest', "Newest", "Popular"]
  const [selectedFilter, setSelectedFilter] = useState<string>('All')
  const [userId , setUserId] = useState<string | null>('')

  const handleClick = (filter: string) => {
    setSelectedFilter(filter)
  }

  if(userId){
    return <Profile userId={userId}/>
  }
  return (
    <div className="flex min-h-screen dark:bg-slate-950">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
        <div className="flex space-x-2 justify-center">
          {filters.map((filter) => (
            <div
              key={filter}
              className={`bg-${selectedFilter === filter ? "black dark:bg-gray-500" : "gray-600 dark:bg-gray-700"} text-white rounded-lg px-2 py-0.5 cursor-pointer`}
              onClick={() => handleClick(filter)}
            >
              <p className="m-0">{filter}</p>
            </div>
          ))}
        </div>
        <PostCollection role="homePage" userIdForPost="" guestUser selectedFilter={selectedFilter} setUserId={setUserId}/>
      </div>
    </div>
  )
}
