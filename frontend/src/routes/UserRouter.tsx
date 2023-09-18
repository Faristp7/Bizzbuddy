import { Route, Routes } from "react-router-dom";
import { Login, SignUp } from "../Components/Index";

export default function UserRouter() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
    </>
  );
}
