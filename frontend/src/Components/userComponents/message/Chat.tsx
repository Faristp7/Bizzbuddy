import { ChatProps } from "../../../interface/interface";
import { NavigationBar } from "../Index";
import Messsage from './Message'

export default function Chat({ userId }: ChatProps) {
  
  return (
    <div className="flex min-h-screen dark:bg-slate-950">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
        <div className="grid grid-cols-3">
          <div className="border-r">
            hee
          </div>
          <div className="col-span-2">
            <Messsage userId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
}
