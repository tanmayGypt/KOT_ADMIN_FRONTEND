import { useContext } from "react"
import { RxCrossCircled } from "react-icons/rx"

import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/Provider"
function NotificationMessage({ isOpen, data, handleClose }) {
  const { SetSelectedItem } = useContext(UserContext)
  const navigate = useNavigate()

  function handleOpenOrder() {
    SetSelectedItem(data.title)
    navigate(`/Orders/${data.title}`)
    handleClose()
  }

  function handleCrossClick(event) {
    event.stopPropagation()
    handleClose()
  }

  return (
    <div
      onClick={handleOpenOrder}
      className={`z-50 top-2 cursor-pointer flex flex-col justify-center items-start pl-6 fixed bg-orange-300 w-[18%] rounded-md py-3 transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0 right-2" : "translate-x-full right-0"
      }`}
    >
      <div
        onClick={handleCrossClick}
        className="absolute right-2 text-lg top-2 cursor-pointer"
      >
        <RxCrossCircled />
      </div>
      <div className=" font-bold bg-green-700 rounded-md px-3 flex items-center py-0.5 text-white mb-2">
        New Order
      </div>
      <div className=" font-medium">Room No. : {data.body}</div>
      <div className=" font-medium text-sm underline text-gray-900">
        Order Id: {data.title}
      </div>
    </div>
  )
}

export default NotificationMessage
