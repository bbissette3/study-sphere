import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import {
  checkUserSubscription,
  addUserToTopic,
  removeUserFromTopic,
} from "../../store/slice/userTopicSlice";

const SubscriptionButton = ({ topicId }) => {
  const dispatch = useDispatch();

  const subscriptionStatus = useSelector(
    (state) => state.userTopic.subscriptionStatus
  );

  const [isSubscribed, setIsSubscribed] = useState(subscriptionStatus[topicId]);

  useEffect(() => {
    setIsSubscribed(subscriptionStatus[topicId]);
  }, [subscriptionStatus, topicId]);

  useEffect(() => {
    dispatch(checkUserSubscription(topicId));
  }, [dispatch, topicId]);

  const handleSubscription = () => {
    setIsSubscribed(!isSubscribed);
    if (isSubscribed) {
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
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscriptionButton;
