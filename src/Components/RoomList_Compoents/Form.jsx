import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import md5 from "md5";
import { PropagateLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../../context/Provider";

function ProductAddForm() {
  const { SelectedItem, SetSelectedItem } = useContext(UserContext);
  const [RoomNumber, SetRoomNumber] = useState(null);
  const [isOccupied, SetisOccupied] = useState(false);
  const [GuestId, SetGuestId] = useState(null);
  const [MobileNumber, SetMobileNumber] = useState(null);
  const [Loader, ShowLoader] = useState(false);
  // const { SelectedItem } = useContext(UserContext);
  console.log(typeof 2);

  useEffect(() => {
    const fetchData = async () => {
      ShowLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/Rooms/FetchRoomById/${SelectedItem}`
      );
      ShowLoader(false);
      SetRoomNumber(response.data.RoomNumber);
      SetisOccupied(response.data.isOccupied);
      SetMobileNumber(response.data?.MobileNumber);
      console.log(response.data);
    };
    fetchData();
    console.log(SelectedItem);
  }, [SelectedItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!RoomNumber) {
    //   toast.error("Please Enter Room Number");
    //   return;
    // }
    // if (typeof RoomNumber != "number") {
    //   toast.error("Please Enter a Number, Not character")
    //   return
    // }
    ShowLoader(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/Rooms/AddNewRoom`,
        {
          RoomNumber,
          isOccupied,
          GuestId,
          MobileNumber,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status == 200) {
        toast.success("Room Added Successfully");
        ShowLoader(false);
      } else {
        toast.error("An error occurred, please try again");
        ShowLoader(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred, please try again");
      ShowLoader(false);
    }
  };

  const UpdateHandler = async (e) => {
    e.preventDefault();

    ShowLoader(true);

    if (!MobileNumber) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASEURL}/Rooms/UpdateRoom/${SelectedItem}`,
          {
            isOccupied,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200) {
          SetRoomNumber(null);
          SetisOccupied(null);
          SetSelectedItem(null);
          toast.success("Room Updated Successfully");
        } else {
          toast.error("An error occurred, please try again");
        }

        ShowLoader(false);
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred, please try again");
        ShowLoader(false);
      } finally {
        SetSelectedItem(null);
      }
    } else {
      toast.error("Can not update an occupied room");
      ShowLoader(false);
    }
  };

  return (
    <div className="w-6/12 mx-auto my-8">
      <h1 className="text-center text-xl font-semibold">
        {SelectedItem ? "Update Room" : "Add new Room"}
      </h1>
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
      <form
        className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
          Loader ? "opacity-50" : ""
        }`}
      >
        {/* Form inputs */}
        {/* Room Number */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="roomNumber"
          >
            Room Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="roomNumber"
            type="text"
            placeholder="Enter Room Number"
            value={RoomNumber}
            onChange={(e) => SetRoomNumber(e.target.value)}
          />
        </div>
        {/* isOccupied */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="isOccupied"
          >
            Occupied?
          </label>
          <select
            className="w-full border-2 py-1 rounded-md px-2"
            value={isOccupied?.toString()}
            onChange={(e) => SetisOccupied(e.target.value === "true")}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              Loader ? "disabled cursor-not-allowed" : ""
            }`}
            type="button"
            onClick={SelectedItem ? UpdateHandler : handleSubmit}
          >
            {SelectedItem ? "Update Room" : "Add New Room"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductAddForm;
