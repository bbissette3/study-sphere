import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      {/* <div className="flex flex-col sticky top-0 bg-blue-500 w-36 h-full min-h-screen"> */}
      <div className=" w-[225px] bg-gray-900 h-screen fixed flex flex-col justify-start py-4 px-8 text-white">
        <NavLink className="p-5 text-white text-center hover:bg-blue-700 rounded">
          Dash Board
        </NavLink>
        <NavLink className="p-5 text-white text-center hover:bg-blue-700 rounded">
          Focus Session
        </NavLink>
        <NavLink className="p-5 text-white text-center hover:bg-blue-700 rounded">
          Forums
        </NavLink>
        <button className="p-5 text-white hover:bg-blue-700 rounded">
          Edit Profile
        </button>
        <button className="p-5 text-white hover:bg-blue-700 rounded">
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Navbar;
