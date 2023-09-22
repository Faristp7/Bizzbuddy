import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { userLoggedOut } from "../../Redux/user/authSlice"
import NavigationBar from "../../Components/userComponents/SideBar/NavigationBar"

export default function UserHomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem('JwtToken')
    dispatch(userLoggedOut(false))
    navigate('/')
  }
  return (
    <div className="flex dark:bg-slate-950" style={{height:'2000px'}}>
      <div>
        <NavigationBar />
      </div>
      <div className="ml-60 flex-grow">
        <button onClick={handleLogout} className="text-4xl font-bold">onClick</button>
        <div className="dark:text-white bg-red-400">SwithThem</div>
      </div>
    </div>
  )
}
