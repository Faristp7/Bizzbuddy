import { PostCollectionProps, PropsData } from "../../interface/interface";
import { getProfilePost } from "../../Api/userApi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import equal from "../../assets/icon/equal.png";
import grid from "../../assets/icon/grid.png";
import InfiniteScroll from 'react-infinite-scroll-component'
import "./user.css";
import { Ring } from '@uiball/loaders'

export default function PostCollection({ role }: PostCollectionProps) {
  const [datas, setData] = useState<PropsData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [Grid, setGrid] = useState<string>("grid-cols-2");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true)

  const fetchData = async (pageNumber: number) => {
    if (role === "user") {
      const response = await getProfilePost(pageNumber);
      const newData = response.data.post
      setData((prevData) => {
        const uniqueNewData = newData.filter(
          (newItem: PropsData) => !prevData.some((existingItem) => existingItem._id === newItem._id)
        );
        return [...prevData, ...uniqueNewData];
      });

      setHasMore(newData.length > 0)
    }
  }

  const fetchMoreData = () => {
    fetchData(page + 1)
    setPage(page + 1)
  }

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <div className="hidden md:block">
        <div className="flex justify-end gap-2 mr-5 mb-3">
          <img
            src={equal}
            onClick={() => setGrid("grid-cols-1")}
            className="w-7 h-7 cursor-pointer dark:invert"
            alt="single"
          />
          <img
            src={grid}
            onClick={() => setGrid("grid-cols-2")}
            className="w-7 h-7 cursor-pointer dark:invert"
            alt="double"
          />
        </div>
      </div>
      <div>
        <InfiniteScroll
          dataLength={datas.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="flex items-center justify-center h-screen">
            <Ring
              size={40}
              lineWeight={5}
              speed={2}
              color="black"
            />
          </div>}
          endMessage={<p className="text-center text-lg mb-5">Content over</p>}>
          <div className={`grid grid-cols-1 md:${Grid} gap-3 mb-12 sm:mb-5`}>
            {datas &&
              datas.map((item) => (
                <motion.div
                  layoutId={item._id}
                  key={item._id}
                  onClick={() => setSelectedId(item._id)}
                  className="cursor-pointer p-2 border mb-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <motion.h5 className="font-bold text-3xl dark:text-white">
                    {item.title}
                  </motion.h5>
                  <motion.p className="text-lg font-medium my-2 text-gray-900 dark:text-white">
                    {item.description}
                  </motion.p>
                  <div className="flex items-center justify-center h-96">
                    <img src={item.image} alt="post" className="w-auto h-full" />
                  </div>
                </motion.div>
              ))}
          </div>
        </InfiniteScroll>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              className="fixed top-0 left-0 flex items-center p-3 justify-center w-full h-full bg-gray-800 bg-opacity-75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-auto sm:w-96 p-4 rounded shadow-lg text-center dark:bg-slate-900"
                layoutId={selectedId}
              >
                {datas.map((item) => {
                  if (item._id === selectedId) {
                    return (
                      <div key={item._id}>
                        <h5 className="font-bold text-3xl dark:text-white">
                          {item.title}
                        </h5>
                        <p className="text-lg font-medium my-2 text-gray-900 dark:text-white">
                          {item.description}
                        </p>
                        <button
                          className="bg-blue-950 text-white px-4 py-2 rounded mt-4 hover:bg-blue-900"
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
