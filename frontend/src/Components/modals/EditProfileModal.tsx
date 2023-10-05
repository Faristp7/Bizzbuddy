import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { useEffect, useState, useRef } from "react";
import "../userComponents/user.css";
import closeButton from "../../assets/icon/close.png";
import { updateBusinessData, userProfileUpdate } from "../../Api/userApi";
import { editUserProfileValidationSchema, validationSchema } from '../../validations/validation'
import { useFormik } from 'formik'
import axios from "axios";
import { Ring } from '@uiball/loaders'
import { Input, Tag, theme } from 'antd'
import type { InputRef } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface editprofileModalProps {
    close: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData: any
}

const presetKey = "p2bwkmow";
const cloudName = "dglfnmf0x";

export default function EditProfileModal({ close, userData }: editprofileModalProps) {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false)
    const [inputVisible, setInputVisible] = useState(false);
    const { token } = theme.useToken();
    const inputRef = useRef<InputRef>(null);
    const [tags, setTags] = useState<string[]>(userData.bussinessId.tags);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const forMap = (tag: string) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    const tagChild = tags.map(forMap);

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };
    const formik = useFormik({
        initialValues: {
            username: userData.username,
            Profilephoto: null,
            email: userData.email,
            phone: userData.phone
        },
        validationSchema: editUserProfileValidationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                await editUserProfileValidationSchema.validate(values, { abortEarly: false })
                const formData = new FormData()
                if (values.Profilephoto) {
                    formData.append('file', values.Profilephoto)
                    formData.append('upload_preset', presetKey)
                    formData.append('cloud_name', cloudName)
                    axios.post("https://api.cloudinary.com/v1_1/dglfnmf0x/image/upload", formData,)
                        .then(async (res) => {
                            const url = res.data.secure_url
                            const { data } = await userProfileUpdate({ values, url })
                            if (data.success) {
                                close()
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                }
                else {
                    const { data } = await userProfileUpdate({ values })
                    if (data.success) {
                        close()
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    })

    const businessFormik = useFormik({
        initialValues: {
            businessName: userData?.bussinessId.bussinessName,
            bannerImage: null,
            description: userData?.bussinessId.Description,
            phone: userData?.bussinessId.phone,
            email: userData?.bussinessId.email,
            location: userData?.bussinessId.location,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const businessId = userData?.bussinessId?._id
                await validationSchema.validate(values, { abortEarly: false })
                const formData = new FormData()
                if (values.bannerImage) {
                    formData.append('file', values.bannerImage)
                    formData.append('upload_preset', presetKey)
                    formData.append('cloud_name', cloudName)
                    axios.post("https://api.cloudinary.com/v1_1/dglfnmf0x/image/upload", formData,)
                        .then(async (res) => {
                            const url = res.data.secure_url
                            const { data } = await updateBusinessData({ values, url, tags, businessId })
                            if (data.success) {
                                close()
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                }
                else {
                    const { data } = await updateBusinessData({ values, tags, businessId })
                    if (data.success) {
                        close()
                    }
                }
            } catch (error) {
                console.log(error);

            }
        }
    })

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            close();
        }
    };

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
                            className={`flex-1 rounded-md py-1 px-2 m-1 duration-300 ${activeTab === 0 ? "bg-blue-900 text-white" : "bg-gray-300 dark:bg-gray-500"
                                }`}
                            onClick={() => setActiveTab(0)}
                        >
                            user
                        </Tab>
                        <Tab
                            className={`flex-1 rounded-md py-1 px-2 m-1 duration-300 ${activeTab === 1 ? "bg-blue-900 text-white" : "bg-gray-300 dark:bg-gray-500"
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Profilephoto">
                                        {formik.errors.Profilephoto && typeof formik.errors.Profilephoto === 'string' ? (
                                            <span className="text-red-500">{formik.errors.Profilephoto}</span>) : 'Upload Profile'}
                                    </label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="Profilephoto" type="file" name="Profilephoto" accept="image/jpeg , image/png"
                                        onChange={(e) => formik.setFieldValue('Profilephoto', e.currentTarget.files?.[0])} />
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
                                    <button className="flex justify-center gap-3 bg-blue-900 rounded-lg flex-1 py-1 text-white " type="submit">
                                        Update
                                        {loading &&
                                            <Ring
                                                size={19}
                                                lineWeight={5}
                                                speed={2}
                                                color="white"
                                            />}
                                    </button>
                                </div>
                            </form>
                        </Tab.Panel>
                        {/* business */}
                        <Tab.Panel>
                            <form onSubmit={businessFormik.handleSubmit}>
                                <div className="relative z-0 w-full mb-2 group mt-3">
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={businessFormik.values.businessName}
                                        onChange={businessFormik.handleChange}
                                        id="businessName"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {businessFormik.errors.businessName && typeof businessFormik.errors.businessName === 'string' ? (
                                            <span className="text-red-500">{businessFormik.errors.businessName}</span>) : 'business name'}
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Profilephoto">
                                        {businessFormik.errors.bannerImage && typeof businessFormik.errors.bannerImage === 'string' ? (
                                            <span className="text-red-500">{businessFormik.errors.bannerImage}</span>) : 'Upload Profile'}
                                    </label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="bannerImage" type="file" name="bannerImage" accept="image/jpeg , image/png"
                                        onChange={(e) => businessFormik.setFieldValue('bannerImage', e.currentTarget.files?.[0])} />
                                </div>
                                <div className="relative z-0 w-full mb-3 group mt-3">
                                    <input
                                        type="text"
                                        name="description"
                                        value={businessFormik.values.description}
                                        onChange={businessFormik.handleChange}
                                        id="description"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="description"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {businessFormik.errors.description && typeof businessFormik.errors.description === 'string' ? (
                                            <span className="text-red-500">{businessFormik.errors.description}</span>) : 'description'}
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-4 group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={businessFormik.values.phone}
                                        onChange={businessFormik.handleChange}
                                        id="phone"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="phone"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {businessFormik.errors.phone && typeof businessFormik.errors.phone === 'string' ? (
                                            <span className="text-red-500">{businessFormik.errors.phone}</span>) : 'Phone number'}
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={businessFormik.values.email}
                                        onChange={businessFormik.handleChange}
                                        id="email"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {businessFormik.errors.email && typeof businessFormik.errors.email === 'string' ? (
                                            <span className="text-red-500">{businessFormik.errors.email}</span>) : 'Email address'}
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-4 group">
                                    <input
                                        type="text"
                                        name="location"
                                        value={businessFormik.values.location}
                                        onChange={businessFormik.handleChange}
                                        id="location"
                                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="location"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {businessFormik.errors.location && typeof businessFormik.errors.location === 'string' ? (
                                            <span className="text-red-500">{businessFormik.errors.location}</span>) : 'location'}
                                    </label>
                                </div>
                                <p className="mb-2 w-72">{tagChild}</p>
                                <div className="mb-3 dark:text-white">
                                    {inputVisible ? (
                                        <Input
                                            ref={inputRef}
                                            type="text"
                                            size="small"
                                            style={{ width: 78 }}
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onBlur={handleInputConfirm}
                                            onPressEnter={handleInputConfirm}
                                        />
                                    ) : (
                                        <Tag onClick={showInput} style={tagPlusStyle}>
                                            <PlusOutlined /> New Tag
                                        </Tag>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <button className="flex justify-center bg-blue-900 rounded-lg flex-1 py-1 text-white" type="submit">
                                        Update
                                        {loading &&
                                            <Ring
                                                size={19}
                                                lineWeight={5}
                                                speed={2}
                                                color="white"
                                            />}
                                    </button>
                                </div>
                            </form>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </motion.div>
        </motion.div>
    );
}
