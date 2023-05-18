import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {user.username}</h2>
    </div>
  );
};

export default Dashboard;
