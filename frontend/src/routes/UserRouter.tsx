import { Route, Routes } from "react-router-dom";
import { Login, OtpModal, SignUp, UserHomePage } from "../Components/userComponents/Index";
import { useSelector } from "react-redux";

export default function UserRouter() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  console.log(isLoggedIn);
  
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/signUp"} element={<SignUp />} />
        <Route path={"/otpModal/:phone"} element={<OtpModal />} />
        <Route path={"/userHomePage"} element={<UserHomePage />} />
      </Routes>
    </>
  );
}
