import { useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../store/slice/commentSlice";

const CommentInputForm = ({ topicId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.user.currentUser;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(
        createComment({ text: comment, userId: currentUser.id, topicId })
      );
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        id="comment"
        name="comment"
        type="text"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Add comment..."
        className="w-full rounded-lg border-gray-300 shadow-lg py-2 px-4"
      />
    </form>
  );
};

export default CommentInputForm;
