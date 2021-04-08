import { postDataAPI } from "../../utils/fetchData";
import { GLOBAL_TYPE } from "./globalType";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPE.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await postDataAPI("login", data);
    dispatch({
      type: GLOBAL_TYPE.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);
    dispatch({
      type: GLOBAL_TYPE.ALERT,
      payload: {
        success: res.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBAL_TYPE.ALERT,
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI("refresh_token");
      dispatch({
        type: GLOBAL_TYPE.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      dispatch({ type: GLOBAL_TYPE.ALERT, payload: {} });
    } catch (error) {
      dispatch({
        type: GLOBAL_TYPE.ALERT,
        payload: {
          error: error.response.data.message,
        },
      });
    }
  }
};
