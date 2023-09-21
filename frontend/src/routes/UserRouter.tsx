import { Navigate, Route, Routes } from "react-router-dom";
import { Login, OtpModal, SignUp, UserHomePage } from "../Components/userComponents/Index";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/user/authSlice";

export default function UserRouter() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

  return (
    <>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path={"/"} element={<Login />} />
            <Route path={"/signUp"} element={<SignUp />} />
            <Route path={"/otpModal/:phone"} element={<OtpModal />} />
            <Route path={"/userHomePage"} element={<Navigate to={"/"} />} />
          </>
        ) : (
          <>
            <Route path={"/userHomePage"} element={<UserHomePage />} />
            <Route path={"/"} element={<Navigate to={"/userHomePage"} />} />
          </>
        )}
      </Routes>
    </>
  );
}
