import { AnimatePresence, motion } from "framer-motion";
import { ListBusinessProps } from "../../interface/interface";
import { useRef, useEffect, useState } from "react";
import { validationSchema } from "../../validations/validation"
import { Input, Tag, theme } from 'antd'
import { useFormik } from "formik";
import type { InputRef } from 'antd'
import { saveBussinessForm } from "../../Api/userApi";
import { PlusOutlined } from '@ant-design/icons'
import "../userComponents/user.css"

export default function ListBusiness({ close }: ListBusinessProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

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
      description: '',
      phone: '',
      email: '',
      location: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false })
        const { data } = await saveBussinessForm({ values, tags })
        console.log(data);
      } catch (error) {
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
        exit={{ opacity: 0 }}
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
              <div className="">
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  value={formik.values.description}
                  rows={5}
                  cols={30}
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
              <div className="flex items-center gap-2">
                <button
                  onClick={close}
                  className="bg-red-800 hover:bg-red-900 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-900 hover:bg-blue-950 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
