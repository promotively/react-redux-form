/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import createReduxStore from './store';

const store = createReduxStore();
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const [node] = document.getElementsByTagName('main');

render(app, node);
