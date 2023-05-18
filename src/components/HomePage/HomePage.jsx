import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  const handleToggleModal = () => {
    setShowModal(!showModal);
    setActiveForm("login"); // Reset active form to login when opening the modal
  };

  const handleToggleForm = () => {
    setActiveForm(activeForm === "login" ? "signup" : "login");
  };

  return (
    <div className="bg-blue-950 min-h-screen flex items-center justify-center">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-blue-300 rounded-lg shadow-lg p-6">
            {activeForm === "login" ? (
              <Login handleToggleForm={handleToggleForm} />
            ) : (
              <Signup handleToggleForm={handleToggleForm} />
            )}
          </div>
        </div>
      )}
      <div className="text-center">
        <p className="text-white mb-6">
          Welcome to our app! We are dedicated to providing a platform that
          promotes collaborative learning and knowledge sharing. Our app brings
          together a diverse community of learners, educators, and
          professionals, enabling them to connect, exchange ideas, and support
          each other's educational journeys. With a user-friendly interface and
          a wealth of features, our app offers a seamless learning experience.
          Discover study groups, join interactive discussions, access a vast
          library of educational resources, and participate in focused study
          sessions to enhance your learning outcomes. Join our community today
          and unlock your full learning potential!
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleToggleModal}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
