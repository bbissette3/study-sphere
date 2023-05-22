import { useState, useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics } from "../../store/slice/topicSlice";

//sub component
import AddTopic from "./AddTopic";
import TopicCard from "./TopicCard";

const Dashboard = () => {
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const topics = useSelector((state) => state.topics.topics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  const handleToggleAddTopicModal = () => {
    setShowAddTopicModal(!showAddTopicModal);
  };

  return (
    <>
      <div className="pl-64 pr-5">
        <h1 className="text-4xl font-bold text-center">My Study Topics!</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-5 mb-5 mx-auto block"
          onClick={handleToggleAddTopicModal}
        >
          Add Topic
        </button>

        {showAddTopicModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-6">
            <div className="bg-blue-300 rounded-lg shadow-lg">
              <AddTopic handleToggleForm={handleToggleAddTopicModal} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
