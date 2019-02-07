/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import React from 'react';

const InfoBox = (props) => (
  <div style={{ border: '1px solid #000', marginRight: '5px', padding: '5px' }}>
    {props.name}: {props.value ? 'Yes' : 'No'}
  </div>
);

export default InfoBox;
