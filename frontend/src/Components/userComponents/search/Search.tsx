import { RefObject, useEffect, useRef, useState } from "react";
import { NavigationBar } from "../Index";
import '../user.css'

export default function Search() {
  const searchInputRef: RefObject<HTMLInputElement> = useRef(null)
  const [activeFilter, setActiveFilter] = useState<string>("Accounts")

  useEffect(() => {
    if (searchInputRef.current)
      searchInputRef.current.focus()
  }, [])

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
  }
  return (
    <div className="flex duration-300 min-h-screen dark:bg-slate-950">
      <div>
        <NavigationBar />
      </div>
      <div className="mr-2 ml-2 mt-5 sm:ml-20 md:ml-60 flex-grow dark:text-white">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-grow sm:flex-shrink sm:w-96">
            <form>
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  ref={searchInputRef}
                  className="block w-full p-3 pl-10 text-sm truncate text-gray-900 border border-gray-300 rounded-lg focus:outline-none bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  placeholder="Search Acounts, Tags, Businesses..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-900 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-900 dark:hover:bg-blue-700 "
                >
                  Search
                </button>
              </div>
            </form>
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
      </div>
    </div>
  );
}
