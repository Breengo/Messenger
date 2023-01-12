import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AuthorizePage from "./pages/AuthorizePage/AuthorizePage";
import MainPage from "./pages/MainPage.tsx/MainPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  // const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isAuth = true;
  return (
    <div className="App">
      <Routes>
        <Route
          element={<ProtectedRoute isAllowed={isAuth} redirect={"/auth"} />}
        >
          <Route element={<Navbar />}>
            <Route path="/" element={<MainPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute isAllowed={!isAuth} redirect={"/"} />}>
          <Route path="/auth" element={<AuthorizePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
