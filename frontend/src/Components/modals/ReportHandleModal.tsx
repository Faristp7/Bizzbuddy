/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
} from "react";
import { ReportModalProps } from "../../interface/interface";
import closebutton from "../../assets/icon/close.png";
import { blockPost } from "../../Api/userApi";

export default function ReportHandleModal({
  close,
  reports,
}: ReportModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const postId = reports[0]._id;
  const view = reports[0].view;

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      close();
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
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

  const blockPostHandler = async () => {
    const { data } = await blockPost({ postId });
    if (data.success) {
      close();
    }
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white dark:bg-slate-900 p-2 rounded-lg">
        <div className="max-w-md mx-auto mt-2">
          <div className="flex justify-between gap-10">
            <h1 className="font-extrabold text-4xl mb-3">Reports</h1>
            <img
              src={closebutton}
              alt="X"
              className="w-6 h-6 bg-gray-300 rounded-full mt-1.5 p-1 cursor-pointer"
              onClick={close}
            />
          </div>
          {reports[0].reports.map(
            (
              item: {
                message:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined;
              },
              index: Key | null | undefined
            ) => {
              return (
                <div key={index} className="mt-">
                  <h1 className="font-medium text-xl">- {item.message}</h1>
                </div>
              );
            }
          )}
          <div className="flex justify-center gap-3 mt-3">
            <button
              className={`text-lg ${
                !view ? "bg-red-500" : "bg-green-500"
              } rounded-md text-white py-0.5 px-2 active:bg-red-300 transition duration-300`}
              onClick={blockPostHandler}
            >
              {!view ? "Block" : "unblock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
