import { Route, Routes, Navigate } from "react-router-dom"; 
import {
  Login,
  OtpModal,
  SignUp,
  UserHomePage,
} from "../Components/userComponents/Index";
import { useDispatch, useSelector } from "react-redux";
import { RootState, userLoggedOut } from "../Redux/user/authSlice";
import { useEffect } from "react";

export default function UserRouter() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("JwtToken");
    if(!token){
      dispatch(userLoggedOut(false))
    }
  })

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/userHomePage" /> : <Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/otpModal/:phone" element={<OtpModal />} />
        <Route path="/userHomePage" element={isLoggedIn ? <UserHomePage /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}
