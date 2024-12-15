import { useContext, useEffect, useState } from "react";
import { IoList, IoPerson } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { BsInboxes, BsPerson } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineNoteAdd } from "react-icons/md";
import { FaReplyAll } from "react-icons/fa";
import { UserContext } from "../../../context/Provider";
import { Link } from "react-router-dom";
import SearchForm from "../RoomList_Compoents/SearchBar";
import ListItems from "./ListItems";
import ProductAddForm from "./ProductAddForm";
import axios from "axios";
import { GiBowlOfRice } from "react-icons/gi";
import { getToken } from "firebase/messaging";
import { messaging } from "../../firebase/firebaseConfig";
function Dashboard() {
  const [ShowAll, SetShowAll] = useState(true);

  const [BoolAvailableItems, SetBoolAvailableItems] = useState(false);
  const [BoolVegItems, SetBoolVegItems] = useState(false);
  const {
    TotalProducts,
    VegItems,
    AvailableItems,
    Items,
    SetItems,
    SetSelectedItem,
    SetAvailableItems,
  } = useContext(UserContext);
  function ShowAllProducts() {
    SetBoolAvailableItems(false);
    SetBoolVegItems(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/Guests/FetchAllGuests`,
          {
            withCredentials: true,
          }
        );

        SetCustomers(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const { Customers, SetCustomers, ShowRoomAddForm, SetShowRoomAddForm } =
    useContext(UserContext);

  return (
    <div className=" mx-auto flex flex-col w-11/12 gap-y-4">
      {!ShowRoomAddForm ? (
        <>
          <h1 className="text-center font-semibold text-4xl font-serif   mt-16 select-none">
            Inventory Items
          </h1>
          <Link
            onClick={() => {
              SetShowRoomAddForm(true);
              SetSelectedItem(null);
            }}
            className="select-none flex gap-x-1 hover:scale-95 transition-all duration-300 px-5 py-3 w-fit mx-auto text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
          >
            <MdOutlineNoteAdd className="my-auto" />
            Add New Item
          </Link>
          <div className="my-4">
            {" "}
            <SearchForm />
          </div>
          <div className="flex mx-auto w-full justify-evenly">
            <button
              onClick={ShowAllProducts}
              href="#_"
              className={`hover:scale-95 py-8 px-4 flex gap-x-2 justify-center transition-all duration-300  max-lg:w-56 max-lg:h-28  text-lg  text-center text-wrap font-semibold text-white  border border-transparent   rounded-md    hover:text-white ${
                !BoolAvailableItems && !BoolVegItems
                  ? "bg-green-600"
                  : "bg-blue-600"
              }`}
            >
              <BsInboxes className="my-auto" /> Total Products: {TotalProducts}
            </button>{" "}
            <button
              onClick={() => SetBoolVegItems(!BoolVegItems)}
              className={`select-none hover:scale-95 py-8 px-4 flex gap-x-2 justify-center transition-all duration-300  max-lg:w-56 max-lg:h-28  text-lg  text-center text-wrap font-semibold text-white  border border-transparent   rounded-md    hover:text-white ${
                BoolVegItems ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              <GiBowlOfRice className="my-auto" /> Vegetarian Items: {VegItems}
            </button>{" "}
            <Link
              to="/guests"
              className="flex gap-x-2 bg-blue-600 py-8 px-4 justify-center hover:scale-95 transition-all duration-300     text-lg font-bold text-center   text-white    border border-transparent  rounded-md  hover:bg-blue-700  hover:text-white  "
            >
              <BsPerson className="my-auto" /> Customers: {Customers}
            </Link>{" "}
            <button
              className={`hover:scale-95 py-8 px-4 flex gap-x-2 justify-center transition-all duration-300  max-lg:w-56 max-lg:h-28  text-lg  text-center text-wrap font-semibold text-white  border border-transparent   rounded-md    hover:text-white ${
                BoolAvailableItems ? "bg-green-600" : "bg-blue-600"
              }`}
              onClick={() => SetBoolAvailableItems(!BoolAvailableItems)}
            >
              <MdEventAvailable className="my-auto" /> Available Items:-{" "}
              {AvailableItems}
            </button>
          </div>

          <ListItems
            BoolAvailableItems={BoolAvailableItems}
            BoolVegItems={BoolVegItems}
          />
        </>
      ) : (
        <div className="flex flex-col justify-center my-8 gap-y-8">
          <h1 className="text-center font-semibold text-4xl font-serif   mt-16 select-none">
            Inventory Items
          </h1>
          <Link
            onClick={() => SetShowRoomAddForm(false)}
            className="flex gap-x-2 justify-center px-5 py-3 w-fit mx-auto text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
          >
            <FaReplyAll className="my-auto" /> Show All Inventories
          </Link>
          <ProductAddForm />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
