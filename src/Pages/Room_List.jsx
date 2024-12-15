import Add_or_Remove_Rooms from "../Components/RoomList_Compoents/Room_List"
import Navbar from "../Components/CommonComponets/Navbar"
import { useContext, useEffect } from "react"
import { UserContext } from "../../context/Provider"
import { useNavigate } from "react-router-dom"
function AddRemoveRooms() {
  return (
    <div className=" w-full">
      <Add_or_Remove_Rooms />
    </div>
  )
}

export default AddRemoveRooms
