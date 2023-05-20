//react
import { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { signup } from "../../store/slice/userSlice";

const Signup = ({ handleToggleForm }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (email === "" || username === "" || password === "") {
      alert("Please fill in all fields!");
    }

    // Dispatch the sign-up action with the form data
    await dispatch(signup({ email, username, password }));

    // Clear form fields
    setEmail("");
    setUsername("");
    setPassword("");
    alert("Account has been created");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Create an account</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Email address"
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
          Sign Up
        </button>
      </form>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleToggleForm}
      >
        Already have an account? Login!
      </button>
    </>
  );
};

export default Signup;
