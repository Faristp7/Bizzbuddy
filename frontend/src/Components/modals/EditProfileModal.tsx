import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import "../userComponents/user.css";
import closeButton from "../../assets/icon/close.png";
import { userProfileUpdate } from "../../Api/userApi";
import { editUserProfileValidationSchema } from '../../validations/validation'
import { useFormik } from 'formik'
import axios from "axios";

interface editprofileModalProps {
    close: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData: any
}

export default function EditProfileModal({ close, userData }: editprofileModalProps) {
    const [activeTab, setActiveTab] = useState<number>(0);

    // const [updateUser, setUpdateUser] = useState({
    //     userName: userData.username,
    //     photo: null,
    //     email: userData.email,
    //     phone: userData.phone,
    // });

    const formik = useFormik({
        initialValues: {
            username: userData.username,
            photo: null,
            email: userData.email,
            phone: userData.phone
        },
        validationSchema: editUserProfileValidationSchema,
        onSubmit: async (values) => {
            try {
                const presetKey = "p2bwkmow";
                const cloudName = "dglfnmf0x";
                await editUserProfileValidationSchema.validate(values, { abortEarly: false })
                const formData = new FormData()
                if (values.photo) {
                    formData.append('file', values.photo)
                    formData.append('upload_preset', presetKey)
                    formData.append('cloud_name', cloudName)
                    axios.post("https://api.cloudinary.com/v1_1/dglfnmf0x/image/upload", formData,)
                        .then(async (res) => {
                            console.log(res);
                            const { data } = await userProfileUpdate(values)
                            console.log(data);
                        }).catch((err) => {
                            console.log(err);
                        })
                }
            } catch (error) {
                console.log(error);
            }
        }
    })

    // const [updateBusiness, setUpdateBusiness] = useState({
    //     businessName: '',
    //     description: '',
    //     phone: '',
    //     location: '',
    //     tags: ''
    // })

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            close();
        }
    };

    // const handleUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const { data } = await userProfileUpdate(updateUser)
    //     console.log(data);
    // };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setUpdateUser({
    //         ...updateUser,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // business

    // const handleBusinessSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(updateBusiness);
    // };

    // const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setUpdateBusiness({
    //         ...updateBusiness,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
        >
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="bg-white p-3 px-5 rounded-lg dark:bg-slate-900"
            >
                <div className="flex justify-end mb-3">
                    <button onClick={close}>
                        <img
                            src={closeButton}
                            alt="close"
                            className="w-6 h-6 dark:invert"
                        />
                    </button>
                </div>

                <Tab.Group>
                    <Tab.List className={"flex justify-between"}>
                        <Tab
                            className={`flex-1 rounded-md py-1 px-2 m-1 duration-300 ${activeTab === 0 ? "bg-blue-900 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => setActiveTab(0)}
                        >
                            user
                        </Tab>
                        <Tab
                            className={`flex-1 rounded-md py-1 px-2 m-1 duration-300 ${activeTab === 1 ? "bg-blue-900 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => setActiveTab(1)}
                        >
                            business
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel className={"flex flex-col"}>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="relative z-0 w-full mb-3 group mt-4">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        id="username"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="username"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {formik.errors.username && typeof formik.errors.username === 'string' ? (
                                            <span className="text-red-500">{formik.errors.username}</span>) : 'username'}
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                                        {formik.errors.photo && typeof formik.errors.photo === 'string' ? (
                                            <span className="text-red-500">{formik.errors.photo}</span>) : 'Upload Profile'}
                                    </label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input" type="file" name="photo" accept="image/jpeg , image/png"
                                        onChange={formik.handleChange} />
                                </div>
                                <div className="relative z-0 w-full mb-6 group mt-4">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        id="phone"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=""
                                        required
                                    />
                                    <label
                                        htmlFor="phone"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {formik.errors.phone && typeof formik.errors.phone === 'string' ? (
                                            <span className="text-red-500">{formik.errors.phone}</span>) : 'Phone number'}
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        id="email"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {formik.errors.email && typeof formik.errors.email === 'string' ? (
                                            <span className="text-red-500">{formik.errors.email}</span>) : 'Email address'}
                                    </label>
                                </div>
                                <div className="flex justify-end">
                                    <button className="bg-blue-900 rounded-lg flex-1 py-1 text-white" type="submit">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </Tab.Panel>
                        {/* business */}
                        <Tab.Panel>
                            {/* <form onSubmit={handleBusinessSubmit}>
                                <div className="relative z-0 w-full mb-6 group mt-3">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={handleBusinessChange}
                                        id="username"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        user name
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formik.phone}
                                        onChange={handleBusinessChange}
                                        id="name"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Phone number
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={updateUser.email}
                                        onChange={handleBusinessChange}
                                        id="email"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Email address
                                    </label>
                                </div>
                                <div className="flex justify-end">
                                    <button className="bg-blue-900 rounded-lg flex-1 py-1 text-white" type="submit">
                                        Update
                                    </button>
                                </div>
                            </form> */}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </motion.div>
        </motion.div>
    );
}
