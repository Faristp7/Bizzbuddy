import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { userLoggedOut } from "../../Redux/user/userReducer"

export default function UserHomePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.removeItem('JwtToken')
        dispatch(userLoggedOut(false))
        navigate('/')
    }
  return (
    <div>
      <button onClick={handleLogout} className="text-4xl text-red-600">onClick</button>
    </div>
  )
}
