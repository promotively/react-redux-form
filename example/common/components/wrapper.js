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

export const Wrapper = props => {
  const { children } = props;

  return (
    <div
      style={{
        border: '1px solid #000',
        borderRadius: '4px',
        fontSize: '14px',
        marginBottom: '10px',
        padding: '10px'
      }}
    >
      {children}
    </div>
  );
};
