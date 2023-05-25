import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicById } from "../../store/slice/topicSlice";

//sub component
import ResourcesList from "./ResourcesList";
import CommentsList from "./CommentsList";
import CommentInputForm from "./CommentInputForm";
import SubscriptionButton from "./SubScriptionButton";

const TopicDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topic = useSelector((state) => state.topics.selectedTopic);
  const currentUserId = useSelector((state) => state.user.currentUser.id);

  useEffect(() => {
    dispatch(fetchTopicById(id));
  }, [dispatch, id]);

  const isCurrentUserTopicCreator = topic && topic.userId === currentUserId;

  return (
    <div className="container mx-auto py-10 pl-64 pr-8">
      <div className="bg-gray-500 p-8">
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-black"
          >
            <IoIosArrowBack size={24} className="mr-2" />
          </button>
          {topic && !isCurrentUserTopicCreator && (
            <SubscriptionButton topicId={topic.id} />
          )}
        </div>
        <h1 className="text-2xl font-bold text-center pr-8 mb-4">
          {topic && topic.title}
        </h1>
        <div className="flex flex-col md:flex-row md:items-stretch justify-center md:space-x-8">
          <div className="w-full md:w-1/2 pr-2 border-r-2 border-gray-200">
            <h2 className="text-lg font-bold mb-2 text-center">Subject</h2>
            <p className="mb-4 text-center">{topic && topic.subject}</p>
            <h2 className="text-lg font-bold mb-2 text-center">Description</h2>
            <p className="mb-4 text-center">{topic && topic.description}</p>
          </div>
          {topic && topic.resources && (
            <ResourcesList resources={topic.resources} topicId={id} />
          )}
        </div>
        {topic && topic.comments && (
          <CommentsList comments={topic.comments} topicId={id} />
        )}
        <CommentInputForm topicId={id} />
      </div>
    </div>
  );
};

export default TopicDetails;
