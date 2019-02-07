/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import InfoBox from './info-box';
import React from 'react';

const FormInput = (props) => (
  <div style={{ marginTop: '10px' }}>
    <label style={{ display: 'block' }}>
      <div>{props.name}</div>
      <div style={{ display: 'flex' }}>
        <input
          id={`${props.formId}__${props.id}`}
          onBlur={props.onBlur}
          onChange={props.onChange}
          onFocus={props.onFocus}
          value={props.value}
          type={props.type}
          style={{ border: '1px solid #000', marginRight: '5px', padding: '5px', width: '200px' }}
        />
        <InfoBox name="Active" value={props.active} />
        <InfoBox name="Complete" value={props.complete} />
        <InfoBox name="Disabled" value={props.disabled} />
        <InfoBox name="Dirty" value={props.dirty} />
        <InfoBox name="Focus" value={props.focus} />
        <InfoBox name="Error" value={Boolean(props.error)} />
      </div>
    </label>
  </div>
);

export default FormInput;
