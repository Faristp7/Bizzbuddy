import NavigationBar from "../../Components/userComponents/SideBar/NavigationBar"

export default function UserHomePage() {
 
  return (
    <div className="flex dark:bg-slate-950" style={{height:'2000px'}}>
      <div>
        <NavigationBar />
      </div>
      <div className="ml-60 flex-grow">
        <h1 className="text-6xl dark:text-white font-bold text-center">Home Page</h1>
      </div>
    </div>
  )
}
