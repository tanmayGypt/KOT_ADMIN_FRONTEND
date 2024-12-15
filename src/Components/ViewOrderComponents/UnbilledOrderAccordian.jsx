import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";

const ShowUnbilledOrder = ({
  SetShowUnbilledOrder,
  Checked_Out_Date,
  RoomNumber,
  Customer_Name,
  Checked_In_Date,
  IdentityType,
  IdentityNumber_Hashed,
  MobileNumber,
  RoomId,
  GuestId,
  ParamRoomId,
}) => {
  let uuid = uuidv4();
  const [Proceed, SetProceed] = useState(false);
  const [TotalAmount, SetTotalAmount] = useState(0);

  const [Loader, ShowLoader] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [UnpaidOrders, SetUnpaidOrders] = useState([]);
  console.log(Checked_In_Date, Checked_Out_Date);
  useEffect(() => {
    const fetcher = async () => {
      ShowLoader(true);
      const MyOrders = await axios.get(
        `${import.meta.env.VITE_BASEURL}/Orders/FetchUnbilledOrder/${GuestId}`,
        {
          withCredentials: true,
        }
      );
      ShowLoader(false);
      console.log(MyOrders.data);
      SetUnpaidOrders(MyOrders.data);
      MyOrders.data.forEach((element) => {
        SetTotalAmount(TotalAmount + +element.TotalAmount);
      });
    };
    fetcher();

    console.log(Checked_In_Date, Checked_Out_Date);
  }, [Proceed, GuestId]);

  const UpdateHandler = async () => {
    if (UnpaidOrders.length > 0) {
      toast.error("Please clear all the bills before checkout");
      return;
    }
    console.log(GuestId, ParamRoomId, Checked_Out_Date);
    if (!Checked_Out_Date) {
      toast.error("Please provide the checkout date");
      return;
    }
    const confirmation = confirm(
      `Are you sure you want to update ${Customer_Name} details?`
    );
    if (!confirmation) return;

    if (UnpaidOrders.length > 0) {
      toast.error("Please pay all unbilled orders before checkout");
      return;
    }

    try {
      // Delete the guest by ID
      ShowLoader(true);
      const deleteResponse = await axios.get(
        `${import.meta.env.VITE_BASEURL}/Guests/DeleteGuestById/${ParamRoomId}`,
        {
          withCredentials: true,
        }
      );
      console.log("Delete API Called");

      if (deleteResponse.status !== 200) {
        throw new Error("Failed to delete guest");
      }
      toast.success("Guest data moved to room history transaction");

      // Update the room detail

      if (deleteResponse.status !== 200) {
        throw new Error("Failed to update room details");
      }
      toast.success(`Room ${RoomNumber} is now available for occupation`);

      // Add new occupation transaction
      const transactionResponse = await axios.post(
        `${
          import.meta.env.VITE_BASEURL
        }/Room_Occupation_Transaction/AddNewOccupation`,
        {
          OccupationId: uuid,
          RoomId,
          GuestId,
          Checked_In_Date,
          Checked_Out_Date,
          Customer_Name,
          IdentityType,
          IdentityNumber_Hashed,
          MobileNumber,
          RoomNumber,
        },
        {
          withCredentials: true,
        }
      );
      ShowLoader(false);
      console.log("Occupation created");

      if (transactionResponse.status !== 200) {
        throw new Error("Failed to add new occupation transaction");
      }
      let DeletedRoom = await axios.delete(
        `${import.meta.env.VITE_BASEURL}/DeleteRoomByEncoded/${ParamRoomId}`
      );
      if (DeletedRoom.status !== 200) {
        throw new Error("Failed to Update Room");
      }
      toast.success("Data updated successfully, please proceed further");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing the request");
    } finally {
      ShowLoader(false);
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 mx-auto" id="accordion-open" data-accordion="open">
      <div
        className={`${
          UnpaidOrders.length > 0
            ? "flex flex-col gap-y-4 mb-4"
            : "flex flex-col gap-y-20 mb-4"
        }`}
      >
        <h1 className="text-center font-bold text-2xl text-gray-800">
          List Of Unpaid Orders
        </h1>
        <p
          className={`text-center ${
            UnpaidOrders.length > 0 ? "text-red-600" : "text-green-800"
          }`}
        >
          {UnpaidOrders.length > 0
            ? "Below is the list of orders which is unpaid by the guest. Please make sure the guest pays all their remaining bills before checkout."
            : ShowLoader === true
            ? "Checking for unbilled orders, Please wait..."
            : "There are no unpaid bills. You can proceed."}
        </p>
        <p className="flex gap-x-2 mx-auto underline underline-offset-2">
          <p
            className={`${TotalAmount > 0 ? "text-red-500" : "text-green-500"}`}
          >
            Total Unpaid Amount :
          </p>{" "}
          {TotalAmount}
        </p>
      </div>

      <div
        className={`mx-auto flex flex-col gap-y-12 justify-center my-10 ${
          Loader ? "" : "hidden"
        }`}
      >
        <div className="mx-auto">
          <PropagateLoader color="#36d7b7" />
        </div>
      </div>
      <div
        className={`${
          Loader ? (
            "hidden"
          ) : (
            <div className="flex items-center justify-center min-h-screen bg-white">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-xl text-black">Loading...</p>
              </div>
            </div>
          )
        }`}
      >
        {UnpaidOrders?.map((order, index) => (
          <AccordionItem
            key={order.OrderId}
            index={index}
            activeIndex={activeIndex}
            toggleAccordion={toggleAccordion}
            title={`Order Id: ${order.OrderId}`}
            content={
              <OrderDetails AccordianData={order} ShowingOnAccordian={true} />
            }
            OrderLink={`/Orders/${order.OrderId}`}
          />
        ))}

        <div
          className={`${
            UnpaidOrders.length > 0 ? "my-8" : "my-24"
          } flex flex-col justify-center gap-y-4 `}
        >
          <button
            onClick={() => {
              SetShowUnbilledOrder(false);
              UpdateHandler();
              SetProceed(!Proceed);
            }}
            className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] mx-auto hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
          >
            Confirm Checkout
          </button>
          <p className="mx-auto text-red-500 my-12">
            {UnpaidOrders.length > 0
              ? "NOTE: Please pay all unpaid orders before checkout"
              : null}
          </p>
        </div>
      </div>
    </div>
  );
};

const AccordionItem = ({
  index,
  activeIndex,
  toggleAccordion,
  title,
  content,
  OrderLink,
}) => {
  const isOpen = index === activeIndex;

  return (
    <div className="border border-gray-200 my-8">
      <h2 id={`accordion-open-heading-${index}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium text-black border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 gap-3 ${
            isOpen ? "bg-gray-100" : "bg-white"
          }`}
          onClick={() => toggleAccordion(index)}
          aria-expanded={isOpen}
          aria-controls={`accordion-open-body-${index}`}
        >
          <span className="flex items-center font-bold">{title}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5L5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-open-body-${index}`}
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
        aria-labelledby={`accordion-open-heading-${index}`}
      >
        <div className="p-5 border-t border-gray-200">{content}</div>
        <div className="flex justify-center">
          <Link
            className="select-none rounded-lg mx-auto bg-red-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md shadow-black-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] active:shadow-none my-8"
            type="button"
            to={OrderLink}
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowUnbilledOrder;
