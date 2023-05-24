import React from "react";
import { BsTrash } from "react-icons/bs";

//redux
import { useDispatch } from "react-redux";
import { deleteResource } from "../../store/slice/resourceSlice";

const DeleteResource = ({ resourceId, topicId }) => {
  const dispatch = useDispatch();

  const handleDeleteResource = () => {
    dispatch(deleteResource({ resourceId, topicId }));
  };

  return (
    <BsTrash
      onClick={handleDeleteResource}
      className="inline-block cursor-pointer"
    />
  );
};

export default DeleteResource;
