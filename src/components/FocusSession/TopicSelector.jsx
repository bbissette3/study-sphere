import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserTopics,
  fetchUserSubscribedTopics,
} from "../../store/slice/topicSlice";

//sub component
import TopicResources from "./TopicResources";

const TopicSelector = ({ setSelectedTopic, selectedTopic, isActive }) => {
  const dispatch = useDispatch();

  const userTopics = useSelector((state) => state.topics.userTopics);
  const userSubscribedTopics = useSelector(
    (state) => state.topics.userSubscribedTopics
  );

  const [selectedUserTopic, setSelectedUserTopic] = useState("");
  const [selectedSubscribedTopic, setSelectedSubscribedTopic] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      await Promise.all([
        dispatch(fetchUserTopics()),
        dispatch(fetchUserSubscribedTopics()),
        setSelectedTopic(selectedTopic),
      ]);
    };

    fetchTopics();
  }, [dispatch, selectedTopic]);

  const handleUserTopicSelect = (e) => {
    setSelectedUserTopic(e.target.value);
    setSelectedSubscribedTopic("");
    const selectedTopic = userTopics.find(
      (topic) => topic.id === Number(e.target.value)
    );
    setSelectedTopic(selectedTopic);
  };

  const handleSubscribedTopicSelect = (e) => {
    setSelectedSubscribedTopic(e.target.value);
    setSelectedUserTopic("");
    const selectedTopic = userSubscribedTopics.find(
      (topic) => topic.id === Number(e.target.value)
    );
    setSelectedTopic(selectedTopic);
  };

  return (
    <div className="text-center">
      <h2 className="pb-2 text-darkGray font-semibold">
        Select a Topic you created!
      </h2>
      <div className="pb-4">
        <select
          value={selectedUserTopic}
          onChange={handleUserTopicSelect}
          disabled={!!selectedSubscribedTopic || isActive}
        >
          <option value="">Select a topic you created...</option>
          {userTopics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
      </div>
      <h2 className="pb-2 text-darkGray font-bold">OR</h2>
      <h2 className="pb-2 text-darkGray font-semibold">
        Select a Topic you subscribed to!
      </h2>
      <div className="pb-4">
        <select
          value={selectedSubscribedTopic}
          onChange={handleSubscribedTopicSelect}
          disabled={!!selectedUserTopic || isActive}
        >
          <option value="">Select a topic you subscribed...</option>
          {userSubscribedTopics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
      </div>
      <TopicResources
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
    </div>
  );
};

export default TopicSelector;
