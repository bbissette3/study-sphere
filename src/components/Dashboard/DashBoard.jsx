import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div className="flex flex-col text-center">
      <h2>{currentUser.username}'s Dash Board</h2>
    </div>
  );
};

export default Dashboard;
