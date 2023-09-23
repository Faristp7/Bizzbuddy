import { Route, Routes, Navigate } from "react-router-dom";
import {
  Login,
  NavigationBar,
  OtpModal,
  SignUp,
  UserHomePage,
  UserMangment,
} from "../Components/userComponents/Index";
import { useDispatch, useSelector } from "react-redux";
import { RootState, userLoggedOut } from "../Redux/user/authSlice";
import { adminLoggedOut, rootState } from "../Redux/admin/adminAuth";
import { useEffect } from "react";

export default function UserRouter() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const adminIsLoggedin = useSelector((state: rootState) => state.admin.isAdminLoggedIn)

  useEffect(() => {
    const token = localStorage.getItem("JwtToken");
    if (!token) {      
      dispatch(userLoggedOut(false))
      dispatch(adminLoggedOut(false))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/userHomePage" /> : <Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/otpModal/:phone" element={<OtpModal />} />
        <Route path="/userHomePage" element={isLoggedIn ? <UserHomePage /> : <Navigate to="/" />} />
        <Route path="/navigationBar" element={isLoggedIn ? <NavigationBar /> : <Navigate to="/" />} />
        <Route path="/UserMangment" element={adminIsLoggedin ? <UserMangment /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}
