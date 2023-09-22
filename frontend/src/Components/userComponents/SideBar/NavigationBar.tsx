import "../user.css"
import home from '../../../assets/icon/homeIcon.png'
import logo from '../../../assets/img/handshake.png'
import search from '../../../assets/icon/search.png'
import message from '../../../assets/icon/send.png'
import create from '../../../assets/icon/create.png'
import logout from '../../../assets/icon/logout.png'
import sun from '../../../assets/icon/sun.png'
import moon from '../../../assets/icon/moon.png'
import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { userLoggedOut } from "../../../Redux/user/authSlice"

export default function NavigationBar() {
  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme ? JSON.parse(savedTheme) : false);
  const demoData = 'https://lh3.googleusercontent.com/a/ACg8ocKkAceSJBcHV9mDZaFyM2OvbhjQJXAdA3ZGzOba1g-pBQpo=s96-c'

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === true) {
      document.documentElement.classList.add('dark');
    } else if (theme === false) {
      document.documentElement.classList.remove('dark');
    } else {
      if (prefersDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  function handleTheme() {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('JwtToken')
    dispatch(userLoggedOut(false))
    navigate('/')
  }
  return (
    <div className="">
      <div className="border-t-2 sm:border-r-2 sm:border-t-0 fixed left-0 bottom-2 w-full sm:w-auto sm:left-0 sm:top-0 sm:h-screen  dark:text-white dark:bg-slate-950 duration-300">
        <div className="px-3">
          <div className="">
            <h1 className="hidden md:block uppercase font-bold text-4xl my-3 mt-6">Bizzbuddy</h1>
            <img className="hidden sm:block md:hidden w-10 invert-0 mt-10 dark:invert" src={logo} alt="Logo" />
          </div>
          <div className="flex flex-row gap-10 md:gap-8 sm:flex-col mt-2 sm:mt-12">
            {/* Home */}
            <motion.div
              className="navationDivIconBar order-1 sm:order-1"
              whileTap={{ scale: 1.1 }}>
              <img src={home} className="navigationBarIcon" alt="home" />
              <p className="navigationBarText">Home</p>
            </motion.div>

            {/* search */}
            <motion.div
              className=
              "navationDivIconBar order-2 sm:order-4"
              whileTap={{ scale: 1.1 }}>
              <img src={search} className="navigationBarIcon " alt="home" />
              <p className="navigationBarText">Search</p>
            </motion.div>

            {/* create */}
            <motion.div
              className="navationDivIconBar order-3 sm:order-3"
              whileTap={{ scale: 1.1 }}>
              <img src={create} className="navigationBarIcon" alt="home" />
              <p className="navigationBarText">Create</p>
            </motion.div>

            {/* message */}
            <motion.div
              className="navationDivIconBar order-4 sm:order-2"
              whileTap={{ scale: 1.1 }}>
              <img src={message} className="navigationBarIcon " alt="home" />
              <p className="navigationBarText">Messages</p>
            </motion.div>

            {/* profile */}
            <motion.div
              className="navationDivIconBar order-5 sm:order-5"
              whileTap={{ scale: 1.1 }}>
              <div className="md:ml-3 sm:mt-0.5"><img className="w-7 h-7 sm:w-6 sm:h-6 rounded-full border border-black dark:border-white" src={demoData} /></div>
              <p className="navigationBarText">Profile</p>
            </motion.div>
          </div>

          <div className="mt-16 hidden sm:block">
            {/* theme */}
            <motion.div className="md:my-7 sm:my-10 navationDivIconBar transform" onClick={handleTheme}>
              <div className="flex justify-center">
                {theme ?
                  <img src={sun} className="navigationBarIcon" alt="home" />
                  :
                  <img src={moon} className="navigationBarIcon" alt="home" />}
                <p className="navigationBarText">Theme</p>
              </div>
            </motion.div>
            
            {/* logout */}
            <motion.div
              className="navationDivIconBar transform "
              whileTap={{ scale: 1.1 }} onClick={handleLogout}>
              <img src={logout} className="navigationBarIcon " alt="home" />
              <p className="navigationBarText">Logout</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 