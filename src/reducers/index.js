import { combineReducers } from 'redux';
import form from './form';
import formInput from './form-input';

export default combineReducers({
  forms: form,
  inputs: formInput
});
