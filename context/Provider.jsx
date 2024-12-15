import React, { createContext, useState } from "react"
import Inventory_Update from "../src/Pages/Inventory_Update"

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [TotalProducts, SetTotalProducts] = useState(0)
  const [VegItems, SetVegItems] = useState(0)
  const [Customers, SetCustomers] = useState(0)
  const [AvailableItems, SetAvailableItems] = useState(0)
  const [product, setproduct] = useState(900)
  const [Items, SetItems] = useState([])
  const [ShowRoomAddForm, SetShowRoomAddForm] = useState(false)
  // const [User, SetUser] = useState("Admin");
  const [SelectedItem, SetSelectedItem] = useState(null)
  const [List_Of_Foods, SetList_Of_Foods] = useState(null)
  const [AllRooms, SetAllRooms] = useState(null)
  const [AvailableRooms, SetAvailableRooms] = useState([])
  // const [NavHighlight, SetNavHighlight] = useState({
  //   Inventory_Update: true,
  //   RoomList: false,
  //   GuestList: false,
  //   OrderAndBills: false,
  //   UpdatePayment: false,
  // });
  return (
    <UserContext.Provider
      value={{
        ShowRoomAddForm,
        AvailableRooms,
        SetAvailableRooms,
        List_Of_Foods,
        SetList_Of_Foods,
        AllRooms,
        SetAllRooms,
        SelectedItem,
        SetSelectedItem,
        SetShowRoomAddForm,
        Items,
        SetItems,
        product,
        setproduct,
        TotalProducts,
        SetTotalProducts,
        AvailableItems,
        SetAvailableItems,
        VegItems,
        SetVegItems,
        Customers,
        SetCustomers,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
