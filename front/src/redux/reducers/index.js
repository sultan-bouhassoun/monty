import {combineReducers} from 'redux';
import userLoggedReducer from './userLogged'

const combinedReducers = combineReducers({
    userLoggedReducer
})

export default combinedReducers;