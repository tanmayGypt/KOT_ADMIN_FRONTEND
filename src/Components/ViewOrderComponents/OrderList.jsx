import { useContext, useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { UserContext } from "../../../context/Provider";
import { useParams } from "react-router-dom";
import axios from "axios";

function OrderList({ Data }) {
  //   const { SelectedItem } = useContext(UserContext);
  const params = useParams();
  const id = params.id;
  const [ListOfItems, setListOfItems] = useState([]);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        if (!id) return;
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/OrderItems/GetOrderItemsById/${id}`,
          {
            withCredentials: true,
          }
        );
        setListOfItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };

    fetchOrderList();
    console.log(ListOfItems);
    // console.log(Data);
  }, [id, Data]);

  return (
    <div className="w-8/12 mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Order Item
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Total Cost (In Rs.)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {ListOfItems?.map((item, index) => (
              <tr key={item?.id}>
                <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200 w-min">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-center border-b border-gray-200">
                  {item.Item_Name}
                </td>
                <td className="px-6 py-4 text-center border-b border-gray-200">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 text-center border-b border-gray-200">
                  {item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
