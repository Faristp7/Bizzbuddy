import { AnimatePresence, motion } from "framer-motion";
import { ListBusinessProps } from "../../interface/interface";
import { useRef, useEffect } from "react";
// import { RegisterBussiness } from '../../interface/interface'
import { validationSchema } from "../../validations/validation"
import { useFormik } from "formik";
import "../userComponents/user.css"
import { saveBussinessForm } from "../../Api/userApi";

export default function ListBusiness({ close }: ListBusinessProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // const [formData, setFormData] = useState<RegisterBussiness>({
  //   businessName: '',
  //   description: '',
  //   phone: '',
  //   email: '',
  //   location: '',
  //   tags: '',
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const { name, value } = e.target as HTMLInputElement;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const formik = useFormik({
  //   initialValues : formData,
  //   validationSchema : validationSchema,
  //   onSubmit:(values) => {
  //     console.log(values);

  //   }
  // })
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  const formik = useFormik({
    initialValues: {
      businessName: '',
      description: '',
      phone: '',
      email: '',
      location: '',
      tags: '',
    },
    validationSchema : validationSchema, 
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false })
        const {data} = await saveBussinessForm(values)
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
              <div className="">
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="Tags"
                  value={formik.values.tags}
                  onChange={formik.handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
                <p className="my-0.5 text-center text-red-700">{formik.errors.tags} {"\u00a0"}</p>
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
