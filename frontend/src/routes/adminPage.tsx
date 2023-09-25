import { Route, Routes } from "react-router-dom";
import { UserMangment } from "../Components/userComponents/Index";
import PrivateRoute from "./PrivateRoute";

export default function adminPage() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute role="admin" redirect={"/"} />}>
          <Route path="/userMangment" element={<UserMangment />} />
        </Route>
      </Routes>
    </div>
  );
}
