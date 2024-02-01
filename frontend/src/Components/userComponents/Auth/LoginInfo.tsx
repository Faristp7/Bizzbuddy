import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoginInfo() {
  const [info, setInfo] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setInfo(true);
    }, 3000);
  }, []);

  return (
    <>
      {info && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 1 }}
          className="bg-gray-300 w-48 p-2 rounded-lg border border-blue-200"
          onClick={() => setInfo(false)}
        >
          <div className="flex justify-end">
            <img
              className="cursor-pointer w-4 h-4"
              src="https://img.icons8.com/ios-glyphs/30/615b5a/delete-sign.png"
              alt="delete-sign"
            />
          </div>
          <p>Email: afsal@gmail.com</p>
          <p>Pass: 123as</p>
        </motion.div>
      )}
    </>
  );
}
