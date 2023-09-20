import { Route, Routes } from "react-router-dom";
import { Login, OtpModal, SignUp, UserHomePage } from "../Components/userComponents/Index";

export default function UserRouter() {
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
