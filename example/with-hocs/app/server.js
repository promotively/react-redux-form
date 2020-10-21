/**
 * promotively/react-redux-data
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-data}
 */

/**
 * @see {@link https://github.com/facebook/react}
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/redux-thunk}
 * @see {@link https://github.com/expressjs/express}
 */

/* eslint-disable no-console */
/* eslint-disable promise/prefer-await-to-then */

import fs from 'fs';
import express from 'express';
import expressWinston from 'express-winston';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider as StoreProvider } from 'react-redux';
import winston from 'winston';
import { createReduxStore } from '../../common/helpers/store';
import { Layout } from '../../common/components/layout';
import { App } from '../components/app';

const store = createReduxStore();
const app = (
  <StoreProvider store={store}>
    <Layout title="promotively/react-redux-form Example (Using Higher Order Components With Server Side Rendering)">
      <App />
    </Layout>
  </StoreProvider>
);

const server = express();
const directory = process.cwd();
const bundle = fs.readFileSync(`${directory}/browser.js`).toString();
const html = fs
  .readFileSync(`${directory}/index.html`)
  .toString()
  .replace('./browser.js', 'http://localhost:3000/browser.js')
  .split('<main />');
const [header, footer] = html;

server.use(
  expressWinston.logger({
    colorize: true,
    expressFormat: true,
    format: winston.format.combine(winston.format.prettyPrint(), winston.format.simple()),
    meta: false,
    transports: [new winston.transports.Console()]
  })
);

server.get('/', (req, res) => {
  const jsx = renderToString(app);
  const state = `<script>window.REDUX_INITIAL_STATE = ${JSON.stringify(store.getState())};</script>`;

  return res.send(`${header}<main>${jsx}</main>${state}${footer}`);
});

server.get('/browser.js', (req, res) => res.send(bundle));

const port = 3000;
server.listen(port);

console.log(`info: Example file://${process.cwd()}/index.html`);
console.log(`info: Example (SSR) http://localhost:${port}/`);
