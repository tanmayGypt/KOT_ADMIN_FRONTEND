import Navbar from "../Components/CommonComponets/Navbar"
import GuestList from "../Components/GuestComponents/Guest_List"

import { UserContext } from "../../context/Provider"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
function Guest() {
  return (
    <div className="">
      <GuestList />
    </div>
  )
}

export default Guest
