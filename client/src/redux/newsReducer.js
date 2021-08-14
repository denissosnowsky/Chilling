import { newsAPI, postsAPI } from "../api/api";

const GET_NEWS = "GET_NEWS";
const IS_FETCHING_NEWS = "IS_FETCHING_NEWS";
const COUNT_NEWS = "COUNT_NEWS";
const IS_FETCHING_NEW_DELETE = "IS_FETCHING_NEW_DELETE";
const ADD_TEMP_LIKE_NEW = "ADD_TEMP_LIKE_NEW";
const ADD_TEMP_DISLIKE_NEW = "ADD_TEMP_DISLIKE_NEW";
const IS_FETCHING_LOAD_BTN_NEW = "IS_FETCHING_LOAD_BTN_NEW";

const initialState = {
  news: [],
  isFetching: true,
  count: 0,
  portion: 5,
  isFetchingNewDelete: [],
  isFetchingLoadBtn: false,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        news: action.news,
      };
    case IS_FETCHING_NEWS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case COUNT_NEWS:
      return {
        ...state,
        count: action.count,
      };
    case IS_FETCHING_NEW_DELETE:
      return {
        ...state,
        isFetchingNewDelete: action.isFetching
          ? [...state.isFetchingNewDelete, action.id]
          : state.isFetchingNewDelete.filter((id) => id != action.id),
      };
    case ADD_TEMP_LIKE_NEW:
      return {
        ...state,
        news: state.news.map((post) => {
          if (post._id == action.id) {
            return { ...post, liked: [...post.liked, action.myId] };
          } else {
            return { ...post };
          }
        }),
      };
    case ADD_TEMP_DISLIKE_NEW:
      return {
        ...state,
        news: state.news.map((post) => {
          if (post._id == action.id) {
            return {
              ...post,
              liked: post.liked.filter((id) => id != action.myId),
            };
          } else {
            return { ...post };
          }
        }),
      };
    case IS_FETCHING_LOAD_BTN_NEW:
      return {
        ...state,
        isFetchingLoadBtn: action.isFetching,
      };
    default:
      return state;
  }
};

export const fetchingLoadBtnNew = (isFetching) => {
  return { type: IS_FETCHING_LOAD_BTN_NEW, isFetching };
};

export const addTempLikeNew = (id, myId) => {
  return { type: ADD_TEMP_LIKE_NEW, id, myId };
};

export const addTempDislikeNew = (id, myId) => {
  return { type: ADD_TEMP_DISLIKE_NEW, id, myId };
};

export const fetchingNewDelete = (isFetching, id) => {
  return { type: IS_FETCHING_NEW_DELETE, isFetching, id };
};

export const countNews = (count) => {
  return { type: COUNT_NEWS, count };
};

export const getNews = (news) => {
  return { type: GET_NEWS, news };
};

export const isFetchingNews = (isFetching) => {
  return { type: IS_FETCHING_NEWS, isFetching };
};

export const getNewsThunk =
  (portion, currentPage, dial_id) => async (dispatch) => {
    const res = await newsAPI.getNews(portion, currentPage);
    if (res.resultCode === 0) {
      console.log(res.message);
      dispatch(isFetchingNews(false));
    } else {
      dispatch(getNews(res.news));
      dispatch(countNews(res.count));
      dispatch(isFetchingNews(false));
      dispatch(fetchingNewDelete(false, dial_id));
      dispatch(fetchingLoadBtnNew(false));
    }
  };

export const removeNewThunk =
  (id, to, portion, currentPage) => async (dispatch) => {
    dispatch(fetchingNewDelete(true, id));
    const res = await postsAPI.removePost(id);
    if (res.resultCode === 0) {
      console.log(res.message);
      dispatch(fetchingNewDelete(false, id));
    } else {
      dispatch(getNewsThunk(portion, currentPage));
    }
  };

export const likeNewThunk =
  (id, me, to, portion, currentPage) => async (dispatch) => {
    const res = await postsAPI.likePost(id, me);
    if (res.resultCode === 0) {
      console.log(res.message);
    } else {
      dispatch(getNewsThunk(portion, currentPage));
    }
  };

export const dislikeNewThunk =
  (id, me, to, portion, currentPage) => async (dispatch) => {
    const res = await postsAPI.dislikePost(id, me);
    if (res.resultCode === 0) {
      console.log(res.message);
    } else {
      dispatch(getNewsThunk(portion, currentPage));
    }
  };

export default newsReducer;
