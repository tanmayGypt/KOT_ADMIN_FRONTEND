import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { UserContext } from "../../../context/Provider";

function PaymentDetails() {
  const [data, setdata] = useState([]);
  const { SetShowRoomAddForm } = useContext(UserContext);
  // const navigate = useNavigate();
  const [ShowLoader, SetShowLoader] = useState(true);

  const ViewOrderDetails = () => {
    SetShowRoomAddForm(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/All_Payments/FetchAllPayments`,
          {
            withCredentials: true,
          }
        );
        setdata(response.data);
        console.log(response.data);
        SetShowLoader(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      {!ShowLoader ? (
        <div className="bg-white shadow-md rounded mb-6 w-full">
          <div>
            <Toaster />
          </div>
          <h1 className="text-center font-semibold text-2xl mb-16 my-8">
            All Transactions
          </h1>
          <table className="table-auto w-full mx-auto divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Transection Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Room Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Mode
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data &&
                data.map((item) => (
                  <tr key={item.PaymentId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.PaymentId.substr(0, 10)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.createdAt.substr(0, 10)}-{" "}
                      {item.createdAt.substr(11, 15)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.RoomId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.Status ? "Completed" : "Pending"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.PaymentMode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/Orders/${item.OrderId}`}
                        onClick={() => ViewOrderDetails()}
                        className="text-red-700 font-semibold hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto flex flex-col gap-y-12 justify-center my-10">
          <h1 className="font-semibold text-xl text-center">
            List of all Tansactions are Currently Loading, Please Wait
          </h1>
          <div className="mx-auto">
            <RingLoader color="blue" size={130} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentDetails;
