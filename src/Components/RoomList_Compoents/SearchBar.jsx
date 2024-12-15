function SearchForm() {
  return (
    <form className="flex justify-center hidden">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium  sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative bg-white w-5/12 rounded-md border">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-black"
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
          className="block w-full p-4 ps-10 text-md text-black border rounded-lg"
          placeholder="Search by Customer, Rooms, Orders"
          required
        />
        <button
          type="submit"
          className=" absolute end-2.5 bottom-2.5  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-black bg-green-600 hover:opacity-75"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchForm
