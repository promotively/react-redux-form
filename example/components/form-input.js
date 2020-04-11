/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import React from 'react';
import { FormInput } from '../../src';
import Meta from './meta';
import Wrapper from './wrapper';

const WrappedFormInput = props => (
  <div style={{ marginTop: '10px' }}>
    <Wrapper>
      <div style={{ paddingBottom: '10px' }}>
        This is a {props.name} form input. The boxes to the right of the form input display all the possible properties
        available for you to use in your own form input components.
      </div>
      <div style={{ display: 'flex' }}>
        <FormInput
          id={`${props.formId}__${props.id}`}
          onBlur={props.onBlur}
          onChange={props.onChange}
          onFocus={props.onFocus}
          value={props.value}
          type={props.type}
          style={{
            border: '1px solid #000',
            marginRight: '10px',
            padding: '5px',
            width: '200px'
          }}
        />
        <Meta name="Active" value={props.active} />
        <Meta name="Complete" value={props.complete} />
        <Meta name="Disabled" value={props.disabled} />
        <Meta name="Dirty" value={props.dirty} />
        <Meta name="Focus" value={props.focus} />
        <Meta name="Error" value={Boolean(props.error)} />
      </div>
    </Wrapper>
  </div>
);

export default WrappedFormInput;
