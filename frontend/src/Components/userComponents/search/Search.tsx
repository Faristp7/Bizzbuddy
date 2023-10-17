import { RefObject, useEffect, useRef, useState } from "react";
import { searchAccount, searchBusiness, searchTags } from "../../../Api/userApi";
import { NavigationBar, Profile } from "../Index";
import '../user.css'
import Tag from './Tag'
import Business from './Business'
import Account from './Account'

export default function Search() {
  const searchInputRef: RefObject<HTMLInputElement> = useRef(null)
  const [searchData, setSearchData] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [activeFilter, setActiveFilter] = useState<string>("Accounts")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredData, setFilteredData] = useState<any>([])
  const [userId, setUserId] = useState<string | null>("")

  useEffect(() => {
    if (searchData.length > 0)
      fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, searchData])

  const fetchData = async () => {
    setLoading(true)
    let APIdata
    let response
    switch (activeFilter) {
      case 'Accounts':
        response = await searchAccount(searchData)
        setLoading(false)
        break
      case 'Tags':
        response = await searchTags(searchData)
        setLoading(false)
        break
      case 'Business':
        response = await searchBusiness(searchData)
        setLoading(false)
        break
      default:
        break
    }
    // eslint-disable-next-line prefer-const
    APIdata = response?.data?.userInfo || []
    setFilteredData(APIdata)
  }

  useEffect(() => {
    if (searchInputRef.current)
      searchInputRef.current.focus()
  }, [])

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
  }
  if (userId) {
    return (
      <Profile userId={userId} />
    )
  }
  return (
    <div className="flex duration-300 min-h-screen dark:bg-slate-950">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-5 sm:ml-20 md:ml-60 flex-grow dark:text-white">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-grow sm:flex-shrink sm:w-96">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                ref={searchInputRef}
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                className="block w-full p-3 pl-10 text-sm truncate text-gray-900 border border-gray-300 rounded-lg focus:outline-none bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="Search Acounts, Tags, Businesses..."
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => handleFilterClick('Accounts')}
              className={`${activeFilter === 'Accounts' ? 'bg-blue-900 text-white' : 'bg-gray-600 text-white'
                } filterButton`}>Accounts
            </button>
            <button
              onClick={() => handleFilterClick('Tags')}
              className={`${activeFilter === 'Tags' ? 'bg-blue-900 text-white' : 'bg-gray-600 text-white'
                } filterButton`}>Tags
            </button>
            <button
              onClick={() => handleFilterClick('Business')}
              className={`${activeFilter === 'Business' ? 'bg-blue-900 text-white' : 'bg-gray-600 text-white'
                } filterButton`}>Business
            </button>
          </div>
        </div>
        <div>
          {
            activeFilter === 'Accounts' &&
            <Account datas={filteredData} pending={loading} setUserId={setUserId} />
          }
          {
            activeFilter === 'Tags' &&
            <Tag datas={filteredData} pending={loading} />
          }
          {
            activeFilter === 'Business' &&
            <Business datas={filteredData} pending={loading} setUserId={setUserId}/>
          }
        </div>
      </div>
    </div>
  );
}
