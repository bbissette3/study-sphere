import { useEffect } from "react";
import { useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicById } from "../../store/slice/topicSlice";

const TopicDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const topic = useSelector((state) => state.topics.selectedTopic);

  useEffect(() => {
    dispatch(fetchTopicById(id));
  }, [dispatch, id]);

  return (
    <div className="pl-64 bg-white">
      <h1 className="text-3xl font-bold text-center mb-4">
        {topic && topic.title}
      </h1>
      <div className="flex flex-col items-center md:flex-row md:items-start justify-center border-b-2 border-gray-200 pb-4">
        <div className="w-full md:w-1/2 pr-4 border-r-2 border-gray-200">
          <h2 className="text-xl font-bold mb-2 text-center">Description</h2>
          <p className="mb-4 text-center">{topic && topic.description}</p>
        </div>
        <div className="w-full md:w-1/2 pl-4">
          <h2 className="text-xl font-bold mb-2 text-center">
            Resources ({topic && topic.resources ? topic.resources.length : 0})
          </h2>
          {topic &&
            topic.resources &&
            topic.resources.length > 0 &&
            topic.resources.map((resource) => (
              <div key={resource.id}>
                <h3 className="font-bold">{resource.name}</h3>
                <p>{resource.description}</p>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mt-4 mb-2 text-center">
          Comments ({topic && topic.comments ? topic.comments.length : 0})
        </h2>
        {topic &&
          topic.comments &&
          topic.comments.length > 0 &&
          topic.comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <h3 className="font-bold">
                {comment.user.username}: {comment.createdAt}
              </h3>
              <p>{comment.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopicDetails;
