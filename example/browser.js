/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import createReactApp from './app';
import createReduxStore from './store';
import { render } from 'react-dom';

const store = createReduxStore();
const app = createReactApp(store);
window.store=store;
render(app, document.getElementsByTagName('main')[0]);
