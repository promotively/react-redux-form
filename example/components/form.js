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

const Form = (props) => (
  <div>
    <div style={{ display: 'flex' }}>
      <InfoBox name="Active" value={props.active} />
      <InfoBox name="Dirty" value={props.dirty} />
      <InfoBox name="Complete" value={props.complete} />
      <InfoBox name="Disabled" value={props.disabled} />
      <InfoBox name="Error" value={Boolean(props.error)} />
      <InfoBox name="Loading" value={props.loading} />
    </div>
    <form {...props} />
  </div>
);

export default Form;
