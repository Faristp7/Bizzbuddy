import { ListBusinessProps } from '../../interface/interface';
import { AnimatePresence, motion } from 'framer-motion';
import { Tab } from '@headlessui/react'
import { useState } from 'react';
import '../userComponents/user.css'

export default function EditProfileModal({ close }: ListBusinessProps) {

    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
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
                className="bg-white p-3 rounded-lg"
            >
                <div className='flex justify-end'>
                    <button onClick={close}>X</button>
                </div>

                <AnimatePresence>
                    <Tab.Group>
                        <Tab.List className="flex p-4 space-x-4">
                            <Tab
                                className={`cursor-pointer px-4 py-2 bg-white border-b-2 border-transparent hover:border-blue-900 transition duration-300 ease-in-out ${activeTab === 0 ? "active bg-blue-900 text-white" : ""
                                    }`}
                                onClick={() => handleTabClick(0)}
                            >
                                User
                            </Tab>
                            <Tab
                                className={`cursor-pointer px-4 py-2 bg-white border-b-2 border-transparent hover:border-blue-500 transition duration-300 ease-in-out ${activeTab === 1 ? "active bg-blue-500 text-white" : ""
                                    }`}
                                onClick={() => handleTabClick(1)}
                            >
                                Business
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <motion.div
                                    className="p-4 shadow-md rounded-md"
                                    animate={{ opacity: [0, 1] }}
                                    initial={{ opacity: 0 }}>
                                    Content 1
                                </motion.div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <motion.div
                                    className="p-4 shadow-md rounded-md"
                                    animate={{ opacity: [0, 1] }}
                                    initial={{ opacity: 0 }}>
                                    Content 2
                                </motion.div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </AnimatePresence>

            </motion.div>
        </motion.div>
    );
}
