import { PostCollectionProps, PropsData } from "../../interface/interface";
import { getProfilePost } from "../../Api/userApi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import equal from "../../assets/icon/equal.png";
import grid from "../../assets/icon/grid.png";
import "./user.css";

export default function PostCollection({ role }: PostCollectionProps) {
  const [datas, setData] = useState<PropsData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [Grid, setGrid] = useState<string>("grid-cols-2");
  const [page, setPage] = useState<number>(1);

  const fetchData = async (pageNumber: number) => {
    if (role === "user") {
      const { data } = await getProfilePost(pageNumber);
      setData((prevData) => {
        const newData = data.post.filter(
          (post: PropsData) =>
            !prevData.some((existingPost) => existingPost._id === post._id)
        );
        return [...prevData, ...newData];
      });
      setPage(pageNumber);
    }
  };

  useEffect(() => {
    fetchData(page);

    const HandleScroll = () => {
      if (
        window.innerHeight + window.screenY >=
        document.body.offsetHeight - 500
      ) {
        fetchData(page + 1);
      }
    };
    window.addEventListener("scroll", HandleScroll);

    return () => {
      window.removeEventListener("scroll", HandleScroll);
    };

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
