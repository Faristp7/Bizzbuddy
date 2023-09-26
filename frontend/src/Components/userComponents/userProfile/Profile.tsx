import { NavigationBar } from "../Index";
import bannerImage from '../../../assets/img/bannerImage.jpg'

export default function Profile() {
  const demoData = 'https://lh3.googleusercontent.com/a/ACg8ocKkAceSJBcHV9mDZaFyM2OvbhjQJXAdA3ZGzOba1g-pBQpo=s96-c'
  return (
    <div className="flex dark:bg-slate-950" style={{ height: '2000px' }}>
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-3 mt-5 sm:ml-20 md:ml-60 flex-grow">
        <div className="relative">
          <img src={bannerImage} className="rounded-sm h-40 sm:h-56 w-full" alt="banner" />
          <div className="absolute bottom-0  left-2/4 sm:left-32 transform -translate-x-1/2 translate-y-1/2">
            <img className="rounded-full h-28 sm:h-32 border-4 border-white dark:border-slate-950" src={demoData} alt="profile" />
          </div>
        </div>
      </div>
    </div>
  )
}
