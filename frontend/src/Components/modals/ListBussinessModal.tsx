import { AnimatePresence, motion } from "framer-motion";
import { ListBusinessProps } from "../../interface/interface";
import { useRef, useEffect, useState } from "react";
import { validationSchema } from "../../validations/validation"
import { Input, Tag, theme } from 'antd'
import { useFormik } from "formik";
import { DotPulse } from '@uiball/loaders'
import { saveBussinessForm } from "../../Api/userApi";
import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import "../userComponents/user.css"
import axios from "axios";

export default function ListBusiness({ close }: ListBusinessProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
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
      businessName: '',
      bannerImage: null,
      description: '',
      phone: '',
      email: '',
      location: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
          const presetKey = "p2bwkmow";
          const cloudName = "dglfnmf0x";
        await validationSchema.validate(values, { abortEarly: false })
        const formData = new FormData()
        if (values.bannerImage) {
          formData.append('file', values.bannerImage)
          formData.append('upload_preset', presetKey)
          formData.append('cloud_name', cloudName)

          axios.post("https://api.cloudinary.com/v1_1/dglfnmf0x/image/upload", formData,)
            .then(async (res) => {
              const url = res.data.secure_url
              const { data } = await saveBussinessForm({ values, tags, url })
              if (data.success) {
                close()
              }
            })
        }
      } catch (error) {
        setLoading(false)
        console.error(error);
      }
    }
  })

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      close();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
        <div ref={modalRef} className="bg-white dark:bg-slate-900 p-2 rounded-lg">
          <div className="max-w-md mx-auto mt-2">
            <form onSubmit={formik.handleSubmit} className=" rounded px-4 pt-5 pb-2 mb-2 sm:w-96">
              <div className="">
                <input
                  type="text"
                  name="businessName"
                  id="businessName"
                  placeholder="Business Name"
                  value={formik.values.businessName}
                  onChange={formik.handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <p className="my-0.5 text-center text-red-700">{formik.errors.businessName} {"\u00a0"}</p>
              <div className="mb-0.5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload profile</label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  accept="image/jpeg , image/png"
                  // value={formik.values.bannerImage}
                  onChange={(e) => formik.setFieldValue('bannerImage', e.currentTarget.files?.[0])} />
              </div>
              <p className="mb-0.5 text-center text-red-700">{formik.errors.bannerImage} {"\u00a0"}</p>
              <div className="">
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  value={formik.values.description}
                  rows={4}
                  onChange={formik.handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline resize-none"
                  required
                />
              </div>
              <p className="my-0.5 text-center text-red-700">{formik.errors.description} {"\u00a0"}</p>
              <div className="">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <p className="my-0.5 text-center text-red-700">{formik.errors.phone} {"\u00a0"}</p>
              <div className="">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <p className="my-0.5 text-center text-red-700">{formik.errors.email} {"\u00a0"}</p>
              <div className="">
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <p className="my-0.5 text-center text-red-700">{formik.errors.location} {"\u00a0"}</p>
              <p className="mb-2">{tagChild}</p>
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
              <div className="flex items-center justify-end gap-2">
                <div>
                  <button
                    onClick={close}
                    className="bg-red-800 hover:bg-red-900 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline"
                  >
                    Close
                  </button>
                </div>
                {!loading ?
                  <button
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline"
                  >
                    List your business
                  </button>
                  :
                  <div className="px-3">
                    <DotPulse
                      size={40}
                      speed={1.3}
                      color="black"
                    />
                  </div>
                }
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
