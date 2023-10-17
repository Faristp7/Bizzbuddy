import NavigationBar from "../../Components/userComponents/SideBar/NavigationBar"
import { PostCollection } from './Index'

export default function UserHomePage() {

  return (
    <div className="flex min-h-screen dark:bg-slate-950">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow  dark:text-white">
        <div>
          <div>
            <PostCollection role="user" userIdForPost="" guestUser />
          </div>
        </div>
      </div>
    </div>
  )
}
