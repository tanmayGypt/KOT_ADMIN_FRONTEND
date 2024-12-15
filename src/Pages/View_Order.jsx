import { useContext, useEffect, useState } from "react";
import Navbar from "../Components/CommonComponets/Navbar";
// import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import { UserContext } from "../../context/Provider";
import OrderDetails from "../Components/ViewOrderComponents/OrderDetails";

import OrderList from "../Components/ViewOrderComponents/OrderList";
function View_Order() {
  return (
    <div className="flex flex-col">
      <OrderDetails />
      <OrderList />
    </div>
  );
}

export default View_Order;
