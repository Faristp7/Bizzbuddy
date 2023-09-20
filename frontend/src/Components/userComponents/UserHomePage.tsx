import { useNavigate } from "react-router-dom"

export default function UserHomePage() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('JwtToken')
        navigate('/')
    }
  return (
    <div>
      <button onClick={handleLogout}>onClick</button>
    </div>
  )
}
