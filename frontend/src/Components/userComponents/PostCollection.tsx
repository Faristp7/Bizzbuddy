import { PostCollectionProps, PropsData } from "../../interface/interface";
import { getProfilePost } from "../../Api/userApi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import equal from '../../assets/icon/equal.png'
import grid from '../../assets/icon/grid.png'
import './user.css'

export default function PostCollection({ role }: PostCollectionProps) {
  const [datas, setData] = useState<PropsData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchData = async () => {
    if (role === "user") {
      const { data } = await getProfilePost();
      setData(data.post);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <div className="flex justify-end gap-2 mr-5 mb-3">
          <img src={equal} className="w-7 h-7 cursor-pointer" alt="single" />
          <img src={grid} className="w-7 h-7 cursor-pointer" alt="double" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12 sm:mb-5">
        {datas &&
          datas.map((item) => (
            <motion.div
              layoutId={item._id}
              key={item._id}
              onClick={() => setSelectedId(item._id)}
              className="cursor-pointer p-2 border mb-2 rounded hover:bg-gray-100"
            >
              <motion.h5 className="font-extrabold text-2xl dark:text-white">{item.title}</motion.h5>
              <motion.p>{item.description}</motion.p>
              <img src={item.image} alt="" />
            </motion.div>
          ))}

        <AnimatePresence>
          {selectedId && (
            <motion.div
              className="modal-overlay fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="bg-white p-4 rounded shadow-lg text-center" layoutId={selectedId}>
                {datas.map((item) => {
                  if (item._id === selectedId) {
                    return (
                      <div key={item._id}>
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
                          onClick={() => setSelectedId(null)}
                        >
                          Close
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
