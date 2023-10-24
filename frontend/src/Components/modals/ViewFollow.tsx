import { ListBusinessProps, Followers, Following } from "../../interface/interface";
import { useEffect, useRef, useState } from "react";
import closeButton from "../../assets/icon/close.png";
import { Tab } from "@headlessui/react";
import { getFollowersData, getFollowingData } from "../../Api/userApi";
import add from "../../assets/icon/add.png";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ViewFollow({ close, _id }: ListBusinessProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [followersData, setFollowerData] = useState<Following[]>([]);
    const [followingData, setFollowingData] = useState<Followers[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            close();
        }
    };
    // console.log(followData?.followerId?.username);

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

    const getFollwingdata = async () => {
        const { data } = await getFollowersData(_id, page);
        setFollowerData(data);
    }

    useEffect(() => {
        (async () => {
            const { data } = await getFollowingData(_id, page)
            setFollowingData(data)
            setLoading(false)
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-gray-700 bg-opacity-50">
            <div ref={modalRef} className="bg-white dark:bg-slate-900 p-3 rounded-lg mx-3 w-full sm:w-60">
                <div className="flex justify-end mb-3">
                    <button onClick={close}>
                        <img src={closeButton} className="w-5 h-5 dark:invert" alt="X" />
                    </button>
                </div>
                <div>
                    <Tab.Group>
                        <Tab.List className="flex">
                            <Tab
                                className={`flex-1 rounded-md py-1 px-2 m-1 duration-300 ${activeTab === 0
                                    ? "bg-blue-900 text-white"
                                    : "bg-gray-300 dark:bg-gray-500"
                                    }`}
                                onClick={() => setActiveTab(0)}
                            >
                                Followers
                            </Tab>
                            <Tab
                                className={`flex-1 rounded-md py-1 px-2 m-1 duration-300 ${activeTab === 1
                                    ? "bg-blue-900 text-white"
                                    : "bg-gray-300 dark:bg-gray-500"
                                    }`}
                                onClick={() => { setActiveTab(1); getFollwingdata(); }}
                            >
                                Following
                            </Tab>
                        </Tab.List>
                        <Tab.Panel>
                            <div className="mt-5 mb-4">
                                <div className="flex flex-col gap-5 items-start">
                                    {loading ? (
                                        Array.from({ length: 5 }).map((_, index) => (
                                            <div className="flex gap-2" key={index}>
                                                <Skeleton circle={true} width={30} height={30} />
                                                <Skeleton width={100} height={15} className="mt-2.5" />
                                            </div>
                                        ))
                                    ) : (
                                        followingData.map((item) => {
                                            return (
                                                <div className="flex gap-2 " key={item?.followerId?._id}>
                                                    <img src={item?.followerId?.profileImage} className="rounded-full w-7 h-7" alt="image" />
                                                    <h6 className="text-lg">{item?.followerId?.username}</h6>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                                <div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="flex justify-between mt-5 mb-4">
                                <div className="flex flex-col gap-5">
                                    {followersData.map((item) => {
                                        return (
                                            <div className="flex gap-2" key={item?.followingId?._id}>
                                                <img src={item?.followingId?.profileImage} className="rounded-full w-7 h-7" alt="image" />
                                                <h6 className="text-lg">{item?.followingId?.username}</h6>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Tab.Panel>
                        <div className="flex justify-center my-2">
                            <img
                                src={add}
                                className={`w-5 h-5 dark:invert rounded-full cursor-pointer border-2 border-black ${followersData.length < 5 ? "hidden" : "block"}`}
                                onClick={() => setPage(page + 1)}
                                alt="+"
                            />
                        </div>
                    </Tab.Group>
                </div>
            </div>
        </div>
    );
}
