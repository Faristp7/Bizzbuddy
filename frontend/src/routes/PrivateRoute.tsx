import { useDispatch, useSelector } from "react-redux";
import { RootState, userLoggedOut } from "../Redux/user/authSlice";
import { adminLoggedOut, rootState } from "../Redux/admin/adminAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface PrivateRouteProps {
    redirect: string
    role: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ role, redirect }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const adminIsLoggedin = useSelector((state: rootState) => state.admin.isAdminLoggedIn)


    useEffect(() => {
        const token = localStorage.getItem("JwtToken");
        if (!token) {
            dispatch(userLoggedOut(false))
            dispatch(adminLoggedOut(false))
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div>
            {role === "user" ?
                isLoggedIn ? <Outlet /> : redirect
                :
                adminIsLoggedin ? <Outlet /> : redirect
            }
        </div>
    )
}


export default PrivateRoute