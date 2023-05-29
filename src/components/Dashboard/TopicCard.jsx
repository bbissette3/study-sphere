import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  return (
    <Link to={`/topics/${topic.id}`}>
      <div className="max-w-sm p-4 m-4 rounded overflow-hidden bg-opacity-80 bg-tan text-darkGray hover:scale-95 flex flex-col h-full">
        <h2 className="text-2xl font-bold text-center mb-2 flex-grow">
          {topic.title}
        </h2>
        <p className="text-lg text-center mb-2 flex-grow">{topic.subject}</p>
        <hr className="border-darkGray mb-2" />
        <p className="text-center mb-2">
          <span>Resources:</span> {topic.resources ? topic.resources.length : 0}
        </p>
        <p className="text-center flex-grow">
          <span>Comments:</span> {topic.comments ? topic.comments.length : 0}
        </p>
      </div>
    </Link>
  );
};

export default TopicCard;
