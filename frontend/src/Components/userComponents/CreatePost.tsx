import { NavigationBar } from "./Index";
import "./user.css"
import { useState } from 'react'

export default function CreatePost() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    // const [image, setImage] = useState<string | null>(null);
    const [tag, setTag] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Title:', title);
        console.log('Description:', description);
        // console.log('Image:', image);
        console.log('Tag:', tag);

        setTitle('')
        setDescription('');
        setTag('');
    };
    return (
        <div className="flex dark:bg-slate-950 duration-300" style={{ height: '2000px' }}>
            <div>
                <NavigationBar />
            </div>
            <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow dark:text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center mt-5">
                    <div className="">
                        <h1 className="font-bold text-4xl">Create Post</h1>
                        <form onSubmit={handleSubmit} className="mt-10">
                            <div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter your title"
                                    className="w-96 border-b border-gray-400 focus:outline-none text-xl"
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className=" w-96 border-black border px-3 rounded mt-4"
                                    placeholder="description"
                                    required
                                />
                            </div>
                            {/* <div>
                                <input
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className= "w-96 border-black border rounded"
                                    placeholder="upload a image"
                                    accept="image/*"
                                    aria-aria-label="Upload image"
                                />
                            </div> */}
                            <div>
                                <input
                                    type="text"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    className="w-96 border-black border rounded"
                                    placeholder="Add tag"
                                    required
                                />
                            </div>
                            <button type="submit" className="bg-blue-900 text-white rounded-md py-1 px-3">Post</button>
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