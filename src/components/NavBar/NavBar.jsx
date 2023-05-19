import { useState } from "react";
import { NavLink } from "react-router-dom";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const Navbar = () => {
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  return (
    <div className="container">
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
        <button
          className="p-5 text-white hover:bg-blue-700 rounded"
          onClick={() => setShowEditUser(true)}
        >
          Edit Profile
        </button>
        {showEditUser && <EditUser onClose={() => setShowEditUser(false)} />}
        <button
          className="p-5 text-white hover:bg-blue-700 rounded"
          onClick={() => setShowDeleteUser(true)}
        >
          Delete Profile
        </button>
        {showDeleteUser && (
          <DeleteUser onClose={() => setShowDeleteUser(false)} />
        )}
        <button className="p-5 text-white hover:bg-blue-700 rounded">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
