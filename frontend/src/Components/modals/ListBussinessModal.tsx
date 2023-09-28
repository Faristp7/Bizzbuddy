import { AnimatePresence, motion } from "framer-motion";
import { ListBusinessProps } from "../../interface/interface";
import { useRef, useEffect, useState } from "react";
import { RegisterBussiness } from '../../interface/interface'
import "../userComponents/user.css"
import '../userComponents/user.css'

export default function ListBusiness({ close }: ListBusinessProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<RegisterBussiness>({
    businessName: '',
    description: '',
    phone: '',
    email: '',
    location: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

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
        className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      >
        <div ref={modalRef} className="bg-white  dark:bg-slate-900 p-2 rounded-lg">
          <div className="max-w-md mx-auto mt-2">
            <form onSubmit={handleSubmit} className=" rounded px-4 pt-5 pb-2 mb-2 sm:w-96">
              <div className="mb-5">
                <input
                  type="text"
                  name="businessName"
                  id="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  value={formData.description}
                  rows={5}
                  cols={30}
                  onChange={handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">

                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">

                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">

                <input
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="Tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="bussinessForm dark:text-white focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={close}
                  className="bg-red-800 hover:bg-red-900 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline"
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
