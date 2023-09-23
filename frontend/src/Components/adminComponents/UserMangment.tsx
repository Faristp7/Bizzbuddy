import { motion } from "framer-motion";
import { NavigationBar } from "../userComponents/Index";
import CountUp from 'react-countup'

export default function UserMangment() {
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
      </div>
    </div>
  )
}
