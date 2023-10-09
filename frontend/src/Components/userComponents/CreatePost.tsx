import "./user.css";
import { NavigationBar } from "./Index";
import { createPostValidationSchema } from '../../validations/validation'
import { useFormik } from "formik";
import { DragEvent, useCallback } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/user/userInfo";


export default function CreatePost() {
    const userInfo = useSelector((state : RootState) => state.userInformation)
    
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: null,
        },
        validationSchema: createPostValidationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values);
            } catch (error) {
                console.log(error);
            }
        }
    })

    const handleImageDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        const files = e.dataTransfer?.files
        if (files && files.length > 0) {
            const file = files[0]
            formik.setFieldValue('image', file)
        }
    }, [formik])

    return (
        <div
            className="flex dark:bg-slate-950 duration-300"
            style={{ height: "2000px" }}
        >
            <div>
                <NavigationBar />
            </div>
            <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center mt-5">
                    <div className="px-2 sm:px-16">
                        <h1 className="font-bold text-4xl">Create Post</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="relative mt-10 mb-5">
                                <input
                                    type="text"
                                    id="floating_outlined"
                                    className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="floating_outlined"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Title
                                </label>
                            </div>
                            <div className="relative">
                                <textarea
                                    id="message" rows={6}
                                    className="block mb-5 p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
                                </textarea>
                                <div className="absolute bottom-1 right-2 text-gray-500 text-sm">100</div>
                            </div>
                            <div className="relative">
                                <label htmlFor="file_input"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-10"
                                    onDrop={handleImageDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <motion.div
                                        className="text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}>
                                        <p>Drag & Drop or Click to Upload Image</p>
                                    </motion.div>
                                </label>
                                <input
                                    id="file_input"
                                    type="file"
                                    accept="iamge/jpeg , image/png"
                                    className="hidden"
                                    onChange={(e) => {
                                        formik.setFieldValue('image', e.target.files?.[0])
                                    }} />
                            </div>
                            <button type="submit"
                                className="bg-blue-950 hover:bg-blue-900 text-white rounded-lg py-2 px-5 mt-5 focus:outline-none transition duration-300 ease-in-out"
                            ><motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}>
                                    Post
                                </motion.div></button>
                        </form>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="font-bold text-4xl">Preview Post</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
