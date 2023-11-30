import "./user.css";
import verticalMenu from "../../assets/icon/menu-vertical-50.png";
import like from "../../assets/icon/like-Light.png";
import axios from "axios";
import { NavigationBar } from "./Index";
import { createPostValidationSchema } from "../../validations/validation";
import { useFormik } from "formik";
import { DragEvent, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/user/userInfo";
import { createPost } from "../../Api/userApi";
import { Ring } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [letterCount, setLetterCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonText, setbuttonText] = useState<string>("Post");
  const userInfo = useSelector((state: RootState) => state.userInformation);

  const navigate = useNavigate();
  const presetKey = "p2bwkmow";
  const cloudName = "dglfnmf0x";

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null,
    },
    validationSchema: createPostValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        if (values.image) {
          const img = new Image();
          img.src = URL.createObjectURL(values.image);

          img.onload = async () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (ctx) {
              const aspectRatio = 1;
              let newWidth, newHeight;
              if (img.width > img.height) {
                newWidth = img.height * aspectRatio;
                newHeight = img.height;
              } else {
                newWidth = img.width;
                newHeight = img.width * aspectRatio;
              }
              canvas.width = newWidth;
              canvas.height = newHeight;

              ctx.drawImage(img , 0 ,0 , newWidth , newHeight)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              canvas.toBlob(async (blob: any) => {
                formData.append("file", blob);
                formData.append("upload_preset", presetKey);
                formData.append("cloud_name", cloudName);
                
                setbuttonText("Uploading");
                axios
                  .post(
                    "https://api.cloudinary.com/v1_1/dglfnmf0x/image/upload",
                    formData
                    )
                    .then(async (res) => {
                        const url = res.data.secure_url;
                    setbuttonText("Publishing");
                    await createPost({ url, values }).then(({ data }) => {
                      if (data.status) {
                        setLoading(false);
                        setbuttonText("Posted");
                        setTimeout(() => {
                          navigate("/userProfile");
                        }, 3000);
                      }
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            }
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImageDrop = useCallback(
    (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const file = files[0];
        formik.setFieldValue("image", file);
      }
    },
    [formik]
  );

  return (
    <div className="flex dark:bg-slate-950 duration-300 min-h-screen">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center mt-5">
          <div className="px-2 sm:px-16">
            <h1 className="font-extrabold leading-none tracking-tight text-gray-900 text-5xl dark:text-white">
              Create Post
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="relative mt-10 mb-5">
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                <label
                  htmlFor="title"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  {formik.errors.title ? (
                    <span className="text-red-600">{formik.errors.title}</span>
                  ) : (
                    "Title"
                  )}
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  rows={8}
                  name="description"
                  value={formik.values.description}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setLetterCount(e.target.value.length);
                  }}
                  className="block mb-5 p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
                <div className="absolute bottom-1 right-2 text-gray-500 text-sm">
                  {letterCount}/800
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="file_input"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-10"
                  onDrop={handleImageDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>
                      {formik.values.image ? (
                        <img
                          src={URL.createObjectURL(formik.values.image)}
                          alt="selected"
                          className="object-cover h-44 w-auto overflow-hidden"
                        />
                      ) : (
                        "Drag & Drop or Click to Upload Image"
                      )}
                    </p>
                  </motion.div>
                </label>
                <input
                  id="file_input"
                  type="file"
                  accept="iamge/jpeg , image/png"
                  className="hidden"
                  name="image"
                  onChange={(e) => {
                    formik.setFieldValue("image", e.target.files?.[0]);
                  }}
                />
                <p className="py-3 text-red-500">{formik.errors.image}</p>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex gap-3 text-lg bg-blue-950 hover:bg-blue-900 text-white rounded-lg py-2 px-5 focus:outline-none transition duration-300 ease-in-out "
                >
                  {buttonText}
                  {loading && (
                    <Ring size={25} lineWeight={5} speed={2} color="white" />
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-extrabold mb-10 leading-none tracking-tight text-gray-900 text-5xl dark:text-white">
              Preview Post
            </h1>
            <div className="px-2 sm:px-16">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img
                    src={userInfo.profileImage}
                    alt="profile"
                    className="w-7 h-7 rounded-full border  border-black dark:border-white"
                  />
                  <p className="text-lg">{userInfo.username}</p>
                </div>
                <div>
                  <img src={verticalMenu} className="w-5" alt="menu" />
                </div>
              </div>
              <div className="text-left">
                <h6 className="text-2xl font-extrabold tracking-tight leading-snug text-gray-900 mt-4 dark:text-white">
                  {formik.values.title}
                </h6>
                <p className="font-medium mt-3 text-gray-700 dark:text-gray-400">
                  {formik.values.description}
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                {formik.values.image && (
                  <img
                    src={URL.createObjectURL(formik.values.image)}
                    className="object-cover h-64 w-full rounded-md"
                  />
                )}
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex gap-2">
                  <img src={like} alt="like" className="w-6 dark:invert" />
                  <p>0</p>
                </div>
                <div>
                  <p className="underline text-gray-500 text-sm">Add comment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
