/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import ExampleForm from '../containers/example-form';
import Header from '../components/header';
import React from 'react';

const App = () => (
  <React.Fragment>
    <Header />
    <ExampleForm id="example-test-form" />
  </React.Fragment>
);

export default App;
