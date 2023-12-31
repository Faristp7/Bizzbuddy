import { motion } from "framer-motion";
import { NavigationBar } from "../userComponents/Index";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import { blockAndunBlock, getUserData } from "../../Api/userApi";
import { User , count} from "../../interface/interface";

export default function UserMangment() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count , setCount] = useState<count>({postCount : 0 , blockedUser : 0})

  useEffect(() => {

    (async () => {
      const respone = await getUserData()
      setUserData(respone.data.userData)
      setCount({postCount : respone.data.postCount , blockedUser : respone.data.blockedUser})
    })()

  }, [loading]);

  const filteredUsers = userData.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUser = async (id: string, activeStatus: boolean) => {
    setLoading((prevLoading) => !prevLoading);
    const response = await blockAndunBlock({ id, activeStatus });
    if (response.data.success) {
      setLoading((prevLoading) => !prevLoading);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="ml-2 mt-5 sm:ml-24 md:ml-64 sm:my-8 mr-2 sm:mr-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-gray-200 rounded-md p-3 text-center">
            <h3 className="font-bold text-4xl">Total User</h3>
            <CountUp start={0} end={userData.length} duration={2.5}>
              {({ countUpRef, start }) => (
                <motion.h6
                  className="font-semibold text-3xl mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span
                    className="cursor-pointer"
                    ref={countUpRef}
                    onClick={start}
                  />
                </motion.h6>
              )}
            </CountUp>
          </div>
          <div className="bg-gray-200 rounded-md p-3 text-center">
            <h3 className="font-bold text-4xl">Blocked Users</h3>
            <CountUp start={0} end={count.blockedUser} duration={2.5}>
              {({ countUpRef, start }) => (
                <motion.h6
                  className="font-semibold text-3xl mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span
                    className="cursor-pointer"
                    ref={countUpRef}
                    onClick={start}
                  />
                </motion.h6>
              )}
            </CountUp>
          </div>
          <div className="bg-gray-200 rounded-md p-3 text-center">
            <h3 className="font-bold text-4xl">Total Post</h3>
            <CountUp start={0} end={count.postCount} duration={2.5}>
              {({ countUpRef, start }) => (
                <motion.h6
                  className="font-semibold text-3xl mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span
                    className="cursor-pointer"
                    ref={countUpRef}
                    onClick={start}
                  />
                </motion.h6>
              )}
            </CountUp>
          </div>
        </div>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Search by email id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 pr-16 border border-neutral-600 rounded-md"
          />
          <div className="overflow-x-auto max-h-[69vh]">
            <table className="min-w-full text-center">
              <thead>
                <tr>
                  <th className="border-2  p-4">Username</th>
                  <th className="border-2  p-4">Email</th>
                  <th className="border-2  p-4">Phone</th>
                  <th className="border-2  p-4">Active Status</th>
                  <th className="border-2  p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="border-2  p-4">{user.username}</td>
                    <td className="border-2  p-4">{user.email}</td>
                    <td className="border-2  p-4">{user.phone}</td>
                    <td className="border-2  p-4">
                      {user.activeStatus ? "Active" : "Inactive"}
                    </td>
                    <td className="border-2  p-2">
                      {user.activeStatus ? (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="bg-red-700 text-white px-4 py-1 rounded-lg"
                          onClick={() =>
                            handleUser(user._id, user.activeStatus)
                          }
                        >
                          Block
                        </motion.button>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="bg-green-700 text-white px-2 py-1 rounded-lg"
                          onClick={() =>
                            handleUser(user._id, user.activeStatus)
                          }
                        >
                          Unblock
                        </motion.button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
