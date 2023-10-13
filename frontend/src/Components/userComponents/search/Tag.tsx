import { AccountProps } from "../../../interface/interface";
import { AnimatePresence, motion } from "framer-motion";

const Tag: React.FC<AccountProps> = ({ datas = [], pending }) => {
  return (
    <div className="mt-5 ml-2">
      <div>
        <AnimatePresence>
          {pending ? (
            ""
          ) : datas.length > 0 ? (
            datas.map((data, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-3">
                <img src={data?.userId?.profileImage} className="rounded-full my-3 w-9 h-9" alt="image" />
                <p className="font-medium text-xl mt-4 cursor-pointer">
                  {data.bussinessName}
                </p>
              </motion.div>
            ))
          ) : (
            <div
              key='no-match'
              className="flex justify-center min-h-screen items-center sm:items-start sm:justify-start"
            >No matching usernames found
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tag;
