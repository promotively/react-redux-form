/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import LoginForm from './containers/login-form';
import { Provider } from 'react-redux';
import React from 'react';

const createReactApp = (store) => (
  <Provider store={store}>
    <LoginForm id="login-form-demo" />
  </Provider>
);

export default createReactApp;
