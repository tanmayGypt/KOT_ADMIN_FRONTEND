import CustomerTable from "./Table";
import { IoMdPerson } from "react-icons/io";

import { UserContext } from "../../../context/Provider";
import SearchForm from "./SearchBar";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import Form from "./Form";
import GuestOtherDetails from "./GuestOtherDetails";

function GuestList() {
  const [ShowForm, SetShowForm] = useState(false);
  const [ShowOtherDetails, SetShowOtherDetails] = useState(null);

  const { SetCustomers, SetSelectedItem } = useContext(UserContext);

  return (
    <div className="flex flex-col gap-y-4 mx-10 z-0">
      <div className="flex flex-col justify-center my-12 gap-y-8">
        <h1 className="text-4xl font-serif font-semibold text-center">
          LIST OF ALL GUESTS
        </h1>
        <div className="flex">
          <Link
            to=""
            onClick={() => SetSelectedItem(null)}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500 w-fit mx-auto gap-x-2"
          >
            <IoMdPerson />
            <span className="relative" onClick={() => SetShowForm(!ShowForm)}>
              {ShowForm ? "Show Guest List" : "Add New Guest"}
            </span>
          </Link>
          {ShowOtherDetails ? (
            <Link
              to=""
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500 w-fit mx-auto gap-x-2"
            >
              <IoMdPerson />
              <span
                className="relative"
                onClick={() => {
                  SetShowForm(false);
                  SetShowOtherDetails(false);
                }}
              >
                Show Guest List
              </span>
            </Link>
          ) : null}
        </div>
      </div>

      {ShowForm ? (
        <Form />
      ) : ShowOtherDetails ? (
        <GuestOtherDetails />
      ) : (
        <div className="flex flex-col gap-y-4 mx-auto w-full">
          <SearchForm />
          <CustomerTable
            SetShowForm={SetShowForm}
            SetShowOtherDetails={SetShowOtherDetails}
          />
        </div>
      )}
    </div>
  );
}

export default GuestList;
