import { useState } from "react";

//redux
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
    <div className="bg-blue-300 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Update Profile
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleEditUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2 text-black"
        />
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2  text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2  text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Update
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditUser;
