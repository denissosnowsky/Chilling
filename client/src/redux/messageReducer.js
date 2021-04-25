import { messageAPI } from "../api/api";

const GET_MENU_MESSAGE = 'GET_MENU_MESSAGE';
const IS_FETCHING_MENU = 'IS_FETCHING_MENU';
const GET_MESSAGE = 'GET_MESSAGE';
const GET_SPEAKERS = 'GET_SPEAKERS';
const CREATE_DIALOG = 'CREATE_DIALOG';
const ID_DIALOG = 'ID_DIALOG';
const SET_TEMP_PIC = 'SET_TEMP_PIC';
const IS_TEMP_PIC = 'IS_TEMP_PIC';
const SET_TEMP_MESSAGE = 'SET_TEMP_MESSAGE';
const IS_TEMP_MESSAGE = 'IS_TEMP_MESSAGE';
const MENU_COUNT = 'MENU_COUNT';
const MESSAGES_COUNT = 'MESSAGES_COUNT';
const SHOULD_UPDATE = 'SHOULD_UPDATE';
const IS_FETCHING_LOAD_MESSAGE = 'IS_FETCHING_LOAD_MESSAGE';
const IS_FETCHING_MESSAGES = 'IS_FETCHING_MESSAGES';
const IS_FETCHING_LOAD_BTN_MENU = 'IS_FETCHING_LOAD_BTN_MENU';
const SET_DIALOG_ID = 'SET_DIALOG_ID';


const initialState = {
    menuMessage: [],
    messages: [],
    isFetchingMenu: true,
    speakers: [],
    isFetchingD: false,
    dialogId: '',
    tempPic: '',
    isTempPic: false,
    isTempMessage: false,
    menuCount: 0,
    messageCount: 0,
    portion: 10,
    portionMessages: 20,
    shouldUpadate: true, 
    isFetchingLoadMessage: false,
    isFetchingMessages: true,
    isFetchingLoadMenu: false,
    foundId: 1
};

const messageReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_MENU_MESSAGE:
            return {
                ...state,
                menuMessage: action.menu
            }
        case GET_MESSAGE:
            return{
                ...state,
                messages: action.messages
            }
        case IS_FETCHING_MENU:
            return {
                ...state,
                isFetchingMenu: action.isFetching
            }
        case GET_SPEAKERS:
            return {
                ...state,
                speakers: action.speakers
            }
        case CREATE_DIALOG:
            return{
                ...state,
                isFetchingD: action.isFetching
            }
        case ID_DIALOG:
            return{
                ...state,
                dialogId: action.id
            }
        case SET_TEMP_PIC:
            return{
                ...state,
                tempPic: action.img
            }
        case IS_TEMP_PIC:
            return{
                ...state,
                isTempPic: action.isFetching
            }
        case SET_TEMP_MESSAGE: {
                let array = [...state.messages];
                array.unshift(action.message);
                return{
                    ...state, 
                    messages: [...array]
                }
            }
        case IS_TEMP_MESSAGE:
            return{
                ...state,
                isTempMessage: action.isFetching
            }
        case MENU_COUNT:
            return{
                ...state,
                menuCount: action.count
            }
        case MESSAGES_COUNT:
            return{
                ...state,
                messageCount: action.count
            }
        case SHOULD_UPDATE:
            return {
                ...state,
                shouldUpadate: action.isFetching
            }
        case IS_FETCHING_LOAD_MESSAGE:
            return{
                ...state,
                isFetchingLoadMessage: action.isFetching
            }
        case IS_FETCHING_MESSAGES:
            return{
                ...state,
                isFetchingMessages: action.isFetching
            }
        case IS_FETCHING_LOAD_BTN_MENU:
            return{
                ...state,
                isFetchingLoadMenu: action.isFetching
            }
        case SET_DIALOG_ID:
            return{
                ...state,
                foundId: action.id
            }
        default: 
            return state;
    }
};

export const setDialogId = (id) => {
    return {type: SET_DIALOG_ID, id}
};

export const fetchingMessages = (isFetching) => {
    return {type: IS_FETCHING_MESSAGES, isFetching}
};

export const fetchingLoadMenu = (isFetching) => {
    return {type: IS_FETCHING_LOAD_BTN_MENU, isFetching}
};

