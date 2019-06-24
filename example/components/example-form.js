/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import Button from './button';
import FormContainer from '../containers/form';
import FormInputContainer from '../containers/form-input';
import React from 'react';
import Wrapper from './wrapper';

const ExampleForm = (props) => (
  <Wrapper>
    <FormContainer id={props.id} onValidate={props.onValidateForm} onSubmit={props.onSubmit}>
      <FormInputContainer id="email" name="email" defaultValue="name@example.com" onValidate={props.onValidateFormInput} />
      <FormInputContainer id="password" name="password" onValidate={props.onValidateFormInput} type="password" />
      <div style={{ marginTop: '10px' }}>
        <Wrapper>
          <Button disabled={props.disabled}>Submit Form</Button>
          <span style={{
            display: 'inline-block',
            marginLeft: '10px'
          }}>
            {props.disabled ? 'This button will only be enabled when the form is not submitting and there are no form input errors.' : 'This button will be disabled if there are any form input errors.'}
          </span>
        </Wrapper>
      </div>
    </FormContainer>
  </Wrapper>
);

export default ExampleForm;