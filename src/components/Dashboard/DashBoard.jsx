import { useState, useEffect } from "react";
import { debounce } from "lodash";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserTopics,
  fetchUserSubscribedTopics,
} from "../../store/slice/topicSlice";

//sub component
import AddTopic from "./AddTopic";
import TopicCard from "./TopicCard";

const Dashboard = () => {
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("created");
  const [searchTerm, setSearchTerm] = useState("");
  const topics = useSelector((state) => state.topics.topics);
  const dispatch = useDispatch();

  useEffect(() => {
    const debouncedFetchUserTopics = debounce(
      (searchTerm) => dispatch(fetchUserTopics(searchTerm)),
      1000
    );

    const debouncedFetchUserSubscribedTopics = debounce(
      (searchTerm) => dispatch(fetchUserSubscribedTopics(searchTerm)),
      1000
    );

    if (searchTerm && currentTab === "created") {
      debouncedFetchUserTopics(searchTerm);
    } else if (searchTerm && currentTab === "subscribed") {
      debouncedFetchUserSubscribedTopics(searchTerm);
    } else if (currentTab === "created") {
      dispatch(fetchUserTopics(searchTerm));
    } else {
      dispatch(fetchUserSubscribedTopics(searchTerm));
    }
  }, [dispatch, currentTab, searchTerm]);

  const handleToggleAddTopicModal = () => {
    setShowAddTopicModal(!showAddTopicModal);
  };

  return (
    <>
      <div className="pl-64 pr-5 ">
        <h1 className="text-4xl font-bold text-center pb-5">
          My Study Topics!
        </h1>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${
              currentTab === "created" ? "bg-blue-500" : "bg-gray-500"
            } text-white`}
            onClick={() => setCurrentTab("created")}
          >
            Created Topics
          </button>
          <button
            className={`px-4 py-2 ${
              currentTab === "subscribed" ? "bg-blue-500" : "bg-gray-500"
            } text-white`}
            onClick={() => setCurrentTab("subscribed")}
          >
            Subscribed Topics
          </button>
        </div>
        <div className="flex justify-center items-center w-full mb-4">
          <input
            className="w-full lg:w-1/2 xl:w-1/3 h-10 px-3 rounded-full border-2 border-gray-300"
            type="search"
            name="search"
            placeholder="Search for a topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {currentTab === "created" && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
              onClick={handleToggleAddTopicModal}
            >
              Add Topic
            </button>
          )}
        </div>
        {showAddTopicModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-6 z-50">
            <div className="bg-blue-300 rounded-lg shadow-lg">
              <AddTopic handleToggleForm={handleToggleAddTopicModal} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 cursor-pointer ">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
