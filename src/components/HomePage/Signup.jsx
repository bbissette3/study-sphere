import { useState } from "react";

//redux hooks
import { useDispatch } from "react-redux";
import { signupRequest } from "../../store/actions/signupAction";

const Signup = ({ handleToggleForm }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Dispatch the sign-up action with the form data
    dispatch(signupRequest({ username, email, password }));

    // Clear form fields
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Sign up</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Signup
        </button>
      </form>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleToggleForm}
      >
        Already have an account? Login
      </button>
    </>
  );
};

export default Signup;
