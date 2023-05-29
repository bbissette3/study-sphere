import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

//redux
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../store/slice/commentSlice";

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
          <div className="bg-lightBlue p-6 rounded w-1/2 relative">
            <button
              className="absolute top-4 right-4 text-lg font-bold text-darkGray"
              onClick={handleCancel}
            >
              X
            </button>
            <h2 className="text-2xl text-darkGray text-center font-bold mb-4">
              Edit Comment
            </h2>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
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
    </div>
  );
};

export default EditComment;
