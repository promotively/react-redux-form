/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer } from '../src';

const createReduxStore = () =>
  createStore(
    combineReducers({
      form: reducer
    }),
    composeWithDevTools(applyMiddleware(...[thunk]))
  );

export default createReduxStore;
