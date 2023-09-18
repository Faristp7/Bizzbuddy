import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRouter } from "./routes/Index";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<UserRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
