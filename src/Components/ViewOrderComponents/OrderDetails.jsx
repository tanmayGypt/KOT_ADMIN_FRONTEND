import { useEffect, useState } from "react";
// import { UserContext } from "../../../context/Provider";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import convertToAmPm from "./SystemToAMPMConverter";
function OrderDetails({ ShowingOnAccordian, AccordianData }) {
  const [Data, SetData] = useState(null);
  const params = useParams();
  const id = params.id;
  //   const { SelectedItem } = useContext(UserContext);
  useEffect(() => {
    if (ShowingOnAccordian) {
      SetData(AccordianData);
      console.log(Data);
    }
  }, [Data]);
  const [Loader, ShowLoader] = useState(false);
  const [OrderStatus, SetOrderStatus] = useState(null);
  const [PaymentStatus, SetPaymentStatus] = useState(false);
  const [PaymentMode, SetPaymentMode] = useState(null);
  const [OrderTime, SetOrderTime] = useState("");
  const [OrderDate, SetOrderDate] = useState("");
  useEffect(() => {
    SetOrderTime(convertToAmPm(`${Data?.createdAt?.substr(11)}`));
    function convertDateFormat(dateStr) {
      console.log(dateStr);
      // console.log();
      // Split the input date string by the hyphen
      // const [year, month, day] = dateStr.split("-");

      // // Rearrange the date parts to the desired format
      // const formattedDate = `${day}-${month}-${year}`;

      return dateStr;
    }
    SetOrderDate(convertDateFormat(`${Data?.createdAt?.substr(0, 10)}`));
  }, [Data]);

  useEffect(() => {
    // console.log(PaymentMode, PaymentStatus, OrderStatus);
  }, [PaymentMode, PaymentStatus, OrderStatus]);
  useEffect(() => {
    const Fetcher = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/Orders/FetchOrderById/${id}`,
          {
            withCredentials: true,
          }
        );
        SetData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    Fetcher();
    console.log(Data + " Data");
  }, [id]);

  const UpdateHandler = async () => {
    if (!PaymentMode) {
      const confirmation = confirm(
        "Are You sure want to update order Status ?"
      );
      if (!confirmation) return;
      ShowLoader(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/Orders/UpdateOrder/${id}`,
        {
          Payment_Mode: null,
          OrderStatus: OrderStatus,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        toast.success(
          `Order Status Updated to ${OrderStatus ? "Success" : "Pending"} `
        );

        ShowLoader(false);
      }
      console.log(PaymentMode, PaymentStatus, OrderStatus);
      // alert("Order Status Updated Succesfully");
      // ShowLoader(false);
      return;
    }

    const connfirmation = confirm(
      "Are You sure want to update the order details ?"
    );
    if (!connfirmation) {
      return;
    }
    try {
      ShowLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/Orders/UpdateOrder/${id}`,
        {
          isPaid: PaymentStatus,
          Payment_Mode: PaymentMode,
          OrderStatus: OrderStatus,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 && PaymentStatus) {
        console.log(response.data, PaymentStatus, PaymentMode, OrderStatus);

        const PaymentResponse = await axios.post(
          `${import.meta.env.VITE_BASEURL}/All_Payments/AddAllPayment`,
          {
            OrderId: Data.OrderId,
            RoomId: Data.RoomId,
            PaymentStatus: PaymentStatus,
            PaymentMode: PaymentMode,
          },
          {
            withCredentials: true,
          }
        );
        console.log(PaymentResponse.data);
        alert("Order Updated Succesfully");
      }

      ShowLoader(false);
    } catch (e) {
      console.log(e);
      ShowLoader(false);
    }
  };

  return (
    <>
      {Loader ? (
        <div className="mx-auto flex flex-col gap-y-12 justify-center my-10">
          <div className="mx-auto">
            <PropagateLoader color="#36d7b7" />
          </div>
        </div>
      ) : null}
      <div>
        <Toaster />
      </div>
      <div>
        {!ShowingOnAccordian ? (
          <h1 className="mx-auto flex justify-center text-4xl font-serif mb-4 mt-16 select-none">
            <div className="flex gap-x-4">
              <h1 className="font-semibold">Room Number: </h1>
              <span>{Data?.RoomId ? Data.RoomId : null}</span>
            </div>
          </h1>
        ) : null}
        <div
          className={`max-w-lg mx-auto py-8 px-8 bg-white rounded-xl flex flex-col shadow-md animate-fade-in-down gap-y-2 ${
            Loader ? "opacity-50" : ""
          }`}
        >
          <h1 className="text-3xl font-normal text-center">Order Details</h1>

          <h1 className="flex justify-between font-bold">
            Room Number: <span className="font-normal">{Data?.RoomId}</span>
          </h1>
          <hr />
          <div className="flex flex-col gap-y-2">
            <h1 className="flex justify-between font-bold">
              Order Date: <span className="font-normal">{OrderDate}</span>
            </h1>
            <hr />
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="flex justify-between font-bold">
              Order Time: <span className="font-normal">{OrderTime}</span>
            </h1>
            <hr />
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="flex justify-between font-bold">
              Total Price:{" "}
              <span className="font-normal">Rs.{Data?.TotalAmount}</span>
            </h1>
            <hr />
          </div>

          {!ShowingOnAccordian ? (
            <>
              {" "}
              <div className="flex flex-col gap-y-2">
                <h1 className="flex justify-between font-bold items-center">
                  Order Status
                  <span>
                    <select
                      value={OrderStatus ? "2" : "1"}
                      className="border rounded-sm font-normal px-4 py-1 my-auto"
                      onChange={(e) => SetOrderStatus(e.target.value == "2")}
                    >
                      <option value="">Select an Option</option>
                      <option value="1">Pending</option>
                      <option value="2">Completed</option>
                    </select>
                  </span>
                </h1>
              </div>
              <div className="flex flex-col gap-y-2">
                <h1 className="flex justify-between font-bold items-center">
                  Payment Status
                  <span>
                    <select
                      value={PaymentStatus ? "2" : "1"}
                      className="border rounded-sm font-normal px-4 py-1 my-auto"
                      onChange={(e) => SetPaymentStatus(e.target.value == "2")}
                    >
                      <option value="">Select an Option</option>
                      <option value="1">Pending</option>
                      <option value="2">Completed</option>
                    </select>
                  </span>
                </h1>
              </div>
              <div className="flex flex-col gap-y-2">
                <h1 className="flex justify-between font-bold items-center">
                  Payment Mode
                  <span>
                    <select
                      value={PaymentMode || ""}
                      className="border rounded-sm font-normal px-4 py-1 my-auto"
                      onChange={(e) => SetPaymentMode(e.target.value)}
                    >
                      <option value="">Select Payment mode</option>
                      <option value="Online">Online</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </span>
                </h1>
              </div>
              <button
                onClick={UpdateHandler}
                className={`text-center my-4 justify-center w-auto px-8 py-3 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer ${
                  Loader ? "cursor-not-allowed" : ""
                }`}
                disabled={Loader}
              >
                Update
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
