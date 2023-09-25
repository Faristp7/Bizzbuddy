import { Route, Routes, Navigate } from "react-router-dom";
import {
  Login,
  OtpModal,
  SignUp,
  UserHomePage,
} from "../Components/userComponents/Index";
import { useDispatch, useSelector } from "react-redux";
import { RootState, userLoggedOut } from "../Redux/user/authSlice";
import { adminLoggedOut, rootState } from "../Redux/admin/adminAuth";
import { useEffect } from 'react'
import AdminPage from './adminPage'

export default function UserRouter() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const adminIsLoggedin = useSelector((state: rootState) => state.admin.isAdminLoggedIn)

  // PrivateRoute.propTypes = {
  //     redirect: PropTypes.string, 
  //   };

  useEffect(() => {
    const token = localStorage.getItem("JwtToken");
    const adminToken = localStorage.getItem("adminToken");
    if (!token ) {
      dispatch(userLoggedOut(false))
    } 
    if(!adminToken ){
      dispatch(adminLoggedOut(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login role={''} />} />
        {isLoggedIn &&
          <>
            <Route path="/" element={<Navigate to="/userHomePage" />} />
          </>
        }
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/otpModal/:phone" element={<OtpModal />} />
        <Route path="/*" element={isLoggedIn ? <UserHomePage /> : <Navigate to="/" />} />
        {adminIsLoggedin &&
          <>
            < Route path="/" element={<Navigate to="/admin/userMangment" />} />
            < Route path="/admin/*" element={<AdminPage />} />
          </>
        }
      </Routes>
    </>
  );
}
