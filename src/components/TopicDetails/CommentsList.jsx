const CommentsList = ({ comments }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mt-4 mb-2 text-center">
        Comments ({comments.length})
      </h2>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <h3 className="font-bold">
            {comment.user.username}: {comment.createdAt}
          </h3>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
