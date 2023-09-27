import { Route, Routes } from "react-router-dom"
import { CreatePost, Profile, UserHomePage } from "../Components/userComponents/Index"
import PrivateRoute from "./PrivateRoute"
import Error from "../Components/Error"

export default function UserRoute() {
    return (
        <div>
            <Routes>
                <Route element={<PrivateRoute role="user" redirect={"/"} />}>
                    <Route path="/userHomePage" element={<UserHomePage />} />
                    <Route path="/userProfile" element={<Profile />} />
                    <Route path="/CreatePost" element={<CreatePost />} />
                </Route>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </div>
    )
}
