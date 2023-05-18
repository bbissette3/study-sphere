import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

//sign up
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

//sign in
export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";

//current user
export const GET_CURRENT_USER = "GET_CURRENT_USER";

export const signupRequest = (userData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const response = await axios.post("/api/users/signup", userData);
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

export const signinRequest = (userData) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });

  try {
    const response = await axios.post("/api/users/login", userData);

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
    dispatch({ type: GET_CURRENT_USER, payload: response.data });

    dispatch(verifyToken());
  } catch (error) {
    dispatch({ type: SIGNIN_FAILURE, payload: error.message });
  }
};

export const verifyToken = () => async (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    try {
      const response = await axios.get("/api/users/verifyToken", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
    } catch (error) {
      localStorage.removeItem("accessToken");
      dispatch({ type: SIGNIN_FAILURE, payload: error.message });
    }
  } else {
    dispatch({ type: SIGNIN_FAILURE, payload: "No access token found" });
  }
};

export const getCurrentUser = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/users/verifyToken", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
