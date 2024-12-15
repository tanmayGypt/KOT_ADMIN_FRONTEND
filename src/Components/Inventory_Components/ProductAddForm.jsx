import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PropagateLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../../context/Provider";

function ProductAddForm() {
  const { SelectedItem, SetSelectedItem } = useContext(UserContext);
  const [FoodName, SetItemName] = useState("");
  const [isVeg, SetisVeg] = useState("");
  const [Availability, SetAvailability] = useState("");
  const [Description, SetDesctiption] = useState("");
  const [Image_Url, SetImageURL] = useState("");
  const [Price, SetActualPrice] = useState(0);
  const [Discount, SetDiscount] = useState(0);
  const [Loader, ShowLoader] = useState(false);
  const [MealType, SetMealType] = useState("");
  const UniqueId = uuidv4();

  useEffect(() => {
    const Fetcher = async () => {
      try {
        if (SelectedItem) {
          const response = await axios.get(
            `${
              import.meta.env.VITE_BASEURL
            }/List_of_Foods/GetFoodById/${SelectedItem}`,
            {
              withCredentials: true,
            }
          );
          SetItemName(response.data.FoodName);
          SetisVeg(response.data.isVeg ? "Yes" : "No");
          SetAvailability(
            response.data.isAvailable ? "Available" : "Not Available"
          );
          SetDesctiption(response.data.Description);
          SetImageURL(response.data.ImageUrl);
          SetActualPrice(response.data.Price);
          SetDiscount(response.data.Discount);
          SetMealType(response.data.Category);
        }
      } catch (error) {
        console.log(error);
      }
    };
    Fetcher();
  }, [SelectedItem]);

  const handleSubmit = async (e) => {
    const confirmation = confirm(`Are You sure want to add Item: ${FoodName}`);
    if (!confirmation) return;
    e.preventDefault();
    if (
      !FoodName ||
      !isVeg ||
      !Availability ||
      !Description ||
      !Image_Url ||
      !Price ||
      !Discount
    ) {
      toast.error("Please fill all the details below");
      return;
    }

    ShowLoader(true);

    try {
      console.log("Adding food....");
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/List_of_Foods/AddNewFood`,
        {
          FoodId: UniqueId,
          FoodName,
          isVeg: isVeg === "Yes",
          isAvailable: Availability === "Available",
          Description,
          ImageUrl: Image_Url,
          Price,
          Discount,
          Category: MealType,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200 && !response?.data?.name) {
        toast.success("New Item Added or Modified Successfully");
        SetItemName("");
        SetAvailability("");
        SetisVeg("");
        SetImageURL("");
        SetDesctiption("");
        SetActualPrice(0);
        SetDiscount(0);
      }
      ShowLoader(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred, please try again");
      ShowLoader(false);
    }
  };

  const UpdateHandler = async () => {
    const confirmation = confirm(
      `Are you sure you want to update the item ${FoodName}?`
    );
    if (!confirmation) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/List_of_Foods/UpdateFood`,
        {
          FoodId: SelectedItem,
          FoodName,
          isVeg: isVeg === "Yes",
          isAvailable: Availability === "Available",
          Description,
          ImageUrl: Image_Url,
          Price,
          Discount,
          Category: MealType,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Item Modified Successfully");
        SetSelectedItem(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  const handleDelete = async (e) => {
    const confirmation = confirm(
      `Are You sure want to Delete the Item: ${FoodName}`
    );
    if (!confirmation) return;
    e.preventDefault();
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/List_of_Foods/RemoveFood/${SelectedItem}`,
        {
          withCredentials: true,
        }
      );
      if (response.data && !response?.data?.name) {
        toast.success("Item Deleted Successfully");
        SetSelectedItem(null);
      } else {
        toast.error("An error occurred, please try again");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  return (
    <div className="w-8/12 mx-auto my-8">
      <h1 className="text-center text-xl font-semibold">
        {SelectedItem ? "Update Inventory Item" : "Add Inventory Item"}
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
          Loader ? "opacity-50" : null
        }`}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="foodName"
          >
            Name Of Item:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="foodName"
            type="text"
            placeholder="Name Of Item"
            value={FoodName}
            onChange={(e) => SetItemName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="isVeg"
          >
            Is Vegetarian?
          </label>
          <select
            className="w-full border-2 py-1 rounded-md px-2"
            id="isVeg"
            value={isVeg}
            onChange={(e) => SetisVeg(e.target.value)}
          >
            <option value="">Choose the type</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="availability"
          >
            Select Availability:
          </label>
          <select
            className="w-full border-2 py-1 px-2 rounded-md"
            id="availability"
            value={Availability}
            onChange={(e) => SetAvailability(e.target.value)}
          >
            <option value="">Choose Option</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="availability"
          >
            Select Meal Type:
          </label>
          <select
            className="w-full border-2 py-1 px-2 rounded-md"
            id="Meal Type"
            value={MealType}
            onChange={(e) => SetMealType(e.target.value)}
          >
            <option value="">Choose Option</option>
            <option value="Starter">Starter</option>
            <option value="Main Course">Main Course</option>
            <option value="Breads">Breads</option>
            <option value="Rice">Rice</option>
            <option value="Sweets">Sweets</option>
            <option value="Main Course">Main Course</option>
            <option value="Bright Side Special">Bright Side Special</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className="shadow appearance-none border px-3 py-1 rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-36"
            id="description"
            placeholder="Enter Description of Item"
            value={Description}
            onChange={(e) => SetDesctiption(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl"
          >
            Image URL:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="imageUrl"
            type="url"
            placeholder="Enter URL of Image"
            value={Image_Url}
            onChange={(e) => SetImageURL(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Actual Price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Enter Price of item"
            value={Price}
            onChange={(e) => SetActualPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="discount"
          >
            Discount:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="discount"
            type="text"
            value={Discount}
            placeholder="Enter Discount"
            onChange={(e) => SetDiscount(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between flex-col gap-y-3">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={!SelectedItem ? handleSubmit : UpdateHandler}
          >
            {SelectedItem ? "Update Inventory Item" : "Add Inventory Item"}
          </button>
          {SelectedItem && (
            <button
              className="bg-red-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDelete}
            >
              Delete Inventory Item
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductAddForm;
