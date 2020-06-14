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

export const Meta = props => (
  <div
    style={{
      border: '1px solid black',
      color: 'black',
      fontSize: '14px',
      marginRight: '5px',
      padding: '5px'
    }}
  >
    {props.name}: {props.value ? 'Yes' : 'No'}
  </div>
);
