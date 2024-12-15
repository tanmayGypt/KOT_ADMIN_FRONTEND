import React from "react"
import Navbar from "../Components/CommonComponets/Navbar"
import RoomTransactionHistoryTeller from "../Components/RoomTansactionHistory/RoomTransactionHistoryTeller"

function RoomTransactionHistory() {
  return (
    <div className="flex">
      <RoomTransactionHistoryTeller />
    </div>
  )
}

export default RoomTransactionHistory
