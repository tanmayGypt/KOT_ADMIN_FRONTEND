import CustomerTable from "./Table"
import { IoMdPerson } from "react-icons/io"
import SearchForm from "./SearchBar"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "../../../context/Provider"
import Form from "./Form"

function Add_or_Remove_Rooms() {
  const { ShowRoomAddForm, SetShowRoomAddForm, SetSelectedItem } =
    useContext(UserContext)

  return (
    <div className="flex flex-col mx-auto gap-y-4 w-11/12">
      <div className="flex flex-col justify-center mt-12 mb-8 gap-y-8">
        <h1 className="text-4xl font-serif font-semibold text-center">
          List Of Rooms
        </h1>
        <div></div>
        <Link
          href=""
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500 w-fit mx-auto gap-x-2"
        >
          <IoMdPerson />
          <span
            className="relative"
            onClick={() => {
              SetShowRoomAddForm(!ShowRoomAddForm)
              SetSelectedItem(null)
            }}
          >
            {ShowRoomAddForm ? "Show Room List" : "Add New Room"}
          </span>
        </Link>
      </div>

      {ShowRoomAddForm ? (
        <Form />
      ) : (
        <div className="flex flex-col gap-y-4 mx-auto w-full">
          <SearchForm />
          <CustomerTable SetShowForm={SetShowRoomAddForm} />
        </div>
      )}
    </div>
  )
}

export default Add_or_Remove_Rooms
