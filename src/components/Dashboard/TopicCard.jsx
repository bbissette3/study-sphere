const TopicCard = ({ topic }) => {
  return (
    <div className="max-w-sm p-4 m-4 rounded overflow-hidden shadow-2xl bg-white transform transition-all duration-200 hover:scale-95 z-10">
      <h2 className="text-xl font-bold text-center mb-2">{topic.title}</h2>
      <p className="text-center mb-2">{topic.description}</p>
      <hr />
      <p className="text-center mb-2">
        Resources: {topic.resources ? topic.resources.length : 0}
      </p>
      <p className="text-center">
        Comments: {topic.comments ? topic.comments.length : 0}
      </p>
    </div>
  );
};

export default TopicCard;
