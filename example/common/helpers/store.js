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
 * @see {@link https://github.com/reduxjs/redux}
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer } from '../../../src';

const logger = createLogger();

export const createReduxStore = initialState =>
  createStore(
    combineReducers({
      form: reducer
    }),
    initialState,
    composeWithDevTools(applyMiddleware(...[logger, thunk]))
  );
