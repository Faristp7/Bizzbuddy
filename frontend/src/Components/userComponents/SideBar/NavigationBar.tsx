import "../user.css"
import home from '../../../assets/icon/homeIcon.png'
import logo from '../../../assets/img/handshake.png'
import {useEffect ,useState} from 'react'

export default function NavigationBar() {

  const [theme ,setTheme] = useState<boolean>(false)
  const rootElement = document.documentElement;
  useEffect(() => {
    switch(theme){
      case true :
        rootElement.classList.add('dark');
        break;
      case false :
        rootElement.classList.remove('dark')
        break;
      default :
         break
    }
  },[theme])

  function handleTheme(){
    setTheme(!theme)
  }
  return (
    <div className="">
      <div className="fixed left-0 bottom-0 w-full sm:w-auto sm:left-0 sm:top-0 sm:h-screen  dark:text-white dark:bg-slate-900 duration-100">
        <div className="px-3">
          <div className="">
            <h1 className="hidden md:block uppercase font-bold text-4xl my-3">Bizzbuddy</h1>
            <img className="hidden sm:block md:hidden w-10 invert mt-10" src={logo} alt="Logo" />
          </div>
          <div className="flex flex-row gap-10 sm:flex-col mt-10">
            <div className="border-0 md:border-blue-500 md:border-2 flex-1 rounded-lg flex justify-center">
              <img src={home} className="invert" alt="home" />
              <p className="hidden md:block">Home</p>
            </div>
            <div className="border-0 md:border-blue-500 md:border-2 flex-1 rounded-lg flex justify-center">
              <img src={home} className="invert" alt="home" />
              <p className="hidden md:block">Profile</p>
            </div>
            <div className="border-0 md:border-blue-500 md:border-2 flex-1 rounded-lg flex justify-center">
              <img src={home} className="invert" alt="home" />
              <p className="hidden md:block">Search</p>
            </div>
            <div className="border-0 md:border-blue-500 md:border-2 flex-1 rounded-lg flex justify-center">
              <img src={home} className="invert" alt="home" />
              <p className="hidden md:block">messages</p>
            </div>
            <div className="border-0 md:border-blue-500 md:border-2 flex-1 rounded-lg flex justify-center">
              <img src={home} className="invert" alt="home" />
              <p className="hidden md:block">create</p>
            </div>
            <div className="hidden sm:block border-0 md:border-blue-500 md:border-2 flex-1 rounded-lg">
              <div className="flex justify-center">
                <img src={home} className="invert-0 dark:invert" alt="home" />
                <p className="hidden md:block" onClick={handleTheme}>Logout</p>
              </div>
            </div>
          </div>
          {/* <div className="mt-40  hidden sm:block">
            <button className="border-blue-500 border-2 flex-1 rounded-lg">logout</button>
          </div> */}
        </div>
      </div>
    </div>
  );
} 