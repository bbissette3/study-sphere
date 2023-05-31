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

  //timer
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

  const sessions = useSelector((state) => state.focusSessions.focusSessions);

  useEffect(() => {
    const debouncedFetchUserFocusSessions = debounce((searchTerm) => {
      dispatch(fetchUserFocusSessions(searchTerm));
    }, 1000);

    if (searchTerm) {
      debouncedFetchUserFocusSessions(searchTerm);
    } else {
      dispatch(fetchUserFocusSessions(searchTerm));
    }
    // Cleanup function to cancel any outstanding debounced calls
    return () => {
      debouncedFetchUserFocusSessions.cancel();
    };
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
      <h2 className="text-center my-4 text-4xl font-bold text-lightBlue pr-64">
        Time to Focus!
      </h2>
      <div className="flex justify-center items-center w-full mb-4">
        <input
          className="w-full lg:w-1/2 xl:w-1/3 h-10 px-3 rounded-full border-2 border-gray-300"
          type="search"
          name="search"
          placeholder="Search your focus sessions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleToggleModal}
          className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white py-2 px-4 rounded ml-2"
        >
          Start Focus Session
        </button>
      </div>
      {showAddSession && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-6 z-50">
          <div className="bg-lightBlue rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={handleToggleModal}
              className="absolute top-4 right-4 text-lg font-bold"
            >
              X
            </button>
            <div className="text-center mb-8">
              <h2 className="text-xl text-darkGray font-bold">Focus Session</h2>
            </div>
            <TopicSelector
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              isActive={isActive}
            />
            <FocusTimer
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              setShowAddSession={setShowAddSession}
              isActive={isActive}
              setIsActive={setIsActive}
            />
          </div>
        </div>
      )}

      {sessionComponents.length > 0 ? (
        sessionComponents
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="mx-64 pt-5 text-2xl font-bold text-darkGray">
            You do not have any Focus Sessions yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default FocusSession;
