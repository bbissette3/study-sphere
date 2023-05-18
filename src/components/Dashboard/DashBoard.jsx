import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {currentUser.username}</h2>
    </div>
  );
};

export default Dashboard;
