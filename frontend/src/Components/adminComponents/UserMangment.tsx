import { motion } from "framer-motion";
import { NavigationBar } from "../userComponents/Index";
import CountUp from 'react-countup'
import { useState, useEffect } from "react";
import { getUserData } from "../../Api/userApi";

interface User {
  username : string
}

export default function UserMangment() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userData , setUserData] = useState<User[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData()
        setUserData(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  },[])

  const filteredUsers = userData.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavigationBar />
      <div className="ml-2 mt-5 sm:ml-24 md:ml-64 sm:mt-8 mr-2 sm:mr-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-gray-200 rounded-md p-3 text-center">
            <h3 className="font-bold text-4xl">Total User</h3>
            <CountUp start={0} end={50} duration={2.5}>
              {({ countUpRef, start }) => (
                <motion.h6
                  className="font-semibold text-3xl mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="cursor-pointer" ref={countUpRef} onClick={start} />
                </motion.h6>
              )}
            </CountUp>
          </div>
          <div className="bg-gray-200 rounded-md p-3 text-center">
            <h3 className="font-bold text-4xl">Active user</h3>
            <CountUp start={0} end={10} duration={2.5}>
              {({ countUpRef, start }) => (
                <motion.h6
                  className="font-semibold text-3xl mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="cursor-pointer" ref={countUpRef} onClick={start} />
                </motion.h6>
              )}
            </CountUp>
          </div>
          <div className="bg-gray-200 rounded-md p-3 text-center">
            <h3 className="font-bold text-4xl">Verified User</h3>
            <CountUp start={0} end={10} duration={2.5}>
              {({ countUpRef, start }) => (
                <motion.h6
                  className="font-semibold text-3xl mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="cursor-pointer" ref={countUpRef} onClick={start} />
                </motion.h6>
              )}
            </CountUp>
          </div>
        </div>
        <div>
      <input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded-md"
      />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Active Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.active ? 'Active' : 'Inactive'}</td>
              <td>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Block/Unblock
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
  )
}
