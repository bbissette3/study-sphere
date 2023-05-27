import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

//sub components
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

//redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slice/userSlice";

const Navbar = () => {
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => {
    return state.user.currentUser;
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="container">
      <div className=" w-[225px] bg-gray-900 h-screen fixed flex flex-col justify-start py-4 px-8 text-white">
        <h2 className="text-center text-2xl">{currentUser.username}</h2>
        <NavLink
          className="p-5 text-white text-center hover:bg-blue-700 rounded"
          to="/dashboard"
        >
          Dash Board
        </NavLink>
        <NavLink
          className="p-5 text-white text-center hover:bg-blue-700 rounded"
          to="/focusSessions"
        >
          Focus Session
        </NavLink>
        <NavLink
          className="p-5 text-white text-center hover:bg-blue-700 rounded"
          to="/forum"
        >
          Forums
        </NavLink>
        <button
          className="p-5 text-white hover:bg-blue-700 rounded"
          onClick={() => setShowEditUser(true)}
        >
          Edit Profile
        </button>
        {showEditUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-6 z-50 ">
            <EditUser onClose={() => setShowEditUser(false)} />
          </div>
        )}
        <button
          className="p-5 text-white hover:bg-blue-700 rounded"
          onClick={() => setShowDeleteUser(true)}
        >
          Delete Profile
        </button>
        {showDeleteUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <DeleteUser onClose={() => setShowDeleteUser(false)} />
          </div>
        )}
        <button
          className="p-5 text-white hover:bg-blue-700 rounded"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
