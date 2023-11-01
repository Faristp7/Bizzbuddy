import { useEffect, useRef, useState } from "react";
import { ListBusinessProps } from "../../interface/interface";
import { reportPost } from "../../Api/userApi";

export default function ReportModal({ close, _id }: ListBusinessProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [reportMsg, setReportMsg] = useState<string>('')

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

    const submitReport = async () => {
        const {data} = await reportPost({reportMsg , _id})
        if(data) close()
    }   
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white dark:bg-slate-900 p-2 rounded-lg">
                <div className="max-w-md mx-auto mt-2">
                    <div className="relative">
                        <textarea
                            name="reason"
                            id="reason"
                            cols={30}
                            rows={10}
                            value={reportMsg}
                            onChange={(e) => setReportMsg(e.target.value)}
                            placeholder="Reason for report"
                            className="resize-none outline-none border dark:border-0 p-3 dark:bg-slate-900 w-full rounded-md"
                        />
                        <button className="bg-blue-950 hover:bg-blue-900 text-white py-1.5 px-4 rounded-lg absolute bottom-3 right-2"
                        onClick={submitReport}>
                            Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
