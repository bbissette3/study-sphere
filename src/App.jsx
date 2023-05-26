import "./index.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/slice/userSlice";

// Component imports
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header";
import ProtectedRoute from "./store/Utility/ProtectedRoute";
import DashBoard from "./components/Dashboard/DashBoard";
import Navbar from "./components/NavBar/NavBar";
import TopicDetails from "./components/TopicDetails/TopicDetails";
import Forum from "./components/Forums/Forum";
import FocusSession from "./components/FocusSession/FocusSession";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

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
      {currentUser && <Navbar />}
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
        <Route
          path="/topics/:id"
          element={
            <ProtectedRoute>
              <TopicDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/focusSessions"
          element={
            <ProtectedRoute>
              <FocusSession />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
