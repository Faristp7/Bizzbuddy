import { NavigationBar } from "./Index";
import "./user.css"


export default function CreatePost() {

    return (
        <div className="flex dark:bg-slate-950 duration-300" style={{ height: '2000px' }}>
            <div>
                <NavigationBar />
            </div>
            <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center mt-5">
                    <div className="">
                        <h1 className="font-bold text-4xl">Create Post</h1>
                        <form action="">
                            
                        </form>
                    </div>
                    <div className="">
                        <h1 className="font-bold text-4xl">Preview Post</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}                                            