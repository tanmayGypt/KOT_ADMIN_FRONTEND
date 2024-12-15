import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./Pages/Login";
import AddRemoveRooms from "./Pages/Room_List";
import Order_Payment from "./Pages/OrderAndBill";
import View_Order from "./Pages/View_Order";
import Inventory_Update from "./Pages/Inventory_Update";
import ProductAddForm from "./Components/Inventory_Components/ProductAddForm";
import Guest from "./Pages/Guest";
import { UserContextProvider } from "../context/Provider";
import Transactions from "./Pages/Transactions";
import RoomTransactionHistory from "./Pages/RoomTransactionHistory";
import Navbar from "./Components/CommonComponets/Navbar";
import { useState } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import NotificationMessage from "./Components/notification/NotificationMessage";
import RequireUser from "../PrivateRoute";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  onMessage(messaging, (payload) => {
    setMessage(payload.notification);
    console.log("message", payload);
    setOpen(true);
  });

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="flex w-full">
      {!hideNavbar && (
        <div className="w-[25%]">
          <Navbar />
        </div>
      )}
      <div className={hideNavbar ? "w-full" : "w-[75%]"}>
        {/* {open && ( */}
        <NotificationMessage
          isOpen={open}
          data={message}
          handleClose={handleClose}
        />
        {/* )} */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<RequireUser />}>
            <Route path="/rooms" element={<AddRemoveRooms />} />
            <Route path="/Orders" element={<Order_Payment />} />
            <Route path="/Orders/:id" element={<View_Order />} />
            <Route path="/Inventory" element={<Inventory_Update />} />
            <Route path="/AddInventory" element={<ProductAddForm />} />
            <Route path="/AddInventory/:itemId" element={<ProductAddForm />} />

            <Route path="/guests" element={<Guest />} />
            <Route path="/guests/:GuestId" element={<Guest />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route
              path="/Room_Occupation_Transaction"
              element={<RoomTransactionHistory />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <UserContextProvider>
      <Router>
        <AppContent />
      </Router>
    </UserContextProvider>
  );
}
