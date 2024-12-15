import axios from "axios";
import { useEffect, useState } from "react";
// import md5 from "md5";
import { PropagateLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
// import { TbConeOff } from "react-icons/tb";
// import { Navigate } from "react-router-dom";

function ProductAddForm() {
  const [RoomId, SetRoomId] = useState(null);
  const [Customer_Name, SetCustomer_Name] = useState("");
  const [Checked_In_Date, SetChecked_In_Date] = useState(null);
  const [IdentityType, SetIdentityType] = useState("");
  const [IdentityNumber_Hashed, SetIdentityNumber_Hashed] = useState(null);
  const [MobileNumber, SetMobileNumber] = useState(null);
  const [Loader, ShowLoader] = useState(false);
  const [AvailableRooms, SetAvailableRooms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [RoomNumber, SetRoomNumber] = useState(null);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/Rooms/FetchAllRooms`,
          {
            withCredentials: true,
          }
        );
        const availableRooms = response?.data?.filter(
          (item) => item.isOccupied == false
        );
        // console.log(availableRooms);
        SetAvailableRooms(availableRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        // Handle error
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    // console.log(RoomId);
    e.preventDefault();

    console.log({
      RoomNumber,
      RoomId,
      Customer_Name,
      Checked_In_Date,

      IdentityType,
      IdentityNumber_Hashed,
      MobileNumber,
    });
    if (
      RoomId &&
      Customer_Name &&
      Checked_In_Date &&
      IdentityType &&
      IdentityNumber_Hashed &&
      MobileNumber
    ) {
      // console.log("Working");
      if (MobileNumber.toString().length < 10) {
        toast.error("Please Enter a Mobile Number of 10 digits");
        return;
      }
      const confirmation = confirm(" Are you sure want to add guest ?");
      if (!confirmation) {
        return;
      }
      try {
        ShowLoader(true);

        // const roomResponse = await axios.get(
        //   `http://localhost:3000/Rooms/FetchRoomById/${RoomId}`
        // );
        // const roomNumber = roomResponse.data.RoomNumber;

        const guestResponse = await axios.post(
          `${import.meta.env.VITE_BASEURL}/Guests/AddGuest`,
          {
            RoomNumber,
            RoomId: RoomId,
            Customer_Name,
            Checked_In_Date,
            Checked_Out_Date: null,
            IdentityType,
            IdentityNumber_Hashed,
            MobileNumber,
          },
          {
            withCredentials: true,
          }
        );
        const updateRoomResponse = await axios.post(
          `${import.meta.env.VITE_BASEURL}/Rooms/UpdateRoom/${RoomId}`,
          {
            isOccupied: true,
            MobileNumber: MobileNumber,
            Customer_Name: Customer_Name,
            GuestId: guestResponse.data.GuestId,
          },
          {
            withCredentials: true,
          }
        );
        console.log(updateRoomResponse.data);

        if (guestResponse.status === 200) {
          ShowLoader(false);
          toast.success("New Guest Added Successfully");
        }

        console.log(guestResponse.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred, please try again");
        ShowLoader(false);
      }
    } else {
      toast.error("Please fill in all the details");
    }
  };
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    SetRoomId(room.RoomId);
    // console.log(room.RoomId);
    setIsOpen(false);
  };
  return (
    <div className="w-6/12 mx-auto">
      <div>
        <Toaster />
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
      <h1 className="text-center text-xl font-semibold">Add New Guest</h1>
      <form
        className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
          Loader ? "opacity-50" : null
        }`}
      >
        {/* Form inputs */}
        {/* Room Number */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 select-none"
            htmlFor="roomNumber"
          >
            Room Number
          </label>
          <div className="relative">
            <div
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 cursor-pointer dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 select-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedRoom
                ? `Room Number: ${selectedRoom.RoomNumber}`
                : "Choose a room"}
            </div>
            {isOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full shadow-lg">
                {AvailableRooms?.map((item) => (
                  <div
                    key={item.RoomId}
                    className="p-2 cursor-pointer hover:bg-gray-200 select-none"
                    onClick={() => {
                      handleRoomSelect(item);
                      SetRoomNumber(item.RoomNumber);
                    }}
                  >
                    Room Number: {item.RoomNumber}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Customer Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="customerName"
          >
            Customer Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="customerName"
            type="text"
            placeholder="Enter Customer Name"
            value={Customer_Name}
            onChange={(e) => SetCustomer_Name(e.target.value)}
          />
        </div>
        {/* Check In Date */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="checkInDate"
          >
            Check In Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="checkInDate"
            type="date"
            placeholder="Enter Check In Date"
            value={Checked_In_Date}
            onChange={(e) => SetChecked_In_Date(e.target.value)}
          />
        </div>

        {/* Identity Type */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="availability"
          >
            Select Identity Type:
          </label>
          <select
            className="w-full border-2 py-1 px-2 rounded-md"
            id="availability"
            value={IdentityType}
            onChange={(e) => SetIdentityType(e.target.value)}
          >
            <option value="">Choose Option</option>
            <option value="Aadhaar Card">Aadhaar Card</option>
            <option value="Pan Card">Pan Card</option>
            <option value="Passport">Passport</option>
          </select>
        </div>
        {/* Identity Number */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="identityNumber"
          >
            Identity Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="identityNumber"
            type="text"
            placeholder="Enter Identity Number"
            value={IdentityNumber_Hashed}
            onChange={(e) => SetIdentityNumber_Hashed(e.target.value)}
          />
        </div>
        {/* Mobile Number */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mobileNumber"
          >
            Mobile Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mobileNumber"
            type="number"
            placeholder="Enter Mobile Number"
            value={MobileNumber}
            onChange={(e) => SetMobileNumber(e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={(e) => handleSubmit(e)}
          >
            Add New Room
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductAddForm;
