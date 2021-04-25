import { profileAPI } from "../api/api";
import { changeImageHeader } from "./authReducer";

const SET_USER = 'SET_USER';
const IS_FETCHING_PROFILE = 'IS_FETCHING';
const SAVE_SMALL_PHOTO = 'SAVE_SMALL_PHOTO';
const SAVE_BIG_PHOTO = 'SAVE_BIG_PHOTO';
const SET_STATUS = 'SET_STATUS';
const SET_CITY = 'SET_CITY';
const SET_BIRTH = 'SET_BIRTH';
const SET_EDUCATION = 'SET_EDUCATION';
const SET_PHONE = 'SET_PHONE';
const SET_BOOK = 'SET_BOOK';
const IS_FETCHING_SIMAGE = 'IS_FETCHING_SIMAGE';
const IS_FETCHING_BIMAGE = 'IS_FETCHING_BIMAGE';


const initialState = {
    user: {},
    isFetching: true,
    isFetchingSImage: false,
    isFetchingBImage: false
};

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case IS_FETCHING_PROFILE:
            return{
                ...state,
                isFetching: action.isFetching
            }
        case SAVE_SMALL_PHOTO:
            return{
                ...state,
                user: {...state.user, sImg: action.smallImg}
            }
        case SAVE_BIG_PHOTO:
            return{
                ...state, 
                user: {...state.user, lImg: action.bigImg}
            }
        case SET_STATUS:
            return{
                ...state,
                user: {...state.user, status: action.status}
            }
        case SET_CITY:
            return{
                ...state,
                user: {...state.user, city: action.city}
            }
        case SET_BIRTH:
            return{
                ...state,
                user: {...state.user, birth: action.birth}
            }
        case SET_EDUCATION:
            return{
                ...state,
                user: {...state.user, education: action.education}
            }
        case SET_PHONE:
            return{
                ...state,
                user: {...state.user, phone: action.phone}
            }
        case SET_BOOK:
            return{
                ...state,
                user: {...state.user, book: action.book}
            }
        case IS_FETCHING_SIMAGE:
            return{
                ...state,
                isFetchingSImage: action.isFetching
            }
        case IS_FETCHING_BIMAGE:
            return {
                ...state, 
                isFetchingBImage: action.isFetching
            }
        default: 
            return state;
    }
};


export const fetchingBImg = (isFetching) => {
    return {type: IS_FETCHING_BIMAGE, isFetching}
};

export const fetchingSImg = (isFetching) => {
    return {type: IS_FETCHING_SIMAGE, isFetching}
};

export const setStatus = (status) => {
    return {type: SET_STATUS, status}
};

export const setCity = (city) => {
    return {type: SET_CITY, city}
};

export const setBirth = (birth) => {
    return {type: SET_BIRTH, birth}
};

export const setEducation = (education) => {
    return {type: SET_EDUCATION, education}
};

export const setPhone = (phone) => {
    return {type: SET_PHONE, phone}
};

export const setBook = (book) => {
    return {type: SET_BOOK, book}
};

export const saveSmallPhotoProfile = (smallImg) => {
    return {type: SAVE_SMALL_PHOTO, smallImg}
};

export const saveBigPhotoProfile = (bigImg) => {
    return {type: SAVE_BIG_PHOTO, bigImg}
};

export const getUser = (user) => {
    return {type: SET_USER, user}
};

export const fetchingToggle = (isFetching) => {
    return {type: IS_FETCHING_PROFILE, isFetching}
};

export const getProfileThunk = (id) => async (dispatch) => {
    dispatch(fetchingToggle(true));
    const res = await profileAPI.getProfile(id);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(fetchingToggle(false));
    } else {
        dispatch(getUser(res));
        dispatch(fetchingToggle(false));
    };
};

export const savePhotoThunk = (smallImg) => async (dispatch) => {
    dispatch(fetchingSImg(true));
    const res = await profileAPI.saveSmallPhoto(smallImg);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(fetchingSImg(false));
    } else {
        dispatch(saveSmallPhotoProfile(res.imageName));
        dispatch(changeImageHeader(res.imageName));  //this actionCreator is from authReducer
        dispatch(fetchingSImg(false));
    };
};

export const saveBigPhotoThunk = (bigImg) => async (dispatch) => {
    dispatch(fetchingBImg(true));
    const res = await profileAPI.saveBigPhoto(bigImg);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(fetchingBImg(false));
    } else {
        dispatch(saveBigPhotoProfile(res.imageName));
        dispatch(fetchingBImg(false));
    };
};

export const saveStatus = (status) => async (dispatch) => {
    const res = await profileAPI.saveStatus(status);
    if(res.resultCode === 0){
        console.log(res.message);
    } else {
        dispatch(setStatus(res.status));
    };
};

export const saveCity = (city) => async (dispatch) => {
    const res = await profileAPI.saveCity(city);
    if(res.resultCode === 0){
        console.log(res.message);
    } else {
        dispatch(setCity(res.city));
    };
};

export const saveBirth = (birth) => async (dispatch) => {
    const res = await profileAPI.saveBirth(birth);
    if(res.resultCode === 0){
        console.log(res.message);
    } else {
        dispatch(setBirth(res.birth));
    };
};

export const saveEducation = (education) => async (dispatch) => {
    const res = await profileAPI.saveEducation(education);
    if(res.resultCode === 0){
        console.log(res.message);
    } else {
        dispatch(setEducation(res.education));
    };
};

export const savePhone = (phone) => async (dispatch) => {
    const res = await profileAPI.savePhone(phone);
    if(res.resultCode === 0){
        console.log(res.message);
    } else {
        dispatch(setPhone(res.phone));
    };
};

export const saveBook = (book) => async (dispatch) => {
    const res = await profileAPI.saveBook(book);
    if(res.resultCode === 0){
        console.log(res.message);
    } else {
        dispatch(setBook(res.book));
    };
};

export default profileReducer;