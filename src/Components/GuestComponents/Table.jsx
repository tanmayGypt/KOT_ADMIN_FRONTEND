import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import md5 from "md5";
import { RingLoader } from "react-spinners";
import { UserContext } from "../../../context/Provider";
function Table({ SetShowForm, SetShowOtherDetails }) {
  const { SetCustomers, SetSelectedItem } = useContext(UserContext);
  const [ShowLoader, SetShowLoader] = useState(true);
  const [Data, setdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRooms, SetFilteredRooms] = useState(null);

  useEffect(() => {
    if (searchQuery.length && Data) {
      let filteredRooms = Data.filter(
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
          `${import.meta.env.VITE_BASEURL}/Guests/FetchAllGuests`,
          {
            withCredentials: true,
          }
        );
        setdata(response.data);
        console.log(response.data);
        SetCustomers(Data.length);
        SetShowLoader(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search For Guests"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {!ShowLoader ? (
        <div className="bg-white shadow-md rounded my-6 w-full">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="px-6 py-3  border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Room Number
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3  border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Mobile Number
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Check In Date
                </th>

                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {(searchQuery.length ? filteredRooms : Data)?.map((item) => (
                <tr key={item.RoomId}>
                  <td className="px-6 py-4 text-center  whitespace-no-wrap border-b border-gray-200 w-min">
                    {item.RoomNumber}
                  </td>
                  <td className="px-6 py-4 text-center border-b border-gray-200">
                    {item.Customer_Name}
                  </td>
                  <td className="px-6 py-4 text-center border-b border-gray-200">
                    {item.MobileNumber}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200 text-lime-600 font-semibold font-serif">
                    {item.Checked_In_Date.substr(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                    <Link
                      onClick={() => {
                        SetShowOtherDetails(true);
                        SetSelectedItem(item.RoomId);
                      }}
                      className="underline underline-offset-4 text-red-700 font-sans font-semibold hover:opacity-75"
                      to={`/guests/${item.RoomId}`}
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto  flex flex-col gap-y-12 justify-center my-10">
          <h1 className="font-semibold text-xl text-center">
            List of all Guests are Currently Loading, Please Wait
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
