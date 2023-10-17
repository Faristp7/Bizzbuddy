import { PostCollectionProps, PropsData } from "../../interface/interface";
import { deletePost, editUserPost, getProfilePost } from "../../Api/userApi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import equal from "../../assets/icon/equal.png";
import grid from "../../assets/icon/grid.png";
import close from "../../assets/icon/close.png";
import tick from "../../assets/icon/tick.png";
import pencil from "../../assets/icon/pencil.png";
import deleteIcon from "../../assets/icon/delete.png";
import InfiniteScroll from "react-infinite-scroll-component";
import "./user.css";
import { Ring } from "@uiball/loaders";
import { useFormik } from "formik";
import { editPostValidationSchema } from "../../validations/validation";
import { useNavigate } from "react-router-dom";

export default function PostCollection({ role, userIdForPost, guestUser }: PostCollectionProps) {
  const [datas, setData] = useState<PropsData[]>([]);
  const [selectedPost, setSelcetedPost] = useState<PropsData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [Grid, setGrid] = useState<string>("grid-cols-2");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isEditing, setisEditing] = useState<boolean>(false);

  const navigate = useNavigate()

  const fetchData = async (pageNumber: number) => {
    if (role === "user") {
      const response = await getProfilePost(userIdForPost, pageNumber);
      const newData = response?.data?.post;
      setData((prevData) => {
        const uniqueNewData = newData.filter(
          (newItem: PropsData) =>
            !prevData.some((existingItem) => existingItem._id === newItem._id)
        );
        return [...prevData, ...uniqueNewData];
      });
      setHasMore(newData.length > 0);
    }
    else{
      console.log(role , userIdForPost , guestUser);
    }
  };

  const fetchMoreData = () => {
    fetchData(page + 1);
    setPage(page + 1);
  };

  const formik = useFormik({
    initialValues: {
      title: selectedPost?.title || "",
      description: selectedPost?.description || "",
    },
    validationSchema: editPostValidationSchema,
    onSubmit: async (values) => {
      const id = selectedPost?._id
      const { data } = await editUserPost({ values, id })
      if (data.success) {
        navigate('/userHomePage')
      }
    },
  });

  const deleteUserPost = async (id: string) => {
    const { data } = await deletePost(id)
    if (data.success) {
      navigate('/userHomePage')
    }
  }

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isEditing]);

  useEffect(() => {
    if (selectedPost) {
      formik.setValues({
        title: selectedPost.title,
        description: selectedPost.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost, formik.setValues]);

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
          loader={
            <div className="flex items-center justify-center h-screen">
              <Ring size={40} lineWeight={5} speed={2} color="black" />
            </div>
          }
          endMessage={<p className="text-center text-lg mb-5">Content over</p>}
        >
          <div className={`grid grid-cols-1 md:${Grid} gap-3 mb-12 sm:mb-5`}>
            {datas &&
              datas.map((item) => (
                <motion.div
                  layoutId={item._id}
                  key={item._id}
                  onClick={() => setSelectedId(item._id)}
                  className="cursor-pointer p-2 border-b sm:border mb-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <motion.h5 className="text-3xl font-extrabold tracking-tight leading-snug dark:text-white">
                    {item.title}
                  </motion.h5>
                  <motion.p className="text-lg font-medium my-2 text-gray-600 dark:text-white">
                    {item.description}
                  </motion.p>
                  <div className="flex items-center justify-center h-96">
                    <img
                      src={item.image}
                      alt="post"
                      className="w-auto h-full"
                    />
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
                className="bg-white w-auto sm:w-96 p-4 rounded shadow-lg dark:bg-slate-900"
                layoutId={selectedId}
              >
                {datas.map((item) => {
                  if (item._id === selectedId) {
                    return (
                      <div key={item._id}>
                        <div className="flex justify-end rounded-full">
                          <img
                            src={close}
                            className="dark:invert w-7 bg-gray-200 rounded-full p-1 mb-2 cursor-pointer"
                            alt="X"
                            onClick={() => {
                              setSelectedId(null);
                              setisEditing(false);
                            }}
                          />
                        </div>
                        <h5 className="font-bold  text-3xl dark:text-white">
                          {!isEditing ? (
                            <span className="text-center">
                              {item.title}
                            </span>
                          ) : (
                            <div className="relative z-0 w-full mb-2 group mt-3">
                              <input
                                type="text"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                id="title"
                                className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                {formik.errors.title &&
                                  typeof formik.errors.title === "string" ? (
                                  <span className="text-red-500">
                                    {formik.errors.title}
                                  </span>
                                ) : (
                                  "Title"
                                )}
                              </label>
                            </div>
                          )}
                        </h5>
                        <div className="text-lg font-medium my-2 text-gray-900 dark:text-white">
                          {!isEditing ? (
                            item.description
                          ) : (
                            <div className="relative z-0 w-full mb-3 group mt-3">
                              <textarea
                                // type="text"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                rows={10}
                                id="description"
                                className="block resize-none py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="description"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                {formik.errors.description &&
                                  typeof formik.errors.description ===
                                  "string" ? (
                                  <span className="text-red-500">
                                    {formik.errors.description}
                                  </span>
                                ) : (
                                  "description"
                                )}
                              </label>
                            </div>
                          )}
                        </div>
                        {!guestUser &&
                          <div className="flex justify-end gap-3">
                            <img src={deleteIcon} onClick={() => deleteUserPost(item._id)} className="bg-gray-300 rounded-full w-7 cursor-pointer p-1 dark:invert" alt="Delete" />
                            <img
                              src={!isEditing ? pencil : tick}
                              className="bg-gray-300 rounded-full w-7 cursor-pointer p-1 dark:invert"
                              alt="edit"
                              onClick={() => {
                                if (!isEditing) {
                                  setisEditing(true)
                                  setSelcetedPost(item)
                                } else {
                                  formik.handleSubmit()
                                }
                              }}
                            />
                          </div>
                        }
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
