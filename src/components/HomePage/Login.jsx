//react
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//redux
import { signinRequest } from "../../store/actions/signinAction";
import { useSelector } from "react-redux";

const Login = ({ handleToggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser.id) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("No credentials provided!");
    }
    // Dispatch the sign-in action with the form data
    await dispatch(signinRequest({ email, password }));

    // Clear form fields
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
