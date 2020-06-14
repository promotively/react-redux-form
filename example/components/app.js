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
import { ExampleFormContainer } from '../containers/example-form';
import { Header } from '../components/header';

export const App = () => (
  <>
    <Header />
    <ExampleFormContainer id="example-test-form" />
  </>
);
