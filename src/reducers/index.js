/**
 * promotively/react-redux-form
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-form}
 */

/**
 * @module reducers
 *
 * @see {@link https://github.com/reduxjs/redux}
 */

import { combineReducers } from 'redux';
import { formReducer } from './form';
import { inputReducer } from './input';

/**
 * The redux.js reducer function to handle any state mutations that are required for handling forms or inputs.
 *
 * @function
 * @param {object} state The current state inside the redux.js store.
 * @param {object} action The last redux.js action that was dispatched.
 * @returns {object} Deep clone of the existing state of the store with any mutations included.
 */
export const reducer = combineReducers({
  forms: formReducer,
  inputs: inputReducer
});
