import "../user.css"
import home from '../../../assets/icon/homeIcon.png'
import logo from '../../../assets/img/handshake.png'
import search from '../../../assets/icon/search.png'
import message from '../../../assets/icon/send.png'
import create from '../../../assets/icon/create.png'
import logout from '../../../assets/icon/logout.png'
import sun from '../../../assets/icon/sun.png'
import moon from '../../../assets/icon/moon.png'
import exclamation from '../../../assets/icon/exclamation.png'
import mangment from '../../../assets/icon/management.png'
import verification from '../../../assets/icon/verification.png'

import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { RootState, userLoggedOut } from "../../../Redux/user/authSlice"
import { adminLoggedOut } from "../../../Redux/admin/adminAuth"

export default function NavigationBar() {
  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme ? JSON.parse(savedTheme) : false);
  const login = useSelector((state: RootState) => state.user.isLoggedIn)
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
    dispatch(adminLoggedOut(false))
    navigate('/')
  }
  return (
    <div className="">
      <div className="border-t-2 sm:border-r-2 sm:border-t-0 fixed left-0 bottom-2 w-full sm:w-auto sm:left-0 sm:top-0 sm:h-screen  dark:text-white bg-white dark:bg-slate-950 duration-300">
        <div className="px-3">
          <div className="">
            <h1 className="hidden md:block uppercase font-bold text-4xl my-3 mt-6">Bizzbuddy</h1>
            <img className="hidden sm:block md:hidden w-10 invert-0 mt-10 dark:invert" src={logo} alt="Logo" />
          </div>
          <div className="flex flex-row gap-14 sm:gap-8 md:gap-8 sm:flex-col mt-2 sm:mt-12">
            {login ? (
              <>
                {/* Home */}
                <Link to={"/userHomePage"}>
                  <motion.div
                    className="navationDivIconBar order-1 sm:order-1"
                    whileTap={{ scale: 1.1 }}>
                    <img src={home} className="navigationBarIcon" alt="home" />
                    <p className="navigationBarText">Home</p>
                  </motion.div>
                </Link>

                {/* search */}
                <Link to={"/userHomePage"}>
                  <motion.div
                    className=
                    "navationDivIconBar order-2 sm:order-4"
                    whileTap={{ scale: 1.1 }}>
                    <img src={search} className="navigationBarIcon " alt="home" />
                    <p className="navigationBarText">Search</p>
                  </motion.div>
                </Link>

                {/* create */}
                <Link to={"/userHomePage"}>
                  <motion.div
                    className="navationDivIconBar order-3 sm:order-3"
                    whileTap={{ scale: 1.1 }}>
                    <img src={create} className="navigationBarIcon" alt="home" />
                    <p className="navigationBarText">Create</p>
                  </motion.div>
                </Link>

                {/* message */}
                <Link to={"/userHomePage"}>
                  <motion.div
                    className="navationDivIconBar order-4 sm:order-2"
                    whileTap={{ scale: 1.1 }}>
                    <img src={message} className="navigationBarIcon " alt="home" />
                    <p className="navigationBarText">Messages</p>
                  </motion.div>
                </Link>

                {/* profile */}
                <Link to={"/userProfile"}>
                  <motion.div
                    className="navationDivIconBar order-5 sm:order-5"
                    whileTap={{ scale: 1.1 }}>
                    <div className="md:ml-4 sm:mt-0.5"><img className="w-7 h-7 sm:w-6 sm:h-6 rounded-full border border-black dark:border-white" src={demoData} /></div>
                    <p className="navigationBarText">Profile</p>
                  </motion.div>
                </Link>
              </>
            ) :
              <>
                <motion.div
                  className="navationDivIconBar order-4 sm:order-2"
                  whileTap={{ scale: 1.1 }}>
                  <img src={mangment} className="navigationBarIcon " alt="home" />
                  <p className="navigationBarText">User Management</p>
                </motion.div>
                <motion.div
                  className="navationDivIconBar order-4 sm:order-2"
                  whileTap={{ scale: 1.1 }}>
                  <img src={exclamation} className="navigationBarIcon " alt="home" />
                  <p className="navigationBarText">Report Section</p>
                </motion.div>
                <motion.div
                  className="navationDivIconBar order-4 sm:order-2"
                  whileTap={{ scale: 1.1 }}>
                  <img src={verification} className="navigationBarIcon " alt="home" />
                  <p className="navigationBarText">Verifcation</p>
                </motion.div>
              </>
            }
          </div>

          < div className='hidden sm:block mt-16'>
            {/* theme */}
            {login && (
              <motion.div className="md:my-7 sm:my-10 navationDivIconBar transform" onClick={handleTheme}>
                <div className="flex justify-center">
                  {theme ?
                    <img src={sun} className="navigationBarIcon" alt="home" />
                    :
                    <img src={moon} className="navigationBarIcon" alt="home" />}
                  <p className="navigationBarText">Theme</p>
                </div>
              </motion.div>
            )}

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