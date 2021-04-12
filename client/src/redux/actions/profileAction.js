import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/ImageUpload";
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

export const updateProfileUser = ({ userData, avatar, auth, setOnEdit }) => async (dispatch) => {
  if (!userData.fullname)
    return dispatch({
      type: GLOBAL_TYPE.ALERT,
      payload: { error: "Please add your full name" },
    });

  if (userData.fullname.length > 25)
    return dispatch({
      type: GLOBAL_TYPE.ALERT,
      payload: { error: "Your full name is too long" },
    });

  if (userData.story.length > 200)
    return dispatch({
      type: GLOBAL_TYPE.ALERT,
      payload: { error: "Your story is too long" },
    });

  try {
    let media;

    dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: true } });

    if (avatar) media = await imageUpload([avatar]);

    const res = await patchDataAPI(
      "user",
      {
        ...userData,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    );

    dispatch({
      type: GLOBAL_TYPE.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
      },
    });

    setOnEdit(false)

    dispatch({
      type: GLOBAL_TYPE.ALERT,
      payload: { success: res.data.message },
    });

  } catch (error) {
    dispatch({
      type: GLOBAL_TYPE.ALERT,
      payload: { error: error.response.data.message },
    });
  }
};
