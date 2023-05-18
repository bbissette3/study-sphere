// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8888";

// export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
// export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
// export const SIGNIN_FAILURE = "SIGNIN_FAILURE";

// export const signinRequest = (userData) => async (dispatch) => {
//   dispatch({ type: SIGNIN_REQUEST });

//   try {
//     const response = await axios.post("/api/users/login", userData);

//     const { accessToken } = response.data;
//     localStorage.setItem("accessToken", accessToken);

//     dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: SIGNIN_FAILURE, payload: error.message });
//   }
// };
import axios from "axios";

export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
import { GET_CURRENT_USER } from "./currentUserAction";

axios.defaults.baseURL = "http://localhost:8888";

export const signinRequest = (userData) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });

  try {
    const response = await axios.post("/api/users/login", userData);

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
    dispatch({ type: GET_CURRENT_USER, payload: response.data });
    //dispatch verifyToken for persistent user
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
