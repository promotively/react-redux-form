import { combineReducers } from 'redux';
import { formReducer } from './form';
import { formInputReducer } from './form-input';

export const reducer = combineReducers({
  forms: formReducer,
  inputs: formInputReducer
});
