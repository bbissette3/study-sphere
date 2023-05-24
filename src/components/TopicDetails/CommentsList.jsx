import { format } from "date-fns";
import { BsTrash } from "react-icons/bs";

//redux
import { useSelector } from "react-redux";

//sub component
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";

const CommentsList = ({ comments, topicId }) => {
  const currentUser = useSelector((state) => {
    return state.user.currentUser;
  });

  return (
    <div className="max-h-96 overflow-y-auto">
      <h2 className="text-lg font-bold mt-4 mb-2 text-center pr-8">Comments</h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="mb-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">
              {comment.user.username}:{" "}
              {format(new Date(comment.createdAt), "MMMM d, yyyy")}
            </h3>
            <p className="pl-4">{comment.text}</p>
          </div>
          {comment.userId === currentUser.id && (
            <div>
              <EditComment comment={comment} />
              <DeleteComment commentId={comment.id} topicId={topicId} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default CommentsList;
