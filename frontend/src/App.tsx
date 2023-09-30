import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootMangament } from "./routes/Index";
import ErrorBoundary from './error/ErrorBountry'
import { Profiler } from 'react'
import { ProfilerCallbackType } from './interface/interface'

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRender: ProfilerCallbackType = (id, _phase, actualDuration, _baseDuration, _startTime) => {
    const durationInSeconds = actualDuration / 1000
    console.log(`${id} took ${durationInSeconds}ms`);
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/*"}
            element={
              <ErrorBoundary>
                <Profiler id="RootMangment" onRender={handleRender}>
                  <RootMangament />
                </Profiler>
              </ErrorBoundary>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
