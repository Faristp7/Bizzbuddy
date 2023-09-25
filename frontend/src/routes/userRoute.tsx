import { Route, Routes } from "react-router-dom"
import { UserHomePage } from "../Components/userComponents/Index"
import PrivateRoute from "./PrivateRoute"

export default function userRoute() {
    return (
        <div>
            <Routes>
                <Route element={<PrivateRoute role="user" redirect={"/"}/>}>
                    <Route path="/userHomePage" element={<UserHomePage />} />
                </Route>
                
            </Routes>
        </div>
    )
}
