<<<<<<< HEAD
import { Link } from "react-router-dom";
import SearchForm from "../RoomList_Compoents/SearchBar";
import { LuWallpaper } from "react-icons/lu";
import { MdDoneAll, MdPendingActions } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

function PaymentList() {
  const [data, setdata] = useState([]);
  const [ShowLoader, SetShowLoader] = useState(true);
  const [PendingPayments, SetPendingPayments] = useState(false);
  const [CompletedPayments, SetCompletedPayments] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lenient-gazelle-81.hasura.app/api/rest/All_Payments"
        );
        setdata(response.data);
        console.log(response.data.Project_KOT_All_Payments);
        SetShowLoader(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]);
  return (
    <div className="w-8/12 mx-auto">
      <h1 className="text-center font-semibold text-4xl font-serif  mb-20 mt-16 select-none">
        List Of All Payments
      </h1>
      <SearchForm />
      <div className="flex gap-x-8 justify-center mx-auto my-8 ">
        <button
          onClick={() => {
            SetCompletedPayments(false);
            SetPendingPayments(false);
          }}
          className="px-5 py-2.5 relative rounded group font-medium text-white"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative flex gap-x-3">
            <LuWallpaper className="my-auto" />
            All Payments
          </span>
        </button>
        <button
          onClick={() => {
            SetPendingPayments(!PendingPayments);
            SetCompletedPayments(false);
          }}
          className="px-5 py-2.5 relative rounded group font-medium text-white"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative flex gap-x-3">
            <MdPendingActions className="my-auto" />
            Pending Payments
          </span>
        </button>
        <button
          onClick={() => {
            SetCompletedPayments(!CompletedPayments);
            SetPendingPayments(false);
          }}
          className="px-5 py-2.5 relative rounded group text-white font-medium"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative flex gap-x-3">
            <MdDoneAll className="my-auto" />
            Completed Payments
          </span>
        </button>
      </div>

      {!ShowLoader ? (
        <div className="bg-white shadow-md rounded my-6">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3  border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Order Id
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Room Id
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Payment Mode
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.Project_KOT_All_Payments
                ? data.Project_KOT_All_Payments.map((item, index) => {
                    return (
                      <tr
                        key={item.EncodedRoomId}
                        className={`${
                          PendingPayments && item.PaymentStatus
                            ? "hidden"
                            : null
                        } ${
                          CompletedPayments && !item.PaymentStatus
                            ? "hidden"
                            : null
                        } `}
                      >
                        <td className="px-6 py-4 text-center  whitespace-no-wrap border-b border-gray-200 w-min">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-center border-b border-gray-200">
                          {item.OrderId}
                        </td>
                        <td className="px-6 py-4 text-center border-b border-gray-200">
                          {item.RoomId}
                        </td>
                        <td
                          className={`px-6 py-4 font-serif text-center border-b border-gray-200 ${
                            item.PaymentStatus
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.PaymentStatus ? "Completed" : "Pending"}
                        </td>
                        <td className="px-6 py-4 text-center border-b border-gray-200">
                          {item.PaymentMode}
                        </td>

                        <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                          <Link
                            onClick={() =>
                              confirm("Are You sure want to delete?")
                            }
                            className="underline underline-offset-4 text-red-700 font-sans font-semibold hover:opacity-75"
                            to=""
                          >
                            Delete Room
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto  flex flex-col gap-y-12 justify-center my-16">
          <h1 className="font-semibold text-xl text-center">
            List of Payment details Currently Loading, Please Wait
          </h1>
          <div className="mx-auto">
            <RingLoader color="blue" size={130} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentList;
=======
import { Link } from "react-router-dom";
import SearchForm from "../RoomList_Compoents/SearchBar";
import { LuWallpaper } from "react-icons/lu";
import { MdDoneAll, MdPendingActions } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

function PaymentList() {
  const [data, setdata] = useState([]);
  const [ShowLoader, SetShowLoader] = useState(true);
  const [PendingPayments, SetPendingPayments] = useState(false);
  const [CompletedPayments, SetCompletedPayments] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lenient-gazelle-81.hasura.app/api/rest/All_Payments"
        );
        setdata(response.data);
        console.log(response.data.Project_KOT_All_Payments);
        SetShowLoader(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]);
  return (
    <div className="w-8/12 mx-auto">
      <h1 className="text-center font-semibold text-4xl font-serif  mb-20 mt-16 select-none">
        List Of All Payments
      </h1>
      <SearchForm />
      <div className="flex gap-x-8 justify-center mx-auto my-8 ">
        <button
          onClick={() => {
            SetCompletedPayments(false);
            SetPendingPayments(false);
          }}
          className="px-5 py-2.5 relative rounded group font-medium text-white"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative flex gap-x-3">
            <LuWallpaper className="my-auto" />
            All Payments
          </span>
        </button>
        <button
          onClick={() => {
            SetPendingPayments(!PendingPayments);
            SetCompletedPayments(false);
          }}
          className="px-5 py-2.5 relative rounded group font-medium text-white"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative flex gap-x-3">
            <MdPendingActions className="my-auto" />
            Pending Payments
          </span>
        </button>
        <button
          onClick={() => {
            SetCompletedPayments(!CompletedPayments);
            SetPendingPayments(false);
          }}
          className="px-5 py-2.5 relative rounded group text-white font-medium"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative flex gap-x-3">
            <MdDoneAll className="my-auto" />
            Completed Payments
          </span>
        </button>
      </div>

      {!ShowLoader ? (
        <div className="bg-white shadow-md rounded my-6">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3  border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Order Id
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Room Id
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Payment Mode
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.Project_KOT_All_Payments
                ? data.Project_KOT_All_Payments.map((item, index) => {
                    return (
                      <tr
                        key={item.EncodedRoomId}
                        className={`${
                          PendingPayments && item.PaymentStatus
                            ? "hidden"
                            : null
                        } ${
                          CompletedPayments && !item.PaymentStatus
                            ? "hidden"
                            : null
                        } `}
                      >
                        <td className="px-6 py-4 text-center  whitespace-no-wrap border-b border-gray-200 w-min">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-center border-b border-gray-200">
                          {item.OrderId}
                        </td>
                        <td className="px-6 py-4 text-center border-b border-gray-200">
                          {item.RoomId}
                        </td>
                        <td
                          className={`px-6 py-4 font-serif text-center border-b border-gray-200 ${
                            item.PaymentStatus
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.PaymentStatus ? "Completed" : "Pending"}
                        </td>
                        <td className="px-6 py-4 text-center border-b border-gray-200">
                          {item.PaymentMode}
                        </td>

                        <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                          <Link
                            onClick={() =>
                              confirm("Are You sure want to delete?")
                            }
                            className="underline underline-offset-4 text-red-700 font-sans font-semibold hover:opacity-75"
                            to=""
                          >
                            Delete Room
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto  flex flex-col gap-y-12 justify-center my-16">
          <h1 className="font-semibold text-xl text-center">
            List of Payment details Currently Loading, Please Wait
          </h1>
          <div className="mx-auto">
            <RingLoader color="blue" size={130} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentList;
>>>>>>> 0678c09e2402189eb85e96763de66277dc7f5693
