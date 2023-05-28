import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  return (
    <Link to={`/topics/${topic.id}`}>
      <div className="max-w-sm p-4 m-4 rounded overflow-hidden bg-opacity-80 bg-gray-900 text-white hover:scale-95">
        <h2 className="text-2xl font-bold text-center mb-2">{topic.title}</h2>
        <p className="text-lg text-center mb-2">{topic.subject}</p>
        <hr className="border-gray-300 mb-2" />
        <p className="text-center mb-2">
          <span className="text-gray-300">Resources:</span>{" "}
          {topic.resources ? topic.resources.length : 0}
        </p>
        <p className="text-center">
          <span className="text-gray-300">Comments:</span>{" "}
          {topic.comments ? topic.comments.length : 0}
        </p>
      </div>
    </Link>
  );
};

export default TopicCard;
