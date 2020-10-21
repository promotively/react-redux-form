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

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { FormContext, useForm } from '../../../src';
import { Alert } from '../../common/components/alert';
import { Label } from '../../common/components/label';
import { Meta } from '../../common/components/meta';
import { Wrapper } from '../../common/components/wrapper';

export const Form = props => {
  const { children, destroy, id, onSubmit: handleSubmit, validate: handleValidation, ...formProps } = props;
  const { complete, dirty, disabled, error, focus, onSubmit, loading, touched, values } = useForm(id, {
    destroy,
    handleSubmit,
    handleValidation
  });
  const context = { destroy, id };

  return (
    <>
      <Wrapper>
        <Label>Form</Label>
        <div style={{ display: 'flex' }}>
          <Meta
            data={[
              { name: 'Complete', value: complete },
              { name: 'Dirty', value: dirty },
              { name: 'Disabled', value: disabled },
              { name: 'Error', value: Boolean(error) },
              { name: 'Focus', value: focus },
              { name: 'Loading', value: loading },
              { name: 'Touched', value: touched }
            ]}
          />
        </div>
        {Object.keys(values).length > 0 ? (
          <div
            style={{
              border: '1px solid black',
              borderRadius: '4px',
              color: 'black',
              display: 'inline-block',
              fontSize: '14px',
              margin: '10px 5px 0 0',
              padding: '5px'
            }}
          >
            Submitted: {JSON.stringify(values)}
          </div>
        ) : null}
      </Wrapper>
      <FormContext.Provider value={context}>
        <form {...formProps} id={id} noValidate onSubmit={onSubmit}>
          {children}
        </form>
      </FormContext.Provider>
      {loading ? (
        <div style={{ margin: '10px 0' }}>
          <Alert type="info">The form is submitting, please wait.</Alert>
        </div>
      ) : null}
      {!loading && error ? (
        <div style={{ margin: '10px 0' }}>
          <Alert type="error">{error}</Alert>
        </div>
      ) : null}
      {!loading && complete ? (
        <div style={{ margin: '10px 0' }}>
          <Alert type="success">The form was successfully submitted.</Alert>
        </div>
      ) : null}
    </>
  );
};
