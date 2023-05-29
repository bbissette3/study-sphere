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
      className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white px-4 py-2 rounded transition-colors duration-300"
      onClick={handleSubscription}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscriptionButton;
