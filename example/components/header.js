/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import React from 'react';
import Alert from './alert';
import GitHubLink from './github-link';
import WebLink from './web-link';

const Header = () => (
  <div style={{ position: 'relative' }}>
    <WebLink />
    <GitHubLink project="react-redux-form" />
    <h1 style={{ marginTop: 0 }}>react-redux-form Example</h1>
    <div
      style={{
        padding: '10px',
        position: 'absolute',
        right: '-20px',
        top: '-20px'
      }}
    >
      <Alert type="warn">
        Tip: React Developer Tools, Redux Dev Tools and Source Maps are all enabled in this example.
      </Alert>
    </div>
    <p>
      This is an example of a react.js/redux.js web application using the{' '}
      <a href="https://github.com/promotively/react-redux-form">@promotively/react-redux-form</a> library to build a
      full featured form.
    </p>
    <p>
      <a href="https://promotively-react-redux-form.s3-us-west-1.amazonaws.com/docs/index.html">
        Read the documentation
      </a>{' '}
      for more details including a simple step by step guide.
    </p>
  </div>
);

export default Header;
