import { usersAPI } from "../api/api";

const SET_USERS = "SET_USERS";
const SET_USERS_COUNT = "SET_USERS_COUNT";
const SET_PAGE_USERS = "SET_PAGE_USERS";
const IS_FETCHING = "IS_FETCHING";
const CHANGE_PAGE_USERS = "CHANGE_PAGE_USERS";
const SEARCH_SMB = "SEARCH_SMB";

const initialState = {
  users: [],
  pageSize: 3,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  searchedPhrase: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case SET_PAGE_USERS:
      return {
        ...state,
        currentPage: action.page,
      };
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case CHANGE_PAGE_USERS:
      return {
        ...state,
        currentPage: action.pageNumber,
      };
    case SEARCH_SMB:
      return {
        ...state,
        searchedPhrase: action.searchedPhrase,
      };
    default:
      return state;
  }
};

export const changeSearchedPhrase = (searchedPhrase) => {
  return { type: SEARCH_SMB, searchedPhrase };
};

export const changePageUsers = (pageNumber) => {
  return { type: CHANGE_PAGE_USERS, pageNumber };
};

export const setUsers = (users) => {
  return { type: SET_USERS, users };
};
export const setUsersTotalCount = (count) => {
  return { type: SET_USERS_COUNT, count };
};
export const setPage = (page) => {
  return { type: SET_PAGE_USERS, page };
};
export const fetchingToggle = (isFetching) => {
  return { type: IS_FETCHING, isFetching };
};

//used for page updating and first rendering - - it adds big spinner
export const getUsersThunk =
  (pageNumber, pageSize, searchedPhrase) => async (dispatch) => {
    dispatch(fetchingToggle(true));
    const res = await usersAPI.getUsers(pageNumber, pageSize, searchedPhrase);
    dispatch(fetchingToggle(false));
    if (res.resultCode === 0) {
      console.log(res.message);
    } else {
      dispatch(setUsers(res.usersArray));
      dispatch(setUsersTotalCount(res.totalUsersCount));
    }
  };

//used for adding and deleting friends - doesn't add big spinner
export const getUsersThunkUpdate =
  (pageNumber, pageSize, searchedPhrase) => async (dispatch) => {
    const res = await usersAPI.getUsers(pageNumber, pageSize, searchedPhrase);
    if (res.resultCode === 0) {
      console.log(res.message);
    } else {
      dispatch(setUsers(res.usersArray));
      dispatch(setUsersTotalCount(res.totalUsersCount));
    }
  };

export default usersReducer;
