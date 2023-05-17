import { useState } from "react";

const Login = ({ handleToggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic or submit form data
    console.log("Username:", username);
    console.log("Password:", password);
    // Clear form fields
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Login
        </button>
      </form>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleToggleForm}
      >
        Don't have an account? Signup!
      </button>
    </>
  );
};

export default Login;
