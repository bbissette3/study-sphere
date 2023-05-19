import "./index.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/auth/actions";

// Component imports
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header";
import DashBoard from "./components/Dashboard/DashBoard";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/NavBar";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.currentUser;
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // Dispatch action to get the current user when the app component mounts

    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Navbar />

      {/* <div className="bg-blue-950 min-h-screen"> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* </div> */}
    </>
  );
}

export default App;
