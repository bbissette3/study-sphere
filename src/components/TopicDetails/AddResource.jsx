import { useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { createResource } from "../../store/slice/resourceSlice";

const AddResource = ({ topicId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [resourceUrl, setResourceUrl] = useState("");
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleAddResource = () => {
    dispatch(
      createResource({ url: resourceUrl, userId: currentUser.id, topicId })
    );
    setResourceUrl("");
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleSave = () => {
    handleAddResource();
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <>
      <button
        onClick={handleAdd}
        className="text-darkGray font-bold underline py-2 px-4 rounded"
      >
        Add Resource
      </button>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-lightBlue p-6 rounded w-1/2 relative">
            <button
              className="absolute top-4 right-4 text-lg font-bold text-darkGray"
              onClick={handleCancel}
            >
              X
            </button>
            <h2 className="text-2xl text-darkGray text-center font-bold mb-4">
              Add Resource
            </h2>
            <input
              type="url"
              value={resourceUrl}
              onChange={(e) => setResourceUrl(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white px-4 py-2 rounded transition-colors duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddResource;
