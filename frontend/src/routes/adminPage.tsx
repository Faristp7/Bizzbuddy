import { Route, Routes } from "react-router-dom";
import { UserMangment, Report } from "../Components/userComponents/Index";
import PrivateRoute from "./PrivateRoute";

export default function adminPage() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute role="admin" redirect={"/"} />}>
          <Route path="/userMangment" element={<UserMangment />} />
          <Route path="/Report" element={<Report />} />
        </Route>
      </Routes>
    </div>
  );
}
