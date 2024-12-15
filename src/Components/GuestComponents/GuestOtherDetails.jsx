import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { PropagateLoader } from "react-spinners";
import UnbilledOrderAccordian from "../ViewOrderComponents/UnbilledOrderAccordian";
function GuestOtherDetails() {
  const [Loader, ShowLoader] = useState(false);

  let uuid = uuidv4();
  const [GuestId, SetGuestId] = useState(null);
  const [RoomNumber, SetRoomNumber] = useState(0);
  const [Customer_Name, SetCustomer_Name] = useState("");
  const [Checked_In_Date, SetChecked_In_Date] = useState(null);
  const [Checked_Out_Date, SetChecked_Out_Date] = useState(null);
  const [IdentityType, SetIdentityType] = useState(null);
  const [IdentityNumber_Hashed, SetIdentityNumber_Hashed] = useState(null);
  const [MobileNumber, SetMobileNumber] = useState(0);
  const [RoomId, SetRoomId] = useState(null);
  const [ShowUnbilledOrder, SetShowUnbilledOrder] = useState(false);
  const param = useParams();
  const ParamRoomId = param.GuestId;
  function ProceedHandler() {
    if (!Checked_Out_Date) {
      toast.error("Please provide the checkout date");
      return;
    }
    SetShowUnbilledOrder(true);
  }
  useEffect(() => {
    const DataFetcher = async () => {
      try {
        ShowLoader(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASEURL
          }/Guests/FetchGuestById/${ParamRoomId}`,
          {
            withCredentials: true,
          }
        );
        ShowLoader(false);

        const data = response.data;
        console.log(data);
        console.log(ParamRoomId);

        SetRoomId(response.data.RoomId);
        SetRoomNumber(response.data.RoomNumber);
        SetCustomer_Name(response.data.Customer_Name);
        SetChecked_In_Date(response.data.Checked_In_Date);
        SetGuestId(response.data.GuestId);
        SetIdentityType(response.data.IdentityType);
        SetIdentityNumber_Hashed(response.data.IdentityNumber_Hashed);
        SetMobileNumber(response.data.MobileNumber);
        toast.success(`Guest ${Customer_Name} Fetched Succesfully`);
      } catch (error) {
        console.error(error);
        ShowLoader(false);
        toast.error("Failed to fetch guest details");
      }
    };
    DataFetcher();
  }, []);

  return (
    <>
      <div className="w-11/12 mx-auto">
        <div>
          <Toaster />
        </div>
        {Loader && !ShowUnbilledOrder && (
          <div className="mx-auto flex flex-col gap-y-12 justify-center my-10">
            <div className="mx-auto">
              <PropagateLoader color="#36d7b7" />
            </div>
          </div>
        )}
        <div
          className={`max-w-xl mx-auto py-8 px-8 bg-white rounded-xl flex flex-col shadow-md animate-fade-in-down gap-y-2 ${
            Loader ? "opacity-50" : ""
          } ${ShowUnbilledOrder ? "hidden" : null}`}
        >
          <h1 className="text-3xl font-normal text-center">Customer Details</h1>
          <h1 className="flex justify-between font-bold my-3">
            Room Number:{" "}
            <input
              className="font-normal text-end"
              type="text"
              value={RoomNumber}
              disabled
            />
          </h1>
          <hr />
          <div className="flex flex-col gap-y-2">
            <h1 className="flex justify-between font-bold">
              Customer Name:{" "}
              <input
                className="font-normal text-end"
                type="text"
                value={Customer_Name}
                disabled
              />
            </h1>
            <hr />
            <h1 className="flex justify-between font-bold">
              Check In Date:{" "}
              <input
                className="font-normal text-end"
                type="text"
                value={Checked_In_Date?.substr(0, 10)}
                disabled
              />
            </h1>
            <hr />
            <h1 className="flex justify-between font-bold">
              Check Out Date:{" "}
              <input
                className="font-normal text-end"
                type="date"
                value={Checked_Out_Date || ""}
                onChange={(e) => {
                  SetChecked_Out_Date(e.target.value);
                  console.log(Checked_Out_Date);
                }}
              />
            </h1>
            <hr />
            <h1 className="flex justify-between font-bold">
              Identity Type:{" "}
              <input
                className="font-normal text-end"
                type="text"
                value={IdentityType}
                disabled
              />
            </h1>
            <hr />
            <h1 className="flex justify-between font-bold">
              Identity Number:{" "}
              <input
                className="font-normal text-end"
                type="text"
                value={IdentityNumber_Hashed}
                disabled
              />
            </h1>
            <h1 className="flex justify-between font-bold">
              Phone Number:{" "}
              <input
                className="font-normal text-end"
                type="text"
                value={MobileNumber}
                disabled
              />
            </h1>
          </div>
          <button
            onClick={() => {
              ProceedHandler();
            }}
            className="text-center my-4 justify-center w-auto px-8 py-3 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      {!Loader && ShowUnbilledOrder ? (
        <UnbilledOrderAccordian
          RoomId={RoomId}
          GuestId={GuestId}
          Checked_Out_Date={Checked_Out_Date}
          SetShowUnbilledOrder={SetShowUnbilledOrder}
          RoomNumber={RoomNumber}
          Customer_Name={Customer_Name}
          Checked_In_Date={Checked_In_Date}
          IdentityType={IdentityType}
          IdentityNumber_Hashed={IdentityNumber_Hashed}
          MobileNumber={MobileNumber}
          ParamRoomId={ParamRoomId}
        />
      ) : null}
    </>
  );
}

export default GuestOtherDetails;
