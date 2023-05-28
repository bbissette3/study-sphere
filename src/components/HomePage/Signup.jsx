// React
import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { signup } from "../../store/slice/userSlice";

const Signup = ({ handleToggleForm, handleToggleModal }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (email === "" || username === "" || password === "") {
      alert("Please fill in all fields!");
      return;
    }

    // Dispatch the sign-up action with the form data
    await dispatch(signup({ email, username, password }));

    // Clear form fields
    alert("Account has been created");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <button
        className="absolute top-4 right-4 text-lg font-bold text-black"
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
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
      <button
        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mt-4 transition-colors duration-300"
        onClick={handleToggleForm}
      >
        Already have an account? Login!
      </button>
    </>
  );
};

export default Signup;
