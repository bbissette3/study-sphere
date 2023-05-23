import { useState } from "react";

const CommentInputForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
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
