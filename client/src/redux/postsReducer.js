import { postsAPI } from "../api/api";
import { getNewsThunk } from "./newsReducer";

const GET_POST = "GET_POST";
const IS_FETCHING_POST = "IS_FETCHING_POST";
const COUNT_POSTS = "COUNT_POSTS";
const IS_FETCHING_POST_ADD = "IS_FETCHING_POST_ADD";
const IS_FETCHING_POST_DELETE = "IS_FETCHING_POST_DELETE";
const ADD_TEMP_LIKE = "ADD_TEMP_LIKE";
const ADD_TEMP_DISLIKE = "ADD_TEMP_DISLIKE";
const IS_FETCHING_LOAD_BTN_POST = "IS_FETCHING_LOAD_BTN_POST";

const initialState = {
  posts: [],
  isFetching: true,
  count: 0,
  portion: 5,
  isFetchingPostAdd: false,
  isFetchingPostDelete: [],
  isFetchingLoadBtn: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        posts: action.posts,
      };
    case IS_FETCHING_POST:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case COUNT_POSTS:
      return {
        ...state,
        count: action.count,
      };
    case IS_FETCHING_POST_ADD:
      return {
        ...state,
        isFetchingPostAdd: action.isFetching,
      };
    case IS_FETCHING_POST_DELETE:
      return {
        ...state,
        isFetchingPostDelete: action.isFetching
          ? [...state.isFetchingPostDelete, action.id]
          : state.isFetchingPostDelete.filter((id) => id != action.id),
      };
    case ADD_TEMP_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id == action.id) {
            return { ...post, liked: [...post.liked, action.myId] };
          } else {
            return { ...post };
          }
        }),
      };
    case ADD_TEMP_DISLIKE:
      return {
        ...state,
        posts: state.posts.map((post) => {
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
    case IS_FETCHING_LOAD_BTN_POST:
      return {
        ...state,
        isFetchingLoadBtn: action.isFetching,
      };
    default:
      return state;
  }
};

export const fetchingLoadBtnPost = (isFetching) => {
  return { type: IS_FETCHING_LOAD_BTN_POST, isFetching };
};

export const addTempLike = (id, myId) => {
  return { type: ADD_TEMP_LIKE, id, myId };
};

export const addTempDislike = (id, myId) => {
  return { type: ADD_TEMP_DISLIKE, id, myId };
};

export const fetchingPostDelete = (isFetching, id) => {
  return { type: IS_FETCHING_POST_DELETE, isFetching, id };
};

export const fetchingPostAdd = (isFetching) => {
  return { type: IS_FETCHING_POST_ADD, isFetching };
};

export const countPosts = (count) => {
  return { type: COUNT_POSTS, count };
};

export const getPosts = (posts) => {
  return { type: GET_POST, posts };
};

export const isFatchingPost = (isFetching) => {
  return { type: IS_FETCHING_POST, isFetching };
};

export const getPostsThunk =
  (id, portion, currentPage, id_post) => async (dispatch) => {
    const res = await postsAPI.getPosts(id, portion, currentPage);
    if (res.resultCode === 0) {
      console.log(res.message);
      dispatch(isFatchingPost(false));
    } else {
      dispatch(getPosts(res.posts));
      dispatch(countPosts(res.count));
      dispatch(isFatchingPost(false));
      dispatch(fetchingPostAdd(false));
      dispatch(fetchingPostDelete(false, id_post));
      dispatch(fetchingLoadBtnPost(false));
    }
  };

export const addPostThunk =
  (img, text, to, portion, currentPage) => async (dispatch) => {
    dispatch(fetchingPostAdd(true));
    const res = await postsAPI.addPost(img, text, to);
    if (res.resultCode === 0) {
      console.log(res.message);
      dispatch(fetchingPostAdd(false));
    } else {
      dispatch(getPostsThunk(to, portion, currentPage));
    }
  };

export const removePostThunk =
  (id, to, portion, currentPage) => async (dispatch) => {
    dispatch(fetchingPostDelete(true, id));
    console.log(portion, currentPage);
    const res = await postsAPI.removePost(id);
    if (res.resultCode === 0) {
      console.log(res.message);
      dispatch(fetchingPostDelete(false, id));
    } else {
      dispatch(getPostsThunk(to, portion, currentPage, id));
    }
  };

export const likePostThunk =
  (id, me, to, portion, currentPage) => async (dispatch) => {
    const res = await postsAPI.likePost(id, me);
    if (res.resultCode === 0) {
      console.log(res.message);
    } else {
      dispatch(getPostsThunk(to, portion, currentPage));
    }
  };

export const dislikePostThunk =
  (id, me, to, portion, currentPage) => async (dispatch) => {
    const res = await postsAPI.dislikePost(id, me);
    if (res.resultCode === 0) {
      console.log(res.message);
    } else {
      dispatch(getPostsThunk(to, portion, currentPage));
    }
  };

export default postsReducer;
