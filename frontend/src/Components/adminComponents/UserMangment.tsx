import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { adminLoggedOut } from "../../Redux/admin/adminAuth"


export default function UserMangment() {

  const dispatch = useDispatch()
  const navaigate = useNavigate()

   const handleLogout = () => {
    dispatch(adminLoggedOut(false))
    navaigate('/')
   }
  return (
    <div>
      <h1 className="font-bold text-4xl">admin</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
