import { Link } from "react-router-dom";
import { LuWallpaper } from "react-icons/lu";
import { MdDoneAll, MdPendingActions } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/Provider";
import { RingLoader } from "react-spinners";
import { data } from "autoprefixer";

function OrderList() {
  const { SetSelectedItem } = useContext(UserContext);
  const [ShowLoader, SetShowLoader] = useState(true);
  const [Data, SetData] = useState(null);
  const [ShowPendingOrders, SetShowPending] = useState(false);
  const [ShowCompletedOrders, SetShowCompletedOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRooms, SetFilteredRooms] = useState(null);
  const [ShowByDate, SetShowByDate] = useState("0");
  useEffect(() => {
    const Fetcher = async () => {
      const OrdersResponse = await axios.get(
        `${import.meta.env.VITE_BASEURL}/Orders/FetchAllOrders/`,
        {
          withCredentials: true,
        }
      );
      SetData(OrdersResponse.data);
      SetShowLoader(false);
      console.log(OrdersResponse.data);
    };
    console.log(Data);
    Fetcher();
  }, []);
  function ShowByDateHandler() {
    let FilterData = Data;
    if (ShowByDate === "0") {
      SetFilteredRooms(Data);
    } else if (ShowByDate === "1") {
      FilterData = filterOrdersByDateRange(Data, 1);
    } else if (ShowByDate === "7") {
      FilterData = filterOrdersByDateRange(Data, 7);
    } else if (ShowByDate === "14") {
      FilterData = filterOrdersByDateRange(Data, 14);
    } else if (ShowByDate === "21") {
      FilterData = filterOrdersByDateRange(Data, 21);
    } else if (ShowByDate === "30") {
      FilterData = filterOrdersByDateRange(Data, 30);
    } else if (ShowByDate === "90") {
      FilterData = filterOrdersByDateRange(Data, 90);
    }
    console.log(FilterData);
    SetFilteredRooms(FilterData);
  }
  useEffect(() => {
    setSearchQuery("");
    ShowByDateHandler();
    console.log(ShowByDate);
  }, [ShowByDate]);
  function filterOrdersByDateRange(orders, days) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - days);

    return orders.filter((order) => new Date(order.createdAt) >= targetDate);
  }
  useEffect(() => {
    if (searchQuery.length && Data) {
      SetShowByDate("0");
      const filteredRooms = Data.filter((item) =>
        item.RoomId?.toString().includes(searchQuery)
      );
      SetFilteredRooms(filteredRooms);
    } else {
      SetFilteredRooms(Data);
    }
  }, [searchQuery, Data]);

  return (
    <>
      {!ShowLoader ? (
        <div className="w-11/12 mx-auto">
          <h1 className="text-center font-semibold text-4xl font-serif mb-8 mt-16 select-none">
            Order and Bills
          </h1>
          <div className="flex gap-x-8 justify-center mx-auto mb-8">
            <button
              onClick={() => {
                SetShowPending(false);
                SetShowCompletedOrders(false);
              }}
              className={`px-5 py-2.5 hover:opacity-85 relative rounded group font-medium text-white ${
                !ShowPendingOrders && !ShowCompletedOrders
                  ? "bg-green-600"
                  : "bg-blue-600"
              }`}
            >
              <span className="relative flex gap-x-3">
                <LuWallpaper className="my-auto" />
                All Orders
              </span>
            </button>
            <button
              onClick={() => {
                SetShowPending(!ShowPendingOrders);
                SetShowCompletedOrders(false);
              }}
              className={`px-5 py-2.5 hover:opacity-85 relative rounded group font-medium text-white ${
                ShowPendingOrders ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              <span className="relative flex gap-x-3">
                <MdPendingActions className="my-auto" />
                Pending Orders
              </span>
            </button>
            <button
              onClick={() => {
                SetShowCompletedOrders(!ShowCompletedOrders);
                SetShowPending(false);
              }}
              className={`px-5 py-2.5 hover:opacity-85 relative rounded group font-medium text-white ${
                ShowCompletedOrders ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              <span className="relative flex gap-x-3">
                <MdDoneAll className="my-auto" />
                Completed Orders
              </span>
            </button>
          </div>
          <div className="relative mx-auto flex gap-x-2 justify-center text-gray-600">
            <select
              name=""
              id=""
              className="border-2 rounded-md px-4 transition-all"
              value={ShowByDate}
              onChange={(e) => SetShowByDate(e.target.value)}
            >
              <option value="0">Sort By Date</option>
              <option value="1">Past 1 Day</option>
              <option value="7">Past 1 Week</option>
              <option value="14">Past 2 Week</option>
              <option value="21">Past 3 Week</option>
              <option value="30">Past 1 Month</option>
              <option value="90">Past 3 Month</option>
            </select>
            <input
              className="border-2 border-gray-300 w-4/12 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search by Room No."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="bg-white shadow-md rounded my-6">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Room No.
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Total Bill
                  </th>{" "}
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Order Status
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {Data &&
                  filteredRooms?.map((item, index) => (
                    <tr
                      key={item?.OrderId}
                      className={`${
                        ShowPendingOrders && item?.isPaid ? "hidden" : ""
                      } ${ShowCompletedOrders && !item.isPaid ? "hidden" : ""}`}
                    >
                      <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200 w-min">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-center border-b border-gray-200">
                        {item?.RoomId}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                        {item?.TotalAmount}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                        {item?.OrderStatus ? "Completed" : "Pending"}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                        {item?.isPaid ? "Completed" : "Pending"}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                        <Link
                          className="underline underline-offset-4 text-red-700 font-sans font-semibold hover:opacity-75"
                          to={`/Orders/${item.OrderId}`}
                          onClick={() => SetSelectedItem(item.OrderId)}
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-col gap-y-12 justify-center my-10">
          <h1 className="font-semibold text-xl text-center">
            All The Orders are Currently Loading, Please Wait
          </h1>
          <div className="mx-auto">
            <RingLoader color="blue" size={130} />
          </div>
        </div>
      )}
    </>
  );
}

export default OrderList;
