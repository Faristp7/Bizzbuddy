import { PostCollectionProps, PropsData } from "../../interface/interface";
import {
  deletePost,
  editUserPost,
  getHomePagePost,
  getProfilePost,
  manageLike,
} from "../../Api/userApi";
import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import close from "../../assets/icon/close.png";
import tick from "../../assets/icon/tick.png";
import pencil from "../../assets/icon/pencil.png";
import deleteIcon from "../../assets/icon/delete.png";
import dots from "../../assets/icon/menu-vertical-50.png";
import beforeLikefrom from "../../assets/icon/like-Light.png";
import afterLikefrom from "../../assets/icon/like-hard.png";
import InfiniteScroll from "react-infinite-scroll-component";
import "./user.css";
import { Ring, Waveform } from "@uiball/loaders";
import { useFormik } from "formik";
import { editPostValidationSchema } from "../../validations/validation";
import { useNavigate } from "react-router-dom";
import ReportModal from "../modals/ReportModal";
const Comment = lazy(() => import('../userComponents/Comment'))

export default function PostCollection({
  role,
  userIdForPost,
  guestUser,
  selectedFilter,
  setUserId,
}: PostCollectionProps) {
  const [datas, setData] = useState<PropsData[]>([]);
  const [selectedPost, setSelcetedPost] = useState<PropsData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isEditing, setisEditing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuId, setMenuId] = useState<string>("");
  const [viewComment, setViewComment] = useState<string>("")

  const navigate = useNavigate();

  const fetchData = async (pageNumber: number) => {
    let response;
    if (role === "user") {
      response = await getProfilePost(userIdForPost, pageNumber);
    } else {
      const queryParams = new URLSearchParams();
      if (pageNumber) queryParams.append("page", pageNumber.toString());
      if (selectedFilter) queryParams.append("filter", selectedFilter);
      response = await getHomePagePost(queryParams);
    }
    const newData = response?.data?.post;

    setData((prevData) => {
      const uniqueNewData = newData.filter(
        (newItem: PropsData) =>
          !prevData.some((existingItem) => existingItem._id === newItem._id)
      );
      return [...prevData, ...uniqueNewData];
    });
    setHasMore(newData.length > 0);
  };

  useEffect(() => {
    fetchData(1);
    setData([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

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
      const id = selectedPost?._id;
      const { data } = await editUserPost({ values, id });
      if (data.success) {
        navigate("/userHomePage");
      }
    },
  });

  const deleteUserPost = async (id: string) => {
    const { data } = await deletePost(id);
    if (data.success) {
      navigate("/userHomePage");
    }
  };

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


  const likeAndDislike = async (postId: string, userId: string) => {
    const updatedDatas: PropsData[] = datas.map((post) => {
      if (post._id === postId) {
        const likedByUser = post.likes && post.likes.includes(userId);
        return {
          ...post,
          likes: likedByUser ? post.likes.filter(id => id !== userId) : [...(post.likes || []), userId]
        };
      }
      return post;
    });
    await manageLike({ postId });
    setData(updatedDatas);
  };

  return (
    <div className="container mx-auto md:w-[90%]">
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
          endMessage={
            <div className="flex justify-center text-center text-lg mb-5">
              {datas.length === 0 ? (
                "Nothing to show"
              ) : (
                <img className="animate-bounce dark:invert" src={tick} />
              )}
            </div>
          }
        >
          <div className="mb-5 sm:mb-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
            {datas &&
              datas.map((item) => (
                <motion.div
                  layoutId={item._id}
                  key={item._id}
                  className="my-10 mb-2 border-b"
                >
                  <div className="">
                    {guestUser && (
                      <div className="flex justify-between px-1">
                        <div
                          className="flex space-x-3"
                          onClick={() =>
                            setUserId && setUserId(item.userId._id)
                          }
                        >
                          <img
                            src={item.userId.profileImage}
                            className="rounded-full w-8 h-8 border"
                            alt="..."
                          />
                          <h6 className="text-xl mt-0.5 cursor-pointer">
                            {item.userId.username}
                          </h6>
                        </div>
                        <div className="relative">
                          <img
                            src={dots}
                            className="w-5 h-5 dark:invert cursor-pointer"
                            alt="..."
                            onClick={() =>
                              menuId === item._id
                                ? setMenuId("")
                                : setMenuId(item._id)
                            }
                          />
                          {menuId === item._id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute right-5 bg-white dark:bg-slate-900 dark:border-0 border-2 rounded-md"
                            >
                              <ul className="px-4 py-1">
                                <li
                                  className="cursor-pointer"
                                  onClick={() => setIsOpen(!isOpen)}
                                >
                                  Report
                                </li>
                              </ul>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}

                    <div
                      onClick={() => setSelectedId(item._id)}
                      className="cursor-pointer mt-3"
                    >
                      <motion.h5 className="text-4xl text-center font-extrabold tracking-tight leading-snug dark:text-white">
                        {item.title}
                      </motion.h5>
                      <motion.p className="text-lg font-medium mt-4 my-2 text-gray-600 dark:text-white">
                        {item.description}
                      </motion.p>
                      <div className="flex items-center mt-3 justify-center h-96 w-full">
                        <img
                          src={item.image}
                          alt="post"
                          className="sm:w-[100%] mt-5 rounded-lg  h-full"
                        />
                      </div>
                    </div>
                    <div className="mt-5 mb-4 flex justify-between">
                      <div className="flex gap-2">
                        <motion.img
                          whileTap={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                          src={
                            !item?.likes?.includes(item.userId._id)
                              ? beforeLikefrom
                              : afterLikefrom
                          }
                          className="w-6 h-6 cursor-pointer dark:invert"
                          onClick={() =>
                            likeAndDislike(item._id, item.userId._id)
                          }
                          alt="👍"
                        />
                        <p className="mt-0.5">{item.likes.length}</p>
                      </div>
                      <div>
                        <p className="underline cursor-pointer" onClick={() =>
                          viewComment === item._id
                            ? setViewComment("")
                            : setViewComment(item._id)
                        }>View comment</p>
                      </div>
                    </div>
                    <div>
                      <Suspense fallback={
                        <Waveform
                          size={40}
                          lineWeight={3.5}                                          //edit profile modal open
                          speed={1}
                          color="black"
                        />}>
                        {viewComment &&
                          <Comment viewComment={viewComment} itemId={item._id} />
                        }
                      </Suspense>

                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </InfiniteScroll>
        <div>
          {isOpen && (
            <ReportModal close={() => setIsOpen(!isOpen)} _id={menuId} />
          )}
        </div>

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
                            <span className="text-center">{item.title}</span>
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
                        {!guestUser && (
                          <div className="flex justify-end gap-3">
                            <img
                              src={deleteIcon}
                              onClick={() => deleteUserPost(item._id)}
                              className="bg-gray-300 rounded-full w-7 cursor-pointer p-1 dark:invert"
                              alt="Delete"
                            />
                            <img
                              src={!isEditing ? pencil : tick}
                              className="bg-gray-300 rounded-full w-7 cursor-pointer p-1 dark:invert"
                              alt="edit"
                              onClick={() => {
                                if (!isEditing) {
                                  setisEditing(true);
                                  setSelcetedPost(item);
                                } else {
                                  formik.handleSubmit();
                                }
                              }}
                            />
                          </div>
                        )}
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
