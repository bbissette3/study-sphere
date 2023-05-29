import { useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { addFocusSession } from "../../store/slice/focusSessionSlice";

const AddFocusSession = ({
  selectedTopic,
  setShowAddSession,
  timerDuration,
  setSelectedTopic,
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
    setSelectedTopic("");
    setShowAddSession(false);
  };

  return (
    <form onSubmit={handleSubmitFocusSession} className="text-center pb-4">
      <label className="block text-darkGray font-semibold">
        What did you learn?
        <textarea
          type="text"
          value={learned}
          onChange={handleLearnedChange}
          className="mt-2 block w-full p-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 h-24"
        />
      </label>
      <label className="block mt-4 text-darkGray font-semibold">
        What do you want to learn next?
        <textarea
          type="text"
          value={toLearn}
          onChange={handleToLearnChange}
          className="mt-2 block w-full p-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 h-24"
        />
      </label>
      <button
        type="submit"
        className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white px-4 py-2 rounded transition-colors duration-300 mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default AddFocusSession;
