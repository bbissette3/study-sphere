import { useState, useEffect } from "react";

//sub component
import ImageCarousel from "./ImageCarousel";
import Login from "./Login";
import Signup from "./Signup";

//redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  const navigate = useNavigate();

  const handleToggleModal = () => {
    setShowModal(!showModal);
    setActiveForm("login");
  };

  const handleToggleForm = () => {
    setActiveForm(activeForm === "login" ? "signup" : "login");
  };

  const currentUser = useSelector((state) => {
    return state.user.currentUser;
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <div className="bg-blue-950 flex flex-col items-center justify-center">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-lightBlue rounded-lg shadow-lg p-6 relative">
            {activeForm === "login" ? (
              <Login
                handleToggleForm={handleToggleForm}
                handleToggleModal={handleToggleModal}
              />
            ) : (
              <Signup
                handleToggleForm={handleToggleForm}
                handleToggleModal={handleToggleModal}
              />
            )}
          </div>
        </div>
      )}
      <div className="w-full h-1/2 mt-0 mb-4">
        <ImageCarousel />
      </div>
      <div className="text-center w-2/3 mx-auto px-5 py-5">
        <p className="text-white text-lg mb-6">
          Welcome to Study Sphere! Unlock your full learning potential with our
          dedicated platform that empowers you to take charge of your
          educational journey. Explore a wide range of topics, subscribe to
          users' topics, and access a vast library of educational resources.
          Participate in focused study sessions tailored to your needs, where
          you can choose a study time and concentrate on a specific topic.
          Connect with a diverse community of learners, exchange resources, and
          engage in interactive discussions. Embrace the opportunity to apply
          yourself, cultivate knowledge, and achieve your learning goals. Join
          our vibrant community today and embark on an enriching learning
          experience!
        </p>
        <button
          className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white px-4 py-2 rounded transition-colors duration-300"
          onClick={handleToggleModal}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
