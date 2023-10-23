import { ListBusinessProps } from "../../interface/interface";
import { useEffect, useRef, useState } from "react";
import closeButton from '../../assets/icon/close.png'
import { Tab } from "@headlessui/react";
import { getFollowData } from "../../Api/userApi";

export default function ViewFollow({ close, _id }: ListBusinessProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<number>(0);

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

        (async () => {
            const { data } = await getFollowData(_id)
            console.log(data);
        })()

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-gray-700 bg-opacity-50">
            <div ref={modalRef} className="bg-white dark:bg-slate-900 p-2 rounded-lg">
                <div className="flex justify-end mb-3">
                    <button onClick={close}>
                        <img src={closeButton} className="w-5 h-5 dark:invert" alt="X" />
                    </button>
                </div>
                <div>
                    <Tab.Group>
                        <Tab.List>
                            <Tab className={`flex-1 rounded-md py-1 px-2 m-1 duration-300 ${activeTab === 0 ? "bg-blue-900 text-white" : "bg-gray-300 dark:bg-gray-500"
                                }`}
                                onClick={() => setActiveTab(0)}>
                                Follwers
                            </Tab>
                            <Tab className={`flex-1 rounded-md py-1 px-2 m-1 duration-300 ${activeTab === 1 ? "bg-blue-900 text-white" : "bg-gray-300 dark:bg-gray-500"
                                }`}
                                onClick={() => setActiveTab(1)}>
                                Follwing
                            </Tab>
                        </Tab.List>
                        <Tab.Panel>
                            <h1>1</h1>
                        </Tab.Panel>
                        <Tab.Panel>
                            <h1>2</h1>
                        </Tab.Panel>
                    </Tab.Group>
                </div>
            </div>
        </div>
    )
}
