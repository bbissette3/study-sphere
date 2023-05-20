import { useState } from "react";
import AddTopic from "./AddTopic";

const Dashboard = () => {
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);

  const handleToggleAddTopicModal = () => {
    setShowAddTopicModal(!showAddTopicModal);
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-5 mx-auto block"
        onClick={handleToggleAddTopicModal}
      >
        Add Topic
      </button>

      {showAddTopicModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-6">
          <div className="bg-blue-300 rounded-lg shadow-lg">
            <AddTopic handleToggleForm={handleToggleAddTopicModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
