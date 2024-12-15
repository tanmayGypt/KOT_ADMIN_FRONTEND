import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import LoginWithMasterKey from "./src/Pages/Login";

function RequireUser() {
  const [cookies] = useCookies(["jwt"]);

  // Check if the jwt cookie exists and is not empty
  if (cookies.jwt && cookies.jwt !== "") {
    return <Outlet />; // Allow access to child routes
  }

  // If jwt cookie is missing, show the login page
  return <LoginWithMasterKey />;
}

export default RequireUser;
