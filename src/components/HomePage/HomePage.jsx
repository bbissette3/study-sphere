import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    setShowModal(!showModal);
    setActiveForm("login"); // Reset active form to login when opening the modal
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
        <p className="text-white text-lg mb-6 pl-5 pr-5 pb-10">
          Welcome to Study Sphere! Unlock your full learning potential with our
          dedicated platform that empowers you to take charge of your
          educational journey. Connect with a diverse community of learners,
          educators, and professionals to exchange ideas, collaborate on
          projects, and support each other's growth. Discover study groups,
          engage in interactive discussions, access an extensive library of
          educational resources, and participate in focused study sessions
          tailored to your needs. Embrace the opportunity to apply yourself,
          cultivate knowledge, and achieve your learning goals. Join our vibrant
          community today and embark on an enriching learning experience!
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
