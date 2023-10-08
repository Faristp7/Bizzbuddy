import { NavigationBar } from "./Index";
import "./user.css";

export default function CreatePost() {
    return (
        <div
            className="flex dark:bg-slate-950 duration-300"
            style={{ height: "2000px" }}
        >
            <div>
                <NavigationBar />
            </div>
            <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center mt-5">
                    <div className="px-2 sm:px-16">
                        <h1 className="font-bold text-4xl">Create Post</h1>
                        <div className="relative mt-10 mb-5">
                            <input
                                type="text"
                                id="floating_outlined"
                                className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="floating_outlined"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Title
                            </label>
                        </div>
                        <textarea id="message" rows={4} className="block mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept=".png"/>
                    </div>
                    <div className="">
                        <h1 className="font-bold text-4xl">Preview Post</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
