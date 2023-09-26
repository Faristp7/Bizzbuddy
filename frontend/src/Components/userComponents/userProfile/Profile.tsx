import { NavigationBar } from "../Index";
import bannerImage from '../../../assets/img/bannerImage.jpg'

export default function Profile() {
  return (
    <div className="flex dark:bg-slate-950" style={{height:'2000px'}}>
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-3 mt-5 sm:ml-20 md:ml-60 flex-grow">
        <div className="">
          <div>
            <img src={bannerImage} className="rounded-md" alt="banner"  />
          </div>
        </div>
      </div>
    </div>
  )
}
