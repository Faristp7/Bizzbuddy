import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootMangament } from "./routes/Index";
import ErrorBoundary from './error/ErrorBountry'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<ErrorBoundary><RootMangament /></ErrorBoundary>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
