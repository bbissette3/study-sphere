import { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../store/slice/userSlice";

const EditUser = ({ onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");

  const handleEditUser = (e) => {
    e.preventDefault();
    dispatch(editUser({ userId: currentUser.id, username, email, password }));
    window.location.reload();
  };

  return (
    <div className="bg-blue-300 rounded-lg shadow-lg p-6 relative">
      <button
        className="absolute top-4 right-4 text-lg font-bold text-black"
        onClick={onClose}
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Update Profile
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleEditUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2 bg-white text-black"
        />
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 bg-white text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2 bg-white text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300 mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
