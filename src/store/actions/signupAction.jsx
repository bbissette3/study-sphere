import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const signupRequest = (userData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const response = await axios.post("/api/users/signup", userData);
    dispatch({ type: SIGNUP_SUCCESS });
    console.log(response.data.message); // User registered successfully!
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};
