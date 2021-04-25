import {createStore, combineReducers, applyMiddleware} from 'redux';
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import friendsReducer from './friendsReducer';
import postsReducer from './postsReducer';
import newsReducer from './newsReducer';
import musicReducer from './musicReducer';
import messageReducer from './messageReducer';

let reducers = combineReducers({
    usersPage: usersReducer,
    authPage: authReducer,
    profilePage: profileReducer,
    friendsPage: friendsReducer,
    postsPage: postsReducer, 
    newsPage: newsReducer,
    musicPage: musicReducer,
    messagesPage: messageReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;


export default store;

