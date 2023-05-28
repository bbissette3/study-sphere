import { useState, useEffect } from "react";
import { debounce } from "lodash";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFocusSessions } from "../../store/slice/focusSessionSlice";

//sub Component
import TopicSelector from "./TopicSelector";
import FocusTimer from "./FocusTimer";
import FocusSessionDisplay from "./FocusSessionDisplay";

const FocusSession = () => {
  const [showAddSession, setShowAddSession] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const sessions = useSelector((state) => state.focusSessions.focusSessions);

  useEffect(() => {
    const debouncedFetchUserFocusSessions = debounce((searchTerm) => {
      dispatch(fetchUserFocusSessions(searchTerm));
    }, 1000);
    debouncedFetchUserFocusSessions(searchTerm);
  }, [dispatch, searchTerm]);

  const handleToggleModal = () => {
    setSelectedTopic("");
    setShowAddSession(!showAddSession);
  };

  // increase the session count for each topic
  const sessionComponents = sessions.map((session, index, arr) => {
    let sessionIndex =
      arr
        .slice(0, index)
        .filter(
          (prevSession) =>
            prevSession.topic && prevSession.topic.title === session.topic.title
        ).length + 1;

    return (
      <FocusSessionDisplay
        key={session.id}
        session={session}
        index={sessionIndex}
      />
    );
  });

  return (
    <div className="pl-64 pr-5">
      <h2 className="text-center my-4 text-2xl">Time to Focus!</h2>
      <div className="flex justify-center items-center w-full mb-4">
        <input
          className="w-full lg:w-1/2 xl:w-1/3 h-10 px-3 rounded-full border-2 border-gray-300"
          type="search"
          name="search"
          placeholder="Search for a topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleToggleModal}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
        >
          Start Focus Session
        </button>
      </div>

      {showAddSession && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-6 z-50">
          <div className="bg-blue-300 rounded-lg shadow-lg p-8 max-w-fit max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={handleToggleModal}
              className="absolute top-4 right-4 text-lg font-bold"
            >
              X
            </button>
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold">Focus Session</h2>
            </div>
            <TopicSelector
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
            <FocusTimer
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              setShowAddSession={setShowAddSession}
            />
          </div>
        </div>
      )}
      {sessionComponents}
    </div>
  );
};

export default FocusSession;
