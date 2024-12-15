import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { UserContext } from "../../../context/Provider";
function Table({ SetShowForm }) {
  const [OccupiedRooms, SetOccupiedRooms] = useState(false);
  const [AvailableRooms, SetAvailableRooms] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { SetSelectedItem, SetShowRoomAddForm } = useContext(UserContext);
  const [data, setdata] = useState([]);
  const [ShowLoader, SetShowLoader] = useState(true);
  const [filteredRooms, SetFilteredRooms] = useState(null);
  useEffect(() => {
    if (searchQuery.length && data) {
      let filteredRooms = data.filter(
        (item) =>
          item.RoomNumber.toString().includes(searchQuery) ||
          item.Customer_Name?.toLowerCase().includes(searchQuery) ||
          item.MobileNumber?.toString()?.includes(searchQuery)
      );
      SetFilteredRooms(filteredRooms);
      console.log(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/Rooms/FetchAllRooms`,
          {
            withCredentials: true,
          }
        );
        sortRoomsByNumber(response.data);
        setdata(response.data);
        console.log(response.data);
        SetShowLoader(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  function sortRoomsByNumber(roomArray) {
    return roomArray.sort((a, b) => a.RoomNumber - b.RoomNumber);
  }
  return (
    <>
      {!ShowLoader ? (
        <div className="bg-white shadow-md rounded mb-6 w-full">
          <div>
            <Toaster />
          </div>

          <div className="flex justify-between w-8/12 mx-auto mb-4">
            {" "}
            <button
              className={`px-10 py-6 font-medium text-white transition duration-300  rounded-md hover:opacity-75  ease ${
                OccupiedRooms && AvailableRooms ? "bg-green-500" : "bg-blue-500"
              }`}
              onClick={() => {
                SetOccupiedRooms(true);
                SetAvailableRooms(true);
              }}
            >
              All Rooms
            </button>
            <button
              className={`px-10 py-6 font-medium text-white transition duration-300  rounded-md hover:opacity-75  ease ${
                !AvailableRooms && OccupiedRooms
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              onClick={() => {
                SetAvailableRooms(false);
                SetOccupiedRooms(true);
              }}
            >
              Available Rooms
            </button>
            <button
              className={`px-10 py-6 font-medium text-white transition duration-300  rounded-md hover:opacity-75  ease ${
                AvailableRooms && !OccupiedRooms
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              onClick={() => {
                SetOccupiedRooms(false);
                SetAvailableRooms(true);
              }}
            >
              Occupied Rooms
            </button>
          </div>
          <div className="pt-2 relative text-gray-600 mx-auto my-8 flex justify-center">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search For Rooms"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>

                <th className="px-6 py-3  border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Room Number
                </th>
                <th className="px-6 py-3  border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Guest Mobile
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Occupied ?
                </th>

                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {(searchQuery.length ? filteredRooms : data)?.map(
                (item, index) => (
                  <tr
                    key={item.EncodedRoomNo}
                    className={`${
                      AvailableRooms && !OccupiedRooms && !item.isOccupied
                        ? "hidden"
                        : ""
                    } ${
                      OccupiedRooms && !AvailableRooms && item.isOccupied
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-center  whitespace-no-wrap border-b border-gray-200 w-min">
                      {item.Customer_Name}
                    </td>
                    <td className="px-6 py-4 text-center border-b border-gray-200">
                      {item.RoomNumber}
                    </td>
                    <td className="px-6 py-4 text-center border-b border-gray-200">
                      {item.MobileNumber}
                    </td>
                    <td
                      className={`px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200  font-semibold font-serif ${
                        item.isOccupied ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.isOccupied == true ? "Yes" : "No"}
                    </td>

                    <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                      <Link
                        onClick={() => {
                          SetSelectedItem(item.RoomId);
                          SetShowRoomAddForm(true);
                        }}
                        className="underline underline-offset-4 text-red-700 font-sans font-semibold hover:opacity-75"
                        to=""
                      >
                        Manage Rooms
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto  flex flex-col gap-y-12 justify-center my-10">
          <h1 className="font-semibold text-xl text-center">
            List of all Rooms are Currently Loading, Please Wait
          </h1>
          <div className="mx-auto">
            <RingLoader color="blue" size={130} />
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
