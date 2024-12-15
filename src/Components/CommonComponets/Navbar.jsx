import React, { useContext } from "react";
import { MdOutlineMonitor } from "react-icons/md";
import { IoPeopleSharp, IoReceiptOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { TbTransactionRupee } from "react-icons/tb";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { UserContext } from "../../../context/Provider";

function LogoutButton() {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("jwt");
    navigate("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="bg-blue-600 text-center py-3 transition-all transform hover:ease-linear hover:bg-red-500 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline w-full font-serif"
    >
      Logout
    </button>
  );
}

function Navbar() {
  const { SetShowRoomAddForm } = useContext(UserContext);
  const location = useLocation();
  let path = location.pathname;

  return (
    <nav className="bg-white fixed dark:bg-gray-900 border-gray-200 dark:border-gray-600 w-3/12">
      <div className="flex mx-auto p-4 flex-col justify-between h-screen">
        <div className="mx-auto mt-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="text-2xl font-semibold dark:text-white">
              Hotel Service App
            </span>
          </Link>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <LogoutButton />
        </div>
        <ul className="flex flex-col mx-auto">
          <li className="w-full flex justify-start font-bold py-4 text-2xl max-xl:text-xl hover:transition-all hover:scale-95">
            <Link
              onClick={() => {
                SetShowRoomAddForm(false);
              }}
              to="/Inventory"
              className={`flex gap-x-4 justify-center hover:text-green-500 py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 ${
                path.includes("/Inventory") ? "text-blue-500" : "text-white"
              }`}
              aria-current="page"
            >
              <MdOutlineMonitor className="my-auto" /> Inventory Update
            </Link>
          </li>
          <li className="w-full flex justify-start font-bold max-xl:text-xl py-4 text-2xl hover:transition-all hover:scale-95">
            <Link
              to="/rooms"
              onClick={() => {
                SetShowRoomAddForm(false);
              }}
              className={`flex gap-x-4 justify-center hover:text-green-500 py-2 px-3 rounded md:bg-transparent md:p-0 ${
                path.includes("/rooms") ? "text-blue-500" : "text-white"
              }`}
            >
              <IoPeopleSharp className="my-auto" /> Rooms List
            </Link>
          </li>
          <li className="w-full flex justify-start font-bold text-center max-xl:text-xl py-4 text-2xl hover:transition-all hover:scale-95">
            <Link
              to="/guests"
              onClick={() => {
                SetShowRoomAddForm(false);
              }}
              className={`flex gap-x-4 justify-center hover:text-green-500 py-2 px-3 rounded md:bg-transparent md:p-0 ${
                path.includes("/guests") ? "text-blue-500" : "text-white"
              }`}
            >
              <IoPeopleSharp className="my-auto" /> Guest List
            </Link>
          </li>
          <li className="w-full flex justify-start font-bold text-center py-4 max-xl:text-xl text-2xl hover:transition-all hover:scale-95">
            <Link
              to="/Orders"
              onClick={() => {
                SetShowRoomAddForm(false);
              }}
              className={`flex gap-x-4 justify-center hover:text-green-500 py-2 px-3 rounded md:bg-transparent md:p-0 ${
                path.includes("/Orders") ? "text-blue-500" : "text-white"
              }`}
            >
              <CiViewList className="my-auto" /> Order and Bills
            </Link>
          </li>
          <li className="w-full flex justify-start font-bold text-center py-4 max-xl:text-xl text-2xl hover:transition-all hover:scale-95">
            <Link
              to="/Room_Occupation_Transaction"
              onClick={() => {
                SetShowRoomAddForm(false);
              }}
              className={`flex gap-x-4 justify-center hover:text-green-500 py-2 px-3 rounded md:bg-transparent md:p-0 ${
                path.includes("/Room_Occupation_Transaction")
                  ? "text-blue-500"
                  : "text-white"
              }`}
            >
              <IoReceiptOutline className="my-auto" /> Room History
            </Link>
          </li>
          <li className="w-full flex justify-start font-bold text-center py-4 max-xl:text-xl text-2xl hover:transition-all hover:scale-95">
            <Link
              to="/transactions"
              className={`flex gap-x-4 justify-center hover:text-green-500 py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 ${
                path.includes("/transactions") ? "text-blue-500" : "text-white"
              }`}
            >
              <TbTransactionRupee className="my-auto" /> Transactions
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Toaster />
      </div>
    </nav>
  );
}

export default Navbar;
