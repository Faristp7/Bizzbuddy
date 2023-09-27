import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootMangament } from "./routes/Index";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<RootMangament />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
