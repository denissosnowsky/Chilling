import { friendsAPI } from "../api/api";
import { getUsersThunk, getUsersThunkUpdate } from "./usersReducer";

const SET_FRIENDS = 'SET_FRIENDS';
const IS_FETCHING_FRIENDS = 'IS_FETCHING';
const CHANGE_PAGE_FRIENDS = 'CHANGE_PAGE_FRIENDS';
const SET_FRIENDS_COUNT = 'SET_FRIENDS_COUNT';
const SEARCH_SMB_FRIENDS = 'SEARCH_SMB_FRIENDS';
const SET_ALL_FRIENDS = 'SET_ALL_FRIENDS';
const IS_FETCHING_IS_FRIEND = 'IS_FETCHING_IS_FRIEND';

const initialState = {
    friends: [],
    pageSize: 3,
    totalFriendsCount: 0,
    currentPage: 1,
    isFetching: true,
    searchedPhsrase: '',
    allFriends: 0,
    isFetchingIsFriend: []
}

const friendsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_FRIENDS:
            return{
                ...state,
                friends: action.friends
            }
        case IS_FETCHING_FRIENDS:
            return{
                ...state,
                isFetching: action.isFetching
            }
        case CHANGE_PAGE_FRIENDS:
            return{
                ...state,
                currentPage: action.pageNumber
            }
        case SET_FRIENDS_COUNT:
            return{
                ...state,
                totalFriendsCount: action.count 
            }
        case SEARCH_SMB_FRIENDS:
            return{
                ...state,
                searchedPhrase: action.searchedPhrase
            }
        case SET_ALL_FRIENDS:
            return{
                ...state,
                allFriends: action.count
            }
        case IS_FETCHING_IS_FRIEND:
            return{
                ...state,
                isFetchingIsFriend: action.isFetching
                ? [...state.isFetchingIsFriend, action.id]
                : state.isFetchingIsFriend.filter(id=>id!=action.id)
            }
        default:
            return state;
    };
};


export const fetchingIsFriend = (isFetching, id) => {
    return {type: IS_FETCHING_IS_FRIEND, isFetching, id}
};

export const changeSearchedPhraseFr = (searchedPhrase) => {
    return {type: SEARCH_SMB_FRIENDS, searchedPhrase}
};

export const changePageFriends = (pageNumber) => {
    return {type: CHANGE_PAGE_FRIENDS, pageNumber}
};

export const setFriendsTotalCount = (count) => {
    return {type: SET_FRIENDS_COUNT, count}
};

export const setAllFriends = (count) => {
    return {type: SET_ALL_FRIENDS, count}
};

export const getFriends = (friends) => {
    return {type: SET_FRIENDS, friends}
};

export const fetchingToggleFriends = (isFetching) => {
    return {type: IS_FETCHING_FRIENDS, isFetching}
};

//used for page updating and first rendering - it adds big spinner
export const getFriendsThunk = (pageNumber, pageSize, searchedPhrase) => async (dispatch) => {
    dispatch(fetchingToggleFriends(true));
    const res = await friendsAPI.getFriends(pageNumber, pageSize, searchedPhrase);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(fetchingToggleFriends(false));
    } else {
        dispatch(getFriends(res.friendsResponse));
        dispatch(setFriendsTotalCount(res.totalFriendsCount));
        dispatch(setAllFriends(res.allFriends));
        dispatch(fetchingToggleFriends(false));
    };
};

//used for adding and deleting friends - doesn't add big spinner
export const getFriendsThunkUpdate = (pageNumber, pageSize, searchedPhrase, id) => async (dispatch) => {
    const res = await friendsAPI.getFriends(pageNumber, pageSize, searchedPhrase);
    if(res.resultCode === 0){
        console.log(res.message);
    } else {
        dispatch(getFriends(res.friendsResponse));
        dispatch(setFriendsTotalCount(res.totalFriendsCount));
        dispatch(setAllFriends(res.allFriends));
        dispatch(fetchingIsFriend(false, id));
    };
};

export const addFriendThunk = (id, currentPageUsers, pageSizeUsers, currentPageFriends, pageSizeFriends, searchedPhrase) => async (dispatch) => {
    dispatch(fetchingIsFriend(true, id));
    const res = await friendsAPI.addFriend(id);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(fetchingIsFriend(false, id));
    } else {
        console.log(res);
        dispatch(getUsersThunkUpdate(currentPageUsers, pageSizeUsers, searchedPhrase));
        dispatch(getFriendsThunkUpdate(currentPageFriends, pageSizeFriends, searchedPhrase, id));
    };
};

export const removeFriendThunk = (id, currentPageUsers, pageSizeUsers, currentPageFriends, pageSizeFriends, searchedPhrase) => async (dispatch) => {
    dispatch(fetchingIsFriend(true, id));
    const res = await friendsAPI.removeFriend(id);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(fetchingIsFriend(false, id));
    } else {
        console.log(res);
        dispatch(getUsersThunkUpdate(currentPageUsers, pageSizeUsers, searchedPhrase));
        dispatch(getFriendsThunkUpdate(currentPageFriends, pageSizeFriends, searchedPhrase, id));
    };
};

export default friendsReducer;