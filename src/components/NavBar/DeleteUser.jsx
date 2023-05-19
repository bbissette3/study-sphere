//redux
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
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white rounded p-6 m-4 max-w-xs mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Profile</h2>
        <p className="mb-4 text-black">
          Are you sure you want to delete your profile? This action cannot be
          undone.
        </p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
          onClick={handleDeleteUser}
        >
          Confirm Delete
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
