export default function UserHomePage() {

    const handleLogout = () => {
        localStorage.removeItem('JwtToken')
    }
  return (
    <div>
      <button onClick={handleLogout}>onClick</button>
    </div>
  )
}
