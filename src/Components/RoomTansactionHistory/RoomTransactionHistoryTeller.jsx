import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";

function RoomTransactionHistoryTeller() {
  const [data, setData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASEURL
          }/Room_Occupation_Transaction//FetchAllRoomOccupations`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setData(response.data);
        setFilteredRooms(response.data); // Initialize filteredRooms with fetched data
        setShowLoader(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery && data) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filteredRooms = data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredRooms(filteredRooms);
    } else {
      setFilteredRooms(data); // Reset to original data when searchQuery is empty
    }
  }, [searchQuery]);

  return (
    <div className="w-11/12 mx-auto">
      {!showLoader ? (
        <div className="bg-white shadow-md rounded mb-6 w-full">
          <div>
            <Toaster />
          </div>
          <h1 className="text-center font-semibold text-2xl mb-16 my-8">
            Room Transaction History
          </h1>
          <div className="relative mx-auto flex justify-center mb-8 text-gray-600">
            <input
              className="border-2 border-gray-300 w-4/12 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search by Name or Mobile"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="table-auto w-11/12 mx-auto divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Room Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Check In Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Check Out Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mobile Number
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRooms.map((item) => (
                <tr key={item.GuestId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Customer_Name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.RoomId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Checked_In_Date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Checked_Out_Date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.MobileNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto flex flex-col gap-y-12 justify-center my-10">
          <h1 className="font-semibold text-xl text-center">
            Room Transaction History is Currently Loading, Please Wait
          </h1>
          <div className="mx-auto">
            <RingLoader color="blue" size={130} />
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomTransactionHistoryTeller;
