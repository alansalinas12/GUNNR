import { combineReducers } from 'redux';
import weapons from './reducers/weapons';
import authUser from './reducers/authUser';
import common from './reducers/common';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    weapons,
    authUser,
    common,
    router: routerReducer
});