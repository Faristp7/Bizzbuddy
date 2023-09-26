import { NavigationBar } from "../Index";
import bannerImage from '../../../assets/img/bannerImage.jpg'
import "../user.css"

export default function Profile() {
  const demoData = 'https://lh3.googleusercontent.com/a/ACg8ocKkAceSJBcHV9mDZaFyM2OvbhjQJXAdA3ZGzOba1g-pBQpo=s96-c'
  return (
    <div className="flex dark:bg-slate-950" style={{ height: '2000px' }}>
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-3 sm:ml-20 md:ml-60 flex-grow">
        <div>
          <div className="relative">
            <img src={bannerImage} className="rounded-sm h-40 sm:h-56 w-full" alt="banner" />
            <div className="absolute bottom-0  left-2/4 sm:left-28 transform -translate-x-1/2 translate-y-1/2">
              <img className="rounded-full h-28 sm:h-36 border-4 border-white dark:border-slate-950" src={demoData} alt="profile" />
            </div>
          </div>
          <div className="m-2 sm:ml-48 sm:mt-3 leading-none">
            <h1 className="font-bold text-2xl">Faris_tp_</h1>
            <h1 className="font-semibold text-lg text-gray-400">Builder</h1>
          </div>  
        </div>
      </div>
    </div>
  )
}
