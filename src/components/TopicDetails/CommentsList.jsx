import { format } from "date-fns";

const CommentsList = ({ comments }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mt-4 mb-2 text-center pr-8">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <h3 className="font-bold">
            {comment.user.username}:{" "}
            {format(new Date(comment.createdAt), "MMMM d, yyyy")}
          </h3>
          <p className="pl-4">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
