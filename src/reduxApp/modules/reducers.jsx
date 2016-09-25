import { combineReducers } from 'redux';
import { reducer as posts } from './posts';
import { reducer as auth } from './auth';

export default combineReducers({
    posts,
    auth,
});
