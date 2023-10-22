import { commentProps, commentState } from "../../interface/interface";
import { addComment, getComment } from "../../Api/userApi";
import { useFormik } from "formik";
import { addCommentValidation } from "../../validations/validation";
import sendButton from "../../assets/icon/sendButton.png";
import arrow from "../../assets/icon/arrow.png";
import { useEffect, useState } from "react";
import TimeAgo from "timeago-react";

export default function Comment({ viewComment, itemId }: commentProps) {
    const [comment, setComment] = useState<commentState[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)

    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        validationSchema: addCommentValidation,
        onSubmit: async (values) => {
            const message = values.comment;
            const { data } = await addComment({ message, itemId });
            if (data.success) {
                fetchComment();
                formik.values.comment = "";
            }
        },
    });

    const fetchComment = async () => {
        const { data } = await getComment(itemId, currentPage);
        setComment(data.comment);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        fetchComment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, itemId]);
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="relative">
                <div className="mb-2">
                    <input
                        type="text"
                        id="comment"
                        name="comment"
                        className=" w-[42%] px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Add comment"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.comment}
                    />
                    {formik.values.comment && formik.isValid ? (
                        <button type="submit" className="absolute">
                            <img
                                src={sendButton}
                                alt="Send"
                                className="w-5 h-5 dark:invert ml-1"
                            />
                        </button>
                    ) : null}
                </div>
            </form>
            {viewComment === itemId && (
                <div className="bg-gray-100 dark:bg-gray-800 mb-0.5 rounded-md">
                    {comment.map((item) => {
                        return (
                            <div key={item._id} className="p-2">
                                <div className="flex gap-2">
                                    <img
                                        className="w-6 h-6 rounded-full mt-1"
                                        src={item.userId.profileImage}
                                        alt="Profile"
                                    />
                                    <h6 className="font-semibold ">{item.userId.username}</h6>
                                    <p className="text-gray-700 dark:text-gray-400 mt-0.5 text-sm">
                                        <TimeAgo datetime={item.createdAt} />
                                    </p>
                                </div>
                                <div className="ml-9">
                                    <p className="">{item.message}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex justify-center gap-2 pb-1.5">
                        <img src={arrow}
                            className={`w-5 h-5 opacity-75 rounded-full border border-black dark:invert ${currentPage === 1 ? 'pointer-events-none' : ''}`} alt="-"
                            style={{transform : 'rotate(270deg'}}
                            onClick={handlePrevPage} />
                        <img src={arrow}
                            className="w-5 h-5 rotate-90 opacity-75 rounded-full border border-black dark:invert" alt="+"
                            onClick={() => setCurrentPage(currentPage + 1)} />
                    </div>
                </div>
            )}
        </div>
    );
}
