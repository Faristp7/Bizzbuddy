import "../user.css"
import settings from '../../../assets/icon/settings.png'
import sun from '../../../assets/icon/sun.png'
import moon from '../../../assets/icon/moon.png'
import logout from '../../../assets/icon/logout.png'
import edit from '../../../assets/icon/edit.png'
import add from '../../../assets/icon/add.png'
import { Chat, NavigationBar } from "../Index";
import { motion, useAnimation } from "framer-motion";
import { useState, lazy, Suspense, useEffect } from "react";
import { Waveform } from "@uiball/loaders"
import { getAnotherUserProfile, getUserProfile, manageFollow } from "../../../Api/userApi";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userLoggedOut } from "../../../Redux/user/authSlice"
import { adminLoggedOut } from "../../../Redux/admin/adminAuth"
import PostCollection from "../PostCollection"
const EditProfileModal = lazy(() => import("../../modals/EditProfileModal"))
const ListBussinessModal = lazy(() => import("../../modals/ListBussinessModal"))
const ViewFollow = lazy(() => import('../../modals/ViewFollow'))
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FollowCount } from "../../../interface/interface"

const savedTheme = localStorage.getItem('theme');
const subimage = 'https://res.cloudinary.com/dglfnmf0x/image/upload/v1698042901/ugwsothwchdhwbaz5qdr.jpg'

