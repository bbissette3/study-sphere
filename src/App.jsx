import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/actions/currentUserAction";

// Component imports
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header";
import DashBoard from "./components/Dashboard/DashBoard";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // Dispatch action to get the current user when the app component mounts

    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch]);

  const isAuthenticated = !!currentUser?.id;

  return (
    <div className="bg-blue-950 min-h-screen">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace={true} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashBoard /> : <Navigate to="/" replace={true} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

// return (
//   <div className="bg-blue-950 min-h-screen">
//     <Header />
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/dashboard" element={<DashBoard />} />
//     </Routes>
//   </div>
// );
