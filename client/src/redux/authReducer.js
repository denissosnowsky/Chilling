import { authAPI } from "../api/api";

const INIT_DATA_AUTH = "INIT_DATA_AUTH";
const CONF_REGIST = "CONF_REGIST";
const IS_FETCHING_AUTH = "IS_FETCHING_AUTH";
const LOGOUT_AUTH = "LOGOUT_AUTH";
const IS_INITIALIZED = "IS_INITIALIZED";
const MESSAGE_AUTH = "MESSAGE_AUTH";
const MESSAGE_OUT = "MESSAGE_OUT";
const CHANGE_IMG = "CHANGE_IMG";

const initialState = {
  userId: null,
  order: null,
  token: null,
  sImg: null,
  isLogged: false,
  isRegistered: false,
  isFetching: false,
  registrationMessage: "",
  isInitialized: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DATA_AUTH:
      return {
        ...state,
        userId: action.userId,
        sImg: action.sImg,
        order: action.order,
        token: action.token,
        isLogged: true,
      };
    case CONF_REGIST:
      return {
        ...state,
        isRegistered: true,
      };
    case LOGOUT_AUTH:
      localStorage.removeItem("token");
      return {
        ...state,
        isLogged: false,
        isRegistered: false,
        userId: null,
        sImg: null,
        order: null,
        token: null,
      };
    case IS_FETCHING_AUTH:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case IS_INITIALIZED:
      return {
        ...state,
        isInitialized: true,
      };
    case MESSAGE_AUTH:
      return {
        ...state,
        registrationMessage: action.message,
      };
    case MESSAGE_OUT:
      return {
        ...state,
        registrationMessage: "",
      };
    case CHANGE_IMG:
      return {
        ...state,
        sImg: action.img,
      };
    default:
      return state;
  }
};

export const changeImageHeader = (img) => {
  return { type: CHANGE_IMG, img };
};

export const messageOut = () => {
  return { type: MESSAGE_OUT };
};

export const message_auth = (message) => {
  return { type: MESSAGE_AUTH, message };
};

export const logoutAuth = () => {
  return { type: LOGOUT_AUTH };
};

export const isInitializedAuth = () => {
  return { type: IS_INITIALIZED };
};

export const initLoggedData = (userId, sImg, token, order) => {
  return { type: INIT_DATA_AUTH, userId, sImg, token, order };
};

export const confirmRegistration = () => {
  return { type: CONF_REGIST };
};

export const fetchingToggleAuth = (isFetching) => {
  return { type: IS_FETCHING_AUTH, isFetching };
};

export const loginThunk =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(fetchingToggleAuth(true));
    const res = await authAPI.login(email, password);
    dispatch(fetchingToggleAuth(false));
    if (res.resultCode === 1) {
      dispatch(initLoggedData(res.userId, res.sImg, res.token, res.order));
      localStorage.setItem("token", res.token);
    } else {
      console.log(res.message);
      dispatch(message_auth(res.message));
    }
  };

export const registerThunk =
  ({ email, password, name, surname, city }) =>
  async (dispatch) => {
    dispatch(fetchingToggleAuth(true));
    const res = await authAPI.register(email, password, name, surname, city);
    dispatch(fetchingToggleAuth(false));
    if (res.resultCode === 1) {
      dispatch(confirmRegistration());
      dispatch(message_auth(res.message));
    } else {
      console.log(res.message);
      dispatch(message_auth(res.message));
    }
  };

export const verifyAuthThunk = () => async (dispatch) => {
  dispatch(fetchingToggleAuth(true));
  const res = await authAPI.verify();
  dispatch(fetchingToggleAuth(false));
  if (res.resultCode === 1) {
    dispatch(initLoggedData(res.userId, res.sImg, res.token, res.order));
    localStorage.setItem("token", res.token);
  } else {
    console.log(res.message);
    localStorage.removeItem("token");
  }
  dispatch(isInitializedAuth());
};

export default authReducer;
