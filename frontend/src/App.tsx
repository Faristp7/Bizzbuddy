import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootMangament } from "./routes/Index";
import ErrorBoundary from './error/ErrorBountry'

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/*"}
            element={
              <ErrorBoundary>
                  <RootMangament />
              </ErrorBoundary>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
