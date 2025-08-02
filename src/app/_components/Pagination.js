
const Pagination=()=>{
    return(<div className="flex justify-between items-center mt-6 px-1">
            {/* Pagination Buttons */}
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100">
                ‹
              </button>

              {/* Page Numbers */}
              {[1, 2, 3, 4, 5, 6, '...', 20].map((page, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center text-sm rounded-md ${page === 1
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100">
                ›
              </button>
            </div>

            {/* Dropdown */}
            <div className="relative">
              <select className="border border-gray-300 text-gray-600 text-sm rounded-md px-3 py-2 focus:outline-none appearance-none pr-8">
                <option>5 / page</option>
                <option>10 / page</option>
                <option>20 / page</option>
                <option>50 / page</option>
              </select>
              {/* Dropdown icon */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
                ▼
              </div>
            </div>
          </div>)
}

export default Pagination;