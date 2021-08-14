import { musicAPI } from "../api/api";

const GET_ALL_MUSIC = "GET_ALL_MUSIC";
const IS_FETCHING_ALL_MUSIC = "IS_FETCHING_ALL_MUSIC";
const GET_MY_MUSIC = "GET_MY_MUSIC";
const IS_FETCHING_MY_MUSIC = "IS_FETCHING_MY_MUSIC";
const SEARCH_MUSIC_ALL = "SEARCH_MUSIC_ALL";
const SEARCH_MUSIC_MY = "SEARCH_MUSIC_MY";
const SET_ALL_MY_MUSIC_COUNT = "SET_ALL_MY_MUSIC_COUNT";
const COUNT_ALL = "COUNT_ALL";
const COUNT_MY = "COUNT_MY";
const IS_FETCHING_ADD_SONG = "IS_FETCHING_ADD_SONG";
const IS_FETCHING_LOAD_BTN_MY = "IS_FETCHING_LOAD_BTN_MY";
const IS_FETCHING_LOAD_BTN_ALL = "IS_FETCHING_LOAD_BTN_ALL";
const IS_FETCHING_SEARCH_MUSIC = "IS_FETCHING_SEARCH_MUSIC";

const initialState = {
  allMusic: [],
  myMusic: [],
  isFetchingAll: true,
  isFetchingMy: true,
  searchedPhraseAll: "",
  searchedPhraseMy: "",
  myMusicCount: 0,
  allCount: 0,
  myCount: 0,
  portion: 10,
  isFetchingAddSong: [],
  isFetchingLoadBtnMy: false,
  isFetchingLoadBtnAll: false,
  isFetchingSearch: false,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MUSIC:
      return {
        ...state,
        allMusic: action.music,
      };
    case IS_FETCHING_ALL_MUSIC:
      return {
        ...state,
        isFetchingAll: action.isFetching,
      };
    case GET_MY_MUSIC:
      return {
        ...state,
        myMusic: action.music,
      };
    case IS_FETCHING_MY_MUSIC:
      return {
        ...state,
        isFetchingMy: action.isFetching,
      };
    case SEARCH_MUSIC_ALL:
      return {
        ...state,
        searchedPhraseAll: action.searchedPhrase,
      };
    case SEARCH_MUSIC_MY:
      return {
        ...state,
        searchedPhraseMy: action.searchedPhrase,
      };
    case SET_ALL_MY_MUSIC_COUNT:
      return {
        ...state,
        myMusicCount: action.count,
      };
    case COUNT_ALL:
      return {
        ...state,
        allCount: action.count,
      };
    case COUNT_MY:
      return {
        ...state,
        myCount: action.count,
      };
    case IS_FETCHING_ADD_SONG:
      return {
        ...state,
        isFetchingAddSong: action.isFetching
          ? [...state.isFetchingAddSong, action.id]
          : state.isFetchingAddSong.filter((id) => id != action.id),
      };
    case IS_FETCHING_LOAD_BTN_MY:
      return {
        ...state,
        isFetchingLoadBtnMy: action.isFetching,
      };
    case IS_FETCHING_LOAD_BTN_ALL:
      return {
        ...state,
        isFetchingLoadBtnAll: action.isFetching,
      };
    case IS_FETCHING_SEARCH_MUSIC:
      return {
        ...state,
        isFetchingSearch: action.isFetching,
      };
    default:
      return state;
  }
};

export const fetchingSearchMusic = (isFetching) => {
  return { type: IS_FETCHING_SEARCH_MUSIC, isFetching };
};

export const fetchingLoadBtnMy = (isFetching) => {
  return { type: IS_FETCHING_LOAD_BTN_MY, isFetching };
};

export const fetchingLoadBtnAll = (isFetching) => {
  return { type: IS_FETCHING_LOAD_BTN_ALL, isFetching };
};

export const fetchingAddSong = (isFetching, id) => {
  return { type: IS_FETCHING_ADD_SONG, isFetching, id };
};

export const countMy = (count) => {
  return { type: COUNT_MY, count };
};

export const countAll = (count) => {
  return { type: COUNT_ALL, count };
};

export const setAllMyMusicCount = (count) => {
  return { type: SET_ALL_MY_MUSIC_COUNT, count };
};

export const changeSearchedPhraseMusicAll = (searchedPhrase) => {
  return { type: SEARCH_MUSIC_ALL, searchedPhrase };
};

export const changeSearchedPhraseMusicMy = (searchedPhrase) => {
  return { type: SEARCH_MUSIC_MY, searchedPhrase };
};

export const getAllMusic = (music) => {
  return { type: GET_ALL_MUSIC, music };
};

export const getMyMusic = (music) => {
  return { type: GET_MY_MUSIC, music };
};

export const isFetchingAllMuisc = (isFetching) => {
  return { type: IS_FETCHING_ALL_MUSIC, isFetching };
};

export const isFetchingMyMuisc = (isFetching) => {
  return { type: IS_FETCHING_MY_MUSIC, isFetching };
};

export const getAllMusicThunk =
  (searchedPhrase, portion, currentPage, id) => async (dispatch) => {
    const res = await musicAPI.getAllMusic(
      searchedPhrase,
      portion,
      currentPage
    );
    if (res.resultCode === 0) {
      console.log(res.message);
      dispatch(isFetchingAllMuisc(false));
      dispatch(fetchingSearchMusic(false));
    } else {
      console.log("yes");
      dispatch(getAllMusic(res.allMusic));
      dispatch(countAll(res.count));
      dispatch(isFetchingAllMuisc(false));
      dispatch(fetchingAddSong(false, id));
      dispatch(fetchingLoadBtnAll(false));
      dispatch(fetchingSearchMusic(false));
    }
  };

export const getMyMusicThunk =
  (searchedPhrase, portion, currentPage, id) => async (dispatch) => {
    const res = await musicAPI.getMyMusic(searchedPhrase, portion, currentPage);
    if (res.resultCode === 0) {
      console.log(res.message);
      dispatch(isFetchingMyMuisc(false));
      dispatch(fetchingSearchMusic(false));
    } else {
      dispatch(setAllMyMusicCount(res.genCount));
      dispatch(getMyMusic(res.allMusic));
      dispatch(countMy(res.count));
      dispatch(isFetchingMyMuisc(false));
      dispatch(fetchingAddSong(false, id));
      dispatch(fetchingLoadBtnMy(false));
      dispatch(fetchingSearchMusic(false));
    }
  };

export const addMusic =
  (id, searchedPhrase, portion, currentPage) => async (dispatch) => {
    dispatch(fetchingAddSong(true, id));
    const res = await musicAPI.addMyMusic(id);
    if (res.resultCode === 0) {
      console.log(res.message);
      dispatch(fetchingAddSong(false, id));
    } else {
      console.log(res.message);
      dispatch(getAllMusicThunk(searchedPhrase, portion, currentPage, id));
    }
  };

export const deleteMusic =
  (id, searchedPhrase, portion, currentPage) => async (dispatch) => {
    dispatch(fetchingAddSong(true, id));
    const res = await musicAPI.deleteMyMusic(id);
    if (res.resultCode === 0) {
      console.log(res.message);
      dispatch(fetchingAddSong(false, id));
    } else {
      console.log(res.message);
      dispatch(getAllMusicThunk(searchedPhrase, portion, currentPage, id));
      dispatch(getMyMusicThunk(searchedPhrase, portion, currentPage, id));
    }
  };

export default musicReducer;
