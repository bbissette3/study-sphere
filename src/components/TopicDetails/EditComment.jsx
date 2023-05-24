import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

//redux
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../store/slice/commentSlice";
import topicSlice from "../../store/slice/topicSlice";

const EditComment = ({ comment, topicId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.user.currentUser;
  });

  const handleEditComment = async (e) => {
    dispatch(
      updateComment({
        text: editedText,
        commentId: comment.id,
        userId: currentUser.id,
        topicId,
      })
    );
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditedText(comment.text);
    setIsEditing(true);
  };

  const handleSave = async () => {
    await handleEditComment();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <BsPencilSquare
        onClick={handleEdit}
        className="inline-block mr-2 cursor-pointer"
      />
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-1/2 h-1/2">
            <h2 className="text-2xl font-bold mb-4">Edit Comment</h2>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditComment;
