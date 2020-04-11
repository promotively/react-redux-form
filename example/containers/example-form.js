/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable no-console */

import React from 'react';
import { connect as withRedux } from 'react-redux';
import { createFormDisabledSelector } from '../../src';
import ExampleForm from '../components/example-form';

const mapStateToProps = (state, props) => {
  const formDisabledSelector = createFormDisabledSelector(props.id);

  return {
    disabled: formDisabledSelector(state, props)
  };
};

const handleFormValidation = data =>
  new Promise((resolve, reject) => {
    if (!data.email.includes('@example.com')) {
      reject(new Error('Must be a valid email address from example.com'));
    } else {
      resolve();
    }
  });

const handleFormInputValidation = (id, value) =>
  new Promise((resolve, reject) => {
    if (!value) {
      reject(new Error('Cannot be left empty'));
    } else {
      resolve();
    }
  });

const handleSubmit = data =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        console.log(`Form Submitted With Payload: ${JSON.stringify(data)}`);
        resolve();
      } else {
        const error = new Error('This is a randomly generated form submission error.');

        console.error(`Form Error: ${error.message}`);
        reject(error);
      }
    }, 500);
  });

const ExampleFormContainer = withRedux(mapStateToProps)(props => (
  <ExampleForm
    id={props.id}
    onValidateForm={handleFormValidation}
    onValidateFormInput={handleFormInputValidation}
    onSubmit={handleSubmit}
    disabled={props.disabled}
  />
));

export default ExampleFormContainer;
