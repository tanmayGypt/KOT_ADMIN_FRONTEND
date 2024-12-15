import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/Provider";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebaseConfig";
import Cookies from "js-cookie";
function LoginWithMasterKey() {
  const { SetUser, User } = useContext(UserContext);
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");
  const [IsUser, SetIsUser] = useState(true);
  const [IsPassword, SetIsPassword] = useState(true);
  const [Loader, SetLoader] = useState(false);
  const navigate = useNavigate();
  const cookie = Cookies.get("jwt");

  async function generateToken() {
    const token = await getToken(messaging, {
      vapidKey:
        "BMT4L8rCOeoW6W1OUVEyeybEIJxacx98twJ1RpMCYO25csFzOrSJLgAo3MHl5JthxTUb_yLH1HofPrfb4oWEUD8",
    });
    console.log("token generated", token);
    const res = await axios.post(
      `${import.meta.env.VITE_BASEURL}/Admin_Panel/subscribeToTopic`,
      {
        token,
      }
    );
    console.log("subscribeTopic", res);
  }
  const FetchUser = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/Admin_Panel/VerifyAdmin`,
        {
          Username,
          MasterKey: Password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        Cookies.set("jwt", res.data);
        toast.success("Successfully Logged In");
        navigate("/inventory");
        await generateToken();
        console.log("admin", res);
      }
    } catch (error) {
      toast.error("Invalid Credentials, Please try again");
      SetLoader(false);
      navigate("/");
    }
  };

  const UserNameHandler = (e) => {
    SetUsername(e.target.value);
    if (Username) {
      SetIsUser(true);
    }
  };

  const PasswordHandler = (e) => {
    SetPassword(e.target.value);
    if (Password) {
      SetIsPassword(true);
    }
  };

  const Validator = () => {
    if (!Username) {
      SetIsUser(false);
    }
    if (!Password) {
      SetIsPassword(false);
    }

    if (Username && Password) {
      SetLoader(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className={`absolute ${Loader ? "visible" : "invisible"}`}>
        <PuffLoader />
      </div>
      <div
        className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md ${Loader ? "opacity-50" : ""
          }`}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Hotel Admin Login
        </h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${IsUser ? "border-gray-300" : "border-red-500"
                }`}
              id="username"
              type="text"
              placeholder="Username"
              onChange={UserNameHandler}
            />
            {!IsUser && (
              <p className="text-red-500 text-xs italic mt-1">
                Please Enter a Username.
              </p>
            )}
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="password"
              >
                Master Key
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Reset Master Key?
              </Link>
            </div>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${IsPassword ? "border-gray-300" : "border-red-500"
                }`}
              id="password"
              type="password"
              placeholder="******************"
              onChange={PasswordHandler}
            />
            {!IsPassword && (
              <p className="text-red-500 text-xs italic mt-1">
                Please Enter a Master Key.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline ${Loader ? "opacity-50 cursor-not-allowed" : ""
                }`}
              type="button"
              onClick={() => {
                FetchUser();
                Validator();
              }}
              disabled={Loader}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginWithMasterKey;
