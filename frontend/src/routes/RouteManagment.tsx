import { Route, Routes } from "react-router-dom";
import {
  Login,
  OtpModal,
  SignUp,
} from "../Components/userComponents/Index";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../Redux/user/authSlice";
import { adminLoggedOut } from "../Redux/admin/adminAuth";
import { useEffect } from "react";
import AdminPage from "./adminPage";
import UserRoute from "./userRoute";

export default function RootMangament() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("JwtToken");
    if (!token) {
      dispatch(userLoggedOut(false));
      dispatch(adminLoggedOut(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <>
          <Route path="/*" element={<UserRoute />} />
        </>

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/otpModal/:phone" element={<OtpModal />} />

        <>
          <Route path="/admin/*" element={<AdminPage />} />
        </>
      </Routes>
    </>
  );
}
