import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/slice/userSlice";

const DeleteUser = ({ onClose }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteUser(currentUser.id));
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-blue-300 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Delete Profile
      </h2>
      <p className="mb-4 text-black">
        Are you sure you want to delete your profile? This action cannot be
        undone.
      </p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300 w-full"
        onClick={handleDeleteUser}
      >
        Confirm Delete
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300 w-full mt-4"
        onClick={onClose}
      >
        No! Don't Delete My Profile!
      </button>
    </div>
  );
};

export default DeleteUser;
