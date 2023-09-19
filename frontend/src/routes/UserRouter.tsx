import { Route, Routes } from "react-router-dom";
import { Login, OtpModal, SignUp } from "../Components/userComponents/Index";

export default function UserRouter() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/otpModal"} element={<SignUp />} />
        <Route path={"/signUp"} element={<OtpModal />} />
      </Routes>
    </>
  );
}
