import { getDataAPI } from "../../utils/fetchData";
import { GLOBAL_TYPE } from "../actions/globalType";

export const PROFILE_TYPE = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};

export const getProfileUsers = ({ users, id, auth }) => async (dispatch) => {
  if (users.every((user) => user._id !== id)) {
    try {
      dispatch({
        type: PROFILE_TYPE.LOADING,
        payload: true,
      });
      const res = await getDataAPI(`user/${id}`, auth.token);
      dispatch({
        type: PROFILE_TYPE.GET_USER,
        payload: res.data,
      });
      dispatch({
        type: PROFILE_TYPE.LOADING,
        payload: false,
      });
    } catch (error) {
      dispatch({
        type: GLOBAL_TYPE.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  }
};
