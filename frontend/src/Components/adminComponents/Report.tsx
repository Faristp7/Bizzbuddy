import { useEffect, useState } from "react";
import { NavigationBar } from "../userComponents/Index";
import { reportMangment } from "../../Api/userApi";
import ReportHandleModal from "../modals/ReportHandleModal";
import { ReportState, } from "../../interface/interface";

export default function Report() {
  const [reports, setReports] = useState<ReportState[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalReport, setModalReports] = useState<ReportState[]>([])
  const [expandedDescriptions, setExpandedDescriptions] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await reportMangment()
      setReports(data.data)
    })()
  }, [isOpen])

  const toggleDescription = (itemId: string) => {
    if (expandedDescriptions.includes(itemId)) {
      setExpandedDescriptions(expandedDescriptions.filter(id => id !== itemId));
    } else {
      setExpandedDescriptions([...expandedDescriptions, itemId]);
    }
  };

  const handleModal = (id: string) => {
    const clickedPost = reports.filter((report) => id === report._id)
    setModalReports(clickedPost)
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <NavigationBar />
      <div className="ml-2 mt-5 sm:ml-24 md:ml-64 sm:my-8 mr-2 sm:mr-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
          {reports.map((item) => {
            const isDescriptionExpanded = expandedDescriptions.includes(item._id);
            return (
              <div key={item._id} className="bg-gray-50 p-2">
                <h1 className="text-center font-semibold text-2xl">{item.title}</h1>
                <p>{isDescriptionExpanded ? item.description : `${item.description.slice(0, 100)}...`}</p>
                {item.description.length > 100 && (
                  <button onClick={() => toggleDescription(item._id)} className="text-gray-500">
                    {isDescriptionExpanded ? 'See Less' : 'See More'}
                  </button>
                )}
                <img src={item.image} alt="image" className="w-full h-52 mt-3 cursor-pointer" onClick={() => handleModal(item._id)} />
                {item.view ? 
                  <button className="text-red-500 border rounded-lg px-1 border-red-500 mt-2 text-sm">Blocked</button>
                  : 
                  <button className="text-green-500 border rounded-lg px-1 border-green-500 mt-2 text-sm">Pending</button>
                }
              </div>
            );
          })}
        </div>
        {
          isOpen &&
          <ReportHandleModal close={() => setIsOpen(!isOpen)} reports={modalReport} />
        }
      </div>
    </div>
  )
}
