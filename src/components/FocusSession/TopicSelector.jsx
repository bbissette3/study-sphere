import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserTopics,
  fetchUserSubscribedTopics,
} from "../../store/slice/topicSlice";

//sub component
import TopicResources from "./TopicResources";

const TopicSelector = () => {
  const dispatch = useDispatch();

  const userTopics = useSelector((state) => state.topics.userTopics);
  const userSubscribedTopics = useSelector(
    (state) => state.topics.userSubscribedTopics
  );

  const [selectedUserTopic, setSelectedUserTopic] = useState("");
  const [selectedSubscribedTopic, setSelectedSubscribedTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      await Promise.all([
        dispatch(fetchUserTopics()),
        dispatch(fetchUserSubscribedTopics()),
      ]);
    };

    fetchTopics();
  }, [dispatch]);

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
      <h2 className="pb-2 ">Select a Topic you created or subscribed to!</h2>
      <div className="pb-4">
        <select value={selectedUserTopic} onChange={handleUserTopicSelect}>
          <option value="">Select a topic you created...</option>
          {userTopics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
      </div>

      <div className="pb-4">
        <select
          value={selectedSubscribedTopic}
          onChange={handleSubscribedTopicSelect}
        >
          <option value="">Select a topic you subscribed...</option>
          {userSubscribedTopics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
      </div>
      <TopicResources selectedTopic={selectedTopic} />
    </div>
  );
};

export default TopicSelector;
