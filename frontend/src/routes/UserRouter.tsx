import { Route, Routes } from "react-router-dom";
import { Login } from "../Components/Index";

export default function UserRouter() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />} />
      </Routes>
    </>
  );
}
