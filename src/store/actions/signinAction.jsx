import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";

export const signinRequest = (userData) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });

  try {
    const response = await axios.post("/api/users/login", userData);

    const { accessToken, message } = response.data;
    localStorage.setItem("accessToken", accessToken);

    dispatch({ type: SIGNIN_SUCCESS, payload: { accessToken } });
    if (message) {
      console.log(message); // Log the message if it exists
    } else {
      alert("User logged in successfully!");
    }
  } catch (error) {
    dispatch({ type: SIGNIN_FAILURE, payload: error.message });
  }
};
