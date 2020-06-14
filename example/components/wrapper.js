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

export const Wrapper = props => (
  <div
    style={{
      border: '1px solid #000',
      fontSize: '14px',
      padding: '10px'
    }}
  >
    {props.children}
  </div>
);