export const fetchingLoadMessage = (isFetching) => {
    return {type: IS_FETCHING_LOAD_MESSAGE, isFetching}
};

export const shouldUpadateFunc = (isFetching) => {
    return {type: SHOULD_UPDATE, isFetching}
};

export const countMessages = (count) => {
    return {type: MESSAGES_COUNT, count}
};

export const countMenu = (count) => {
    return {type: MENU_COUNT, count}
};

export const setIsTempMessage = (isFetching) => {
    return {type: IS_TEMP_MESSAGE, isFetching}
};

export const setTempMessage = (message) => {
    return {type: SET_TEMP_MESSAGE, message}
};

export const setIsTempPic = (isFetching) => {
    return {type: IS_TEMP_PIC, isFetching}
};

export const setTempPict = (img) => {
    return {type: SET_TEMP_PIC, img}
};

export const getDialogId = (id) => {
    return {type: ID_DIALOG, id}
};

export const isFetchingDialog = (isFetching) => {
    return {type: CREATE_DIALOG, isFetching}
};

export const getSpeakers = (speakers) => {
    return {type: GET_SPEAKERS, speakers}
};

export const getMenuMessage = (menu) => {
    return {type: GET_MENU_MESSAGE, menu}
};

export const isFetchingMenu = (isFetching) => {
    return {type: IS_FETCHING_MENU, isFetching}
};

export const getMessges = (messages) => {
    return {type: GET_MESSAGE, messages}
};

export const getMessagesMenuThunk = (portion, currentPage) => async (dispatch) => {
    dispatch(isFetchingMenu(true));
    const res = await messageAPI.getMessagesMenu(portion, currentPage);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(isFetchingMenu(false));
    } else {
        dispatch(getMenuMessage(res.dialogs));
        dispatch(countMenu(res.count));
        dispatch(isFetchingMenu(false));
    };
};

export const getMessagesMenuThunkUpdate = (portion, currentPage) => async (dispatch) => {
    const res = await messageAPI.getMessagesMenu(portion, currentPage);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(fetchingLoadMenu(false));
    } else {
        dispatch(getMenuMessage(res.dialogs));
        dispatch(countMenu(res.count));
        dispatch(fetchingLoadMenu(false));
    };
};

export const getMessagesThunk = (id, portion, currentPage) => async (dispatch) => {
    dispatch(fetchingMessages(true));
    const res = await messageAPI.getMessages(id, portion, currentPage);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(fetchingMessages(false));
        dispatch(fetchingLoadMessage(false));
        dispatch(setIsTempMessage(false));
        dispatch(setDialogId(0));
    } else {
        dispatch(fetchingMessages(false));
        dispatch(getMessges(res.allMessages));
        dispatch(getSpeakers(res.speakers));
        dispatch(setIsTempMessage(false));
        dispatch(countMessages(res.count));
        dispatch(fetchingLoadMessage(false));
        dispatch(setDialogId(res.foundId));
    };
};

//thunk used while adding new messages, so that the spinner wasn't used in this case
export const getMessagesThunkUpdate = (id, portion, currentPage) => async (dispatch) => {
    const res = await messageAPI.getMessages(id, portion, currentPage);
    if(res.resultCode === 0){
        console.log(res.message);
        dispatch(fetchingMessages(false));
        dispatch(fetchingLoadMessage(false));
        dispatch(setIsTempMessage(false));
        dispatch(setDialogId(0));
    } else {
        dispatch(getMessges(res.allMessages));
        dispatch(getSpeakers(res.speakers));
        dispatch(setIsTempMessage(false));
        dispatch(countMessages(res.count));
        dispatch(fetchingLoadMessage(false));
        dispatch(setDialogId(res.foundId));
    };
};

export const addMessageThunk = (img, text, to, id, portion, currentPage) => async (dispatch) => {
    const res = await messageAPI.addMesagge(img, text, to);
    if(res.resultCode === 0){
        console.log(res.message);
    } else {
        dispatch(getMessagesThunkUpdate(id, portion, currentPage));
    };
};

export const createDialog = (to) => async (dispatch) => {
    const res = await messageAPI.createDialog(to);
    if(res.resultCode === 0){
        console.log(res.message);
    } else {
        dispatch(getDialogId(res));
        dispatch(isFetchingDialog(true));
    };
};


export default messageReducer;


