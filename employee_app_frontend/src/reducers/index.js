import { combineReducers } from 'redux';
import deps from './departments';
import employees from './employees'
import messages from './messages';
import errors from './errors';


export default combineReducers({
  deps,
  employees,
  messages, 
  errors
});