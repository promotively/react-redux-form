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

export const Button = props => {
  const { disabled, style, ...buttonProps } = props;

  return (
    <button
      disabled={disabled}
      style={{
        ...(!disabled
          ? {
              background: '#000',
              border: '1px solid #000',
              color: '#fff'
            }
          : {
              background: '#fff',
              border: '1px solid #ccc',
              color: '#ccc'
            }),
        ...{
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '20px',
          padding: '10px'
        },
        ...style
      }}
      {...buttonProps}
    />
  );
};

Button.defaultProps = {
  type: 'submit'
};
