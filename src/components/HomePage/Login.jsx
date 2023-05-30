import { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../../store/slice/userSlice";

const Login = ({ handleToggleForm, handleToggleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = useSelector((state) => {
    return state.user.currentUser;
  });

  useEffect(() => {
    if (currentUser?.id) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("No credentials provided!");
      return;
    }

    await dispatch(signin({ email, password }));

    setEmail("");
    setPassword("");
    window.location.reload();
  };

  return (
    <>
      <button
        className="absolute top-4 right-4 text-lg font-bold text-darkGray"
        onClick={handleToggleModal}
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Log in</h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
          Login
        </button>
      </form>
      <button
        className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white px-4 py-2 rounded mt-4 transition-colors duration-300"
        onClick={handleToggleForm}
      >
        Don't have an account? Signup!
      </button>
    </>
  );
};

export default Login;
