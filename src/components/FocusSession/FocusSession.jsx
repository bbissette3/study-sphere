import { useState } from "react";
import TopicSelector from "./TopicSelector";
import FocusTimer from "./FocusTimer";

const FocusSession = () => {
  const [showAddSession, setShowAddSession] = useState(false);

  const handleToggleModal = () => {
    setShowAddSession(!showAddSession);
  };

  return (
    <div className="pl-64">
      <div className="p-6">
        <button
          onClick={handleToggleModal}
          className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
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
            <TopicSelector />
            <FocusTimer />
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusSession;