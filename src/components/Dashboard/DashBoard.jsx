import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.currentUser);

  //   console.log("user", user);

  if (!currentUser.id) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-blue-400 flex-row text-center ">
      <h2>Welcome, {currentUser.username}</h2>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};

export default Dashboard;
