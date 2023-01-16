import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AuthorizePage from "./pages/AuthorizePage/AuthorizePage";
import MainPage from "./pages/MainPage.tsx/MainPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import DialoguePage from "./pages/DialoguePage.tsx/DialoguePage";
import { useAppDispatch } from "./redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "./redux/slices/authSlice";
import { Context } from ".";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const { auth } = useContext(Context);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const displayName = user?.displayName;
      const photoURL = user?.photoURL;
      const uid = user?.uid;
      const email = user?.email;
      dispatch(login({ displayName, photoURL, uid, email }));
    });
  }, []);

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
