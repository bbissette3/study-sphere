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
    <>
      <button
        className="absolute top-4 right-4 text-lg font-bold text-darkGray"
        onClick={onClose}
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center text-darkGray">
        Update Profile
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleEditUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2 bg-white text-darkGray"
        />
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 bg-white text-darkGray"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2 bg-white text-darkGray"
        />
        <button
          type="submit"
          className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white px-4 py-2 rounded transition-colors duration-300"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default EditUser;
