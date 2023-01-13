import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AuthorizePage from "./pages/AuthorizePage/AuthorizePage";
import MainPage from "./pages/MainPage.tsx/MainPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import DialoguePage from "./pages/DialoguePage.tsx/DialoguePage";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return (
    <div className="App">
      <Routes>
        <Route
          element={<ProtectedRoute isAllowed={isAuth} redirect={"/auth"} />}
        >
          <Route element={<Navbar />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/dialogue/:id" element={<DialoguePage />} />
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
