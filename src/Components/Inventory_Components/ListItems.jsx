import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../CommonComponets/Navbar";
import axios from "axios";
import { UserContext } from "../../../context/Provider";
import { RingLoader } from "react-spinners";

function ListItems({ BoolVegItems, BoolAvailableItems }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [originalItems, setOriginalItems] = useState([]); // Store original items
  const [filteredData, setFilteredData] = useState([]); // Store filtered items
  const {
    SetTotalProducts,
    SetVegItems,
    SetList_Of_Foods,
    SetAvailableItems,
    Items,
    SetItems,
    SetSelectedItem,
    SetShowRoomAddForm,
  } = useContext(UserContext);
  const [ShowLoader, SetShowLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        SetShowLoader(true);

        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/List_of_Foods/FetchAllFood`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        console.log(data);
        setOriginalItems(data); // Initialize original items
        setFilteredData(data); // Initialize filtered items
        const VegItems = data.filter((item) => item.isVeg === true);
        const AvailableItems = data?.filter(
          (item) => item.isAvailable === true
        );
        SetList_Of_Foods(data);
        SetVegItems(VegItems.length);
        SetItems(data);
        SetAvailableItems(AvailableItems.length);
        SetTotalProducts(data.length);
        SetShowLoader(false);
      } catch (error) {
        console.log(error);
      } finally {
        SetShowLoader(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the data based on the search query
    const filtered = originalItems.filter((item) =>
      item.FoodName.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
    console.log(searchQuery);
  };

  return (
    <>
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search By FoodName"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {!ShowLoader ? (
        <div className="bg-white shadow-md rounded my-6">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Vegetarian ?
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Discount (Rs.)
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Actual Price
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData.map((Item) => (
                <tr
                  key={Item.FoodId}
                  className={`${BoolVegItems && !Item.isVeg ? "hidden" : ""} ${
                    BoolAvailableItems && !Item.isAvailable ? "hidden" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-center border-b border-gray-200">
                    {Item.FoodName}
                  </td>
                  <td
                    className={`px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200 font-semibold font-serif ${
                      Item.isAvailable ? "text-lime-600" : "text-red-500"
                    } `}
                  >
                    {Item.isAvailable ? "Available" : "Not Available"}
                  </td>
                  <td
                    className={`px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200 font-semibold font-serif ${
                      Item.isVeg ? "text-lime-600" : "text-red-500"
                    } `}
                  >
                    {Item.isVeg ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                    {Item.Discount}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                    {Item.Price}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                    <button
                      onClick={() => {
                        SetSelectedItem(Item.FoodId);
                        SetShowRoomAddForm(true);
                      }}
                      className="underline underline-offset-4 text-red-700 font-sans font-semibold hover:opacity-75"
                    >
                      Update Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto my-auto flex flex-col gap-y-12 justify-center">
          <h1 className="font-semibold text-xl text-center">
            All the Data Is Currently Loading, Please Wait
          </h1>
          <div className="mx-auto">
            <RingLoader color="blue" size={130} />
          </div>
        </div>
      )}
    </>
  );
}

export default ListItems;