export default function Profile({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [theme, setTheme] = useState(savedTheme ? JSON.parse(savedTheme) : null); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>([])
  const [guestUser, setGuestUser] = useState<boolean>(false)
  const [postId, setPostId] = useState<string>('')
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [followCount, setFollowCount] = useState<FollowCount>({ followerCount: 0, followingCount: 0 })
  const [openFollow, setOpenFollow] = useState<boolean>(false)
  const [chatUserId, setChatUserId] = useState<string>('')
  const controls = useAnimation()

  const profileData = async () => {
    const { data } = await getUserProfile()
    setPostId(data.userDetails._id)
    setUserData(data.userDetails)
    setFollowCount({
      followerCount: data.followerCount,
      followingCount: data.followingCount
    })
  }

  const getGuesUserProfile = async (userId: string) => {
    const { data } = await getAnotherUserProfile(userId)
    setUserData(data.userDetails)
    setFollowCount({
      followerCount: data.followerCount,
      followingCount: data.followingCount
    })

    if (data.isFollowing) setIsFollowing(true)
    setGuestUser(true)
  }


  useEffect(() => {
    if (!userId) {
      profileData()
    }
    else {
      getGuesUserProfile(userId)
      setPostId(userId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editModalOpen, isFollowing])

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    })

    controls.start({
      scale: 1.2,
      transition: { duration: 0.5, yoyo: Infinity },
    })
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('JwtToken')
    dispatch(userLoggedOut(false))
    dispatch(adminLoggedOut(false))
    navigate('/')
  }

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

  const handleFollow = async (followingId: string) => {
    const { data } = await manageFollow({ followingId })
    if (data) setIsFollowing(!isFollowing)
  }

  if (chatUserId) {
    return <Chat userId={chatUserId} />
  }

  return (
    <div className="flex min-h-screen dark:bg-slate-950">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow  dark:text-white">
        <div>
          <div className="relative">
            <img
              src={userData?.bussinessId?.bannerImage || subimage}
              className="rounded-sm h-40 sm:h-56 w-full" alt="banner"
              loading="lazy" />
            <div className="absolute bottom-0  left-2/4 sm:left-28 transform -translate-x-1/2 translate-y-1/2">
              <img className="rounded-full h-28 w-28 sm:h-36 sm:w-36 border-4 border-white dark:border-slate-950" src={userData?.profileImage || subimage} alt="profile" loading="lazy" />
            </div>
          </div>
          <div className="flex justify-between m-2 sm:ml-48 sm:mt-3 leading-none">
            <div className="">
              <h3 className="font-semibold text-xl sm:text-3xl">{userData?.username || <Skeleton />}</h3>
            </div>
            <div className="flex items-center">
              <div className="hidden sm:block">
                {guestUser &&
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 rounded-md px-2 py-2.5 sm:px-5 text-white flex items-center"
                    onClick={() => setChatUserId(userData?._id)}
                  >
                    Message
                  </motion.button>
                }
              </div>
              {
                guestUser ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-900 rounded-md m-2 px-2 py-2 sm:px-5 text-white flex items-center"
                    onClick={() => handleFollow(userData?._id)}>
                    {!isFollowing ? "Follow" : "Unfollow"}
                  </motion.button>
                ) : (

                  <motion.button
                    className="bg-blue-900 rounded-md m-2 px-3 py-2 text-white flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditModalOpen(!editModalOpen)}
                  >
                    <motion.img
                      src={edit}
                      alt="edit"
                      className="w-5 mx-0.5 invert"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="hidden sm:block ml-1">Edit Profile</span>
                  </motion.button>
                )
              }
              <div className="relative block sm:hidden">
                <button onClick={() => setOpenSettings(!openSettings)}>
                  <motion.img
                    className={`dark:invert duration-300 ${openSettings ? 'rotate-90' : ''}`} src={settings} alt="settings" />
                </button>
                {openSettings &&
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-2 mt-3 rounded-md  py-1 border border-gray-900 w-28 bg-white z-10 dark:bg-slate-800">
                    <div
                      className="flex justify-center items-center gap-2 cursor-pointer px-2 hover:bg-gray-200 duration-200 dark:hover:bg-gray-700"
                      onClick={handleLogout}>
                      <img src={logout} className="w-5 dark:invert" alt="logout" />
                      <p className="truncate text-lg font-semibold">Logout</p>
                    </div>
                    <div
                      className="mt-1 flex justify-center items-center gap-2 cursor-pointer px-2 hover:bg-gray-200 duration-200 dark:hover:bg-gray-700"
                      onClick={handleTheme}>
                      {theme ?
                        <img src={sun} alt="theme" className="w-5 dark:invert" />
                        :
                        <img src={moon} alt="theme" className="w-5 dark:invert" />}
                      <p className="truncate text-lg font-semibold">Theme</p>
                    </div>
                  </motion.div>
                }
              </div>
            </div>
          </div>
          <div className="grid gap-2 place-items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={controls}
                className="font-bold text-3xl sm:text-6xl text-center">
                {userData?.bussinessId?.bussinessName}
              </motion.h1>
            </div>
            <div className="sm:hidden">
              {guestUser &&
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 rounded-md px-2 py-1 sm:px-5 text-white flex items-center"
                  onClick={() => setChatUserId(userData?._id)}
                >
                  Message
                </motion.button>
              }
            </div>
          </div>
          <div className="mt-5 ml-1 sm:ml-6">
            <p className="text-md font-medium leading-none">{userData?.bussinessId?.Description}</p>
            <div className="flex flex-wrap gap-3 text-center mt-4">
              {userData?.bussinessId?.tags.map((item: string, index: number) => (
                <div className="bg-gray-200 dark:bg-gray-600 rounded-md" key={index}>
                  <p className="rounded-md px-2 py-0.5">{item}</p>
                </div>
              ))}
            </div>

            {
              userData?.bussinessId?.bussinessName || guestUser ? "" :
                (
                  <motion.button
                    className="bg-blue-900 rounded-md mt-4 px-2 py-1 text-white flex items-center"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <motion.img
                      src={add}
                      alt="edit"
                      className="w-4 mx-0.5 invert"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    List Business
                  </motion.button>
                )
            }
          </div>

          <div className="flex justify-center fixed w-screen">
            <Suspense fallback={
              <Waveform
                size={40}
                lineWeight={3.5}                                         //list business modal open
                speed={1}
                color="black"
              />}>
              {isOpen && <ListBussinessModal close={() => setIsOpen(!isOpen)} _id="" />}
            </Suspense>
          </div>

          <div className="flex justify-center fixed w-screen">
            <Suspense fallback={
              <Waveform
                size={40}
                lineWeight={3.5}                                          //edit profile modal open
                speed={1}
                color="black"
              />}>
              {editModalOpen && <EditProfileModal close={() => setEditModalOpen(!editModalOpen)} userData={userData} />}
            </Suspense>
          </div>
          <div className="flex justify-between">
            <div className="mt-3 ml-1 sm:ml-6 flex gap-1 sm:gap-5 flex-col sm:flex-row">
              {userData?.bussinessId?.bussinessName && (
                <div>
                  <div className="flex gap-1">
                    <h3 className="font-bold text-md mb-1 hidden sm:block">Contact Us</h3>
                  </div>
                  <div className="ml-2">
                    <p>{userData?.bussinessId?.phone}</p>
                    <p>{userData?.bussinessId?.email}</p>
                  </div>
                </div>
              )}
              {userData?.bussinessId?.location && (
                <div>
                  <div className="flex">
                    <h1 className="font-bold mb-1 hidden sm:block">location</h1>
                  </div>
                  <div className="ml-2">
                    <p>{userData?.bussinessId?.location}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 cursor-pointer" onClick={() => setOpenFollow(true)}>
              <h6 className="text-lg font-bold">{followCount.followerCount} Followers</h6>
              <h6 className="text-lg font-bold">{followCount.followingCount} Following</h6>
            </div>
          </div>
          <div className="mt-5">
            {postId &&
              <PostCollection role={"user"} userIdForPost={postId} guestUser={guestUser} selectedFilter="" />
            }
          </div>
          <div className="flex justify-center">
            <Suspense fallback={
              <Waveform
                size={40}
                lineWeight={3.5}
                speed={1}
                color="black"
              />
            }>
              {openFollow && <ViewFollow close={() => setOpenFollow(!openFollow)} _id={postId} />}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}                                            