import { useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { addFocusSession } from "../../store/slice/focusSessionSlice";

const AddFocusSession = ({
  selectedTopic,
  setShowAddSession,
  timerDuration,
}) => {
  const [learned, setLearned] = useState("");
  const [toLearn, setToLearn] = useState("");

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLearnedChange = (e) => {
    setLearned(e.target.value);
  };

  const handleToLearnChange = (e) => {
    setToLearn(e.target.value);
  };

  const handleSubmitFocusSession = (e) => {
    e.preventDefault();

    dispatch(
      addFocusSession({
        userId: currentUser.id,
        topicId: selectedTopic.id,
        learned,
        toLearn,
        duration: timerDuration,
      })
    );

    setLearned("");
    setToLearn("");
    setShowAddSession(false);
  };

  return (
    <form onSubmit={handleSubmitFocusSession} className="text-center pb-4">
      <label className="block">
        What did you learn?
        <input
          type="text"
          value={learned}
          onChange={handleLearnedChange}
          className="mt-2 block w-full p-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 h-24"
        />
      </label>
      <label className="block mt-4">
        What do you want to learn next?
        <input
          type="text"
          value={toLearn}
          onChange={handleToLearnChange}
          className="mt-2 block w-full p-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 h-24"
        />
      </label>
      <button
        type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default AddFocusSession;
