/**
 * promotively/react-redux-form
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-form}
 */

/* eslint-disable react/prop-types */

import React from 'react';

export const Label = props => {
  const { children, htmlFor } = props;

  return (
    <label htmlFor={htmlFor} style={{ display: 'block', paddingBottom: '10px', textTransform: 'capitalize' }}>
      {children}
    </label>
  );
};
