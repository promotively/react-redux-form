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

export const Checkbox = props => {
  const {
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    options: inputOptions,
    validate: handleValidation,
    id: inputId,
    ...checkBoxInputProps
  } = props;

  const { checked, complete, dirty, disabled, error, focus, id, onBlur, onChange, onFocus, touched, value } = useInput(
    inputId,
    {
      defaultDisabled: checkBoxInputProps.disabled,
      defaultValue: checkBoxInputProps.checked,
      handleBlur,
      handleChange,
      handleFocus,
      handleValidation,
      inputOptions,
      inputType: 'checkbox'
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
      <Label htmlFor={id}>Checkbox Input</Label>
      <div style={{ display: 'flex' }}>
        <div style={{ alignItems: 'center', display: 'flex', marginRight: '10px', width: '250px' }}>
          <input
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            style={{
              border: '1px solid #000',
              borderRadius: '4px',
              height: '34px',
              lineHeight: '24px',
              padding: '5px'
            }}
            {...checkBoxInputProps}
            checked={checked}
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
