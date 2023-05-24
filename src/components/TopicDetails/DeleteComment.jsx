import React from "react";
import { BsTrash } from "react-icons/bs";

//redux
import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/slice/commentSlice";

const DeleteComment = ({ commentId, topicId }) => {
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteComment({ commentId, topicId }));
  };

  return (
    <BsTrash
      onClick={handleDeleteComment}
      className="inline-block cursor-pointer"
    />
  );
};

export default DeleteComment;
