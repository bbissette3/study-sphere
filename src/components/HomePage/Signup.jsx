// React
import { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../../store/slice/userSlice";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ handleToggleForm, handleToggleModal }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (
      error &&
      error.errors &&
      Array.isArray(error.errors) &&
      error.errors.length > 0
    ) {
      error.errors.forEach((err) => toast.error(err.msg));
    }
  }, [error]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (email === "" || username === "" || password === "") {
      toast.warn("Please fill in all fields!");
      return;
    }

    // Dispatch the sign-up action with the form data
    const signupResultAction = await dispatch(
      signup({ email, username, password })
    );

    if (signupResultAction.type === "user/signup/fulfilled") {
      // Dispatch the sign-in action
      await dispatch(signin({ email, password }));

      // Clear form fields
      setEmail("");
      setUsername("");
      setPassword("");
      window.location.reload();
    }
  };

  return (
    <>
      <button
        className="absolute top-4 right-4 text-lg font-bold text-darkGray"
        onClick={handleToggleModal}
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Create an account</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2 bg-white"
        />
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 bg-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2 bg-white"
        />
        <button
          type="submit"
          className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white px-4 py-2 rounded transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
      <button
        className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white px-4 py-2 rounded mt-4 transition-colors duration-300"
        onClick={handleToggleForm}
      >
        Already have an account? Login!
      </button>
    </>
  );
};

export default Signup;
