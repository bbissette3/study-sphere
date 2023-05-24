import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  checkUserSubscription,
  addUserToTopic,
  removeUserFromTopic,
} from "../../store/slice/userTopicSlice";
import { fetchUserTopics } from "../../store/slice/topicSlice";

const SubscriptionButton = ({ topicId }) => {
  const dispatch = useDispatch();

  const topics = useSelector((state) => state.userTopic.topics);

  useEffect(() => {
    dispatch(checkUserSubscription(topicId));
  }, [dispatch, topicId]);

  const handleSubscription = () => {
    if (topics.includes(topicId)) {
      dispatch(removeUserFromTopic(topicId));
    } else {
      dispatch(addUserToTopic(topicId));
    }
  };

  return (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded"
      onClick={handleSubscription}
    >
      {topics.includes(topicId) ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscriptionButton;
