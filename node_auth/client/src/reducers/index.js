import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import commentsReducer from './comments';
import authenticationReducer from './authentication';
import usersReducer from './users';

const rootReducer = combineReducers({
  comments: commentsReducer,
  auth: authenticationReducer,
  users: usersReducer,
  form,
});

export default rootReducer;
