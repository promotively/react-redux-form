/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import React from 'react';
import { Form, FormInput } from '../../src';
import CustomForm from './custom-form';
import CustomFormInput from './custom-form-input';
import Button from './button';
import Wrapper from './wrapper';

const ExampleForm = props => (
  <Wrapper>
    <Form id={props.id} component={CustomForm} validate={props.validateForm} onSubmit={props.onSubmit}>
      <FormInput
        id="email"
        name="email"
        value="name@example.com"
        component={CustomFormInput}
        validate={props.validateFormInput}
      />
      <FormInput
        id="password"
        name="password"
        component={CustomFormInput}
        validate={props.validateFormInput}
        type="password"
      />
      <div style={{ marginTop: '10px' }}>
        <Wrapper>
          <Button disabled={props.disabled}>Submit Form</Button>
          <span
            style={{
              display: 'inline-block',
              marginLeft: '10px'
            }}
          >
            {props.disabled
              ? 'This button will only be enabled when the form is not submitting and there are no form input errors.'
              : 'This button will be disabled if there are any form input errors.'}
          </span>
        </Wrapper>
      </div>
    </Form>
  </Wrapper>
);

export default ExampleForm;
