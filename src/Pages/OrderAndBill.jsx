import React, { useContext, useEffect } from "react"
import Navbar from "../Components/CommonComponets/Navbar"
import OrderList from "../Components/Order_and_Bill_Components/OrderList"
import { UserContext } from "../../context/Provider"
import { useNavigate } from "react-router-dom"
function Order_Payment() {
  return (
    <>
      <div className="">
        <OrderList />
      </div>
    </>
  )
}

export default Order_Payment
