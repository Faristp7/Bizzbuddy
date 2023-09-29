import "../user.css"
import bannerImage from '../../../assets/img/bannerImage.jpg'
import edit from '../../../assets/icon/edit.png'
import add from '../../../assets/icon/add.png'
import { NavigationBar } from "../Index";
import { motion } from "framer-motion";
import { useState, lazy, Suspense } from "react";
import { Waveform } from "@uiball/loaders"
const ListBussinessModal = lazy(() => import("../../modals/ListBussinessModal"))

export default function Profile() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const demoData = 'https://lh3.googleusercontent.com/a/ACg8ocKkAceSJBcHV9mDZaFyM2OvbhjQJXAdA3ZGzOba1g-pBQpo=s96-c'
  return (
    <div className="flex dark:bg-slate-950" style={{ height: '2000px' }}>
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
        <div>
          <div className="relative">
            <img src={bannerImage} className="rounded-sm h-40 sm:h-56 w-full" alt="banner" />
            <div className="absolute bottom-0  left-2/4 sm:left-28 transform -translate-x-1/2 translate-y-1/2">
              <img className="rounded-full h-28 sm:h-36 border-4 border-white dark:border-slate-950" src={demoData} alt="profile" />
            </div>
          </div>
          <div className="flex justify-between m-2 sm:ml-48 sm:mt-3 leading-none">
            <div>
              <h3 className="font-bold text-xl sm:text-2xl">Faris_tp_</h3>
              <h5 className="font-semibold sm:text-lg text-gray-400">Builder</h5>
            </div>
            <div>
              <motion.button
                className="bg-blue-900 rounded-md m-2 px-3 py-2 text-white flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
            </div>
          </div>
          <div className="mt-5 ml-1 sm:ml-6">
            <p className="text-md leading-none">Expolre the world build <br /> future house</p>
            <div className="flex gap-3 text-center mt-4">
              <div className="bg-gray-200 dark:bg-gray-600 rounded-md">
                <p className="rounded-md px-2 py-0.5">Rent</p>
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 rounded-md">
                <p className="rounded-md px-2 py-0.5">sale</p>
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 rounded-md">
                <p className="rounded-md px-2 py-0.5">service</p>
              </div>
            </div>
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
          </div>
          <div className="flex justify-center">
            <Suspense fallback={
              <Waveform
                size={40}
                lineWeight={3.5}
                speed={1}
                color="black"
              />}>
              {isOpen && <ListBussinessModal close={() => setIsOpen(!isOpen)} />}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}                                            