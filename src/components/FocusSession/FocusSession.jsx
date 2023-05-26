import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserTopics,
  fetchUserSubscribedTopics,
} from "../../store/slice/topicSlice";

const FocusSession = () => {
  const dispatch = useDispatch();

  const userTopics = useSelector((state) => state.topics.userTopics);
  const userSubscribedTopics = useSelector(
    (state) => state.topics.userSubscribedTopics
  );

  const [selectedUserTopic, setSelectedUserTopic] = useState("");
  const [selectedSubscribedTopic, setSelectedSubscribedTopic] = useState("");
  const [timer, setTimer] = useState(1 * 60);
  const [timerDuration, setTimerDuration] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
    setSelectedSubscribedTopic(""); // Clear the other dropdown when one is selected
  };

  const handleSubscribedTopicSelect = (e) => {
    setSelectedSubscribedTopic(e.target.value);
    setSelectedUserTopic(""); // Clear the other dropdown when one is selected
  };

  const handleDurationSelect = (e) => {
    setTimerDuration(e.target.value);
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    setTimer(timerDuration * 60);
  };

  const handlePause = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimer(timerDuration * 60);
  };

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (!isPaused && timer !== 0) {
      clearInterval(interval);
    }

    if (timer === 0) {
      setIsActive(false);
      setIsPaused(false);
      alert("Time's up!");
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timer]);

  return (
    <div className="pl-64">
      <h2>Focus Session</h2>
      <h4>Select a topic you've created or subscribed to:</h4>

      <div className="topic-selection">
        <div>
          <select value={selectedUserTopic} onChange={handleUserTopicSelect}>
            <option value="">Select a topic you created...</option>
            {userTopics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        <div>
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
      </div>

      <div>
        <h4>Select timer duration:</h4>
        <select value={timerDuration} onChange={handleDurationSelect}>
          <option value={1}>1 minute</option>
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
        </select>
      </div>

      <div>
        <p>{`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${
          timer % 60
        }`}</p>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default FocusSession;
