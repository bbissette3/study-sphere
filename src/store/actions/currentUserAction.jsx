import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";

export const GET_CURRENT_USER = "GET_CURRENT_USER";

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
