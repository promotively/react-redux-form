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
import { useDispatch } from 'react-redux';
import { disableInput, enableInput, useInput } from '../../../src';
import { Label } from '../../common/components/label';
import { Meta } from '../../common/components/meta';
import { Wrapper } from '../../common/components/wrapper';

export const Textarea = props => {
  const {
    checked,
    component,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    id: textareaId,
    options,
    render,
    validate: handleValidation,
    ...textareaProps
  } = props;

  const { complete, dirty, disabled, error, focus, id, onBlur, onChange, onFocus, touched, value } = useInput(
    textareaId,
    {
      defaultDisabled: textareaProps.disabled,
      defaultValue: textareaProps.value,
      handleBlur,
      handleChange,
      handleFocus,
      handleValidation,
      inputType: 'textarea'
    }
  );
  const dispatch = useDispatch();

  const handleToggle = () => {
    const [formId, inputId] = id.split('__');

    if (disabled) {
      dispatch(enableInput(formId, inputId));
    } else {
      dispatch(disableInput(formId, inputId));
    }
  };

  return (
    <Wrapper>
      <Label htmlFor={id}>Textarea Input</Label>
      <div style={{ display: 'flex' }}>
        <div style={{ alignItems: 'center', display: 'flex', marginRight: '10px', width: '250px' }}>
          <textarea
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            style={{
              ...(disabled
                ? {
                    background: '#eee',
                    color: '#aaa'
                  }
                : {}),
              border: '1px solid #000',
              borderRadius: '4px',
              padding: '5px',
              width: '100%'
            }}
            {...textareaProps}
            disabled={disabled}
            id={id}
            value={value}
          />
        </div>
        <Meta
          data={[
            { name: 'Complete', value: complete },
            { name: 'Dirty', value: dirty }
          ]}
        />
        <Meta data={[{ name: 'Disabled', value: disabled }]} onClick={handleToggle} style={{ cursor: 'pointer' }} />
        <Meta
          data={[
            { name: 'Error', value: Boolean(error) },
            { name: 'Focus', value: focus },
            { name: 'Touched', value: touched }
          ]}
        />
      </div>
    </Wrapper>
  );
};
