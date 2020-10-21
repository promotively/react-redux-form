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
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

export const Meta = props => {
  const { data, onClick } = props;

  return data.map(item => (
    <div
      key={item.name}
      onClick={onClick}
      style={{
        border: '1px solid black',
        borderRadius: '4px',
        color: 'black',
        ...(item.value
          ? {
              background: 'black',
              color: '#fff'
            }
          : {}),
        fontSize: '14px',
        height: '34px',
        lineHeight: '34px',
        marginRight: '10px',
        ...(onClick ? { cursor: 'pointer' } : {}),
        padding: '0 5px',
        transition: 'all ease-in-out .2s'
      }}
    >
      {item.name}: {item.value ? 'Yes' : 'No'}
    </div>
  ));
};
