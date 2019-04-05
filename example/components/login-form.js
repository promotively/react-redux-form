/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import FormContainer from '../containers/form';
import FormInputContainer from '../containers/form-input';
import React from 'react';

const LoginForm = (props) => (
  <React.Fragment>
    <h1>react-redux-form Example</h1>
    <FormContainer id={props.id} onValidate={props.onValidateForm} onSubmit={props.onSubmit}>
      <FormInputContainer id="email" name="Email" defaultValue="name@example.com" onValidate={props.onValidateFormInput} type="email" />
      <FormInputContainer id="password" name="Password" onValidate={props.onValidateFormInput} type="password" />
      <button disabled={props.disabled} style={{
        background: '#fff',
        ...!props.disabled ? { border: '1px solid #000', color: '#000' } : { border: '1px solid #ccc', color: '#ccc' },
        fontSize: '14px',
        marginTop: '10px',
        padding: '5px'
      }}>
        Submit
      </button>
    </FormContainer>
  </React.Fragment>
);

export default LoginForm;
