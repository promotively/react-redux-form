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
import { connect as withRedux } from 'react-redux';
import { disableInput, enableInput } from '../../../src/actions/input';
import { Label } from '../../common/components/label';
import { Meta } from '../../common/components/meta';
import { Wrapper } from '../../common/components/wrapper';

const mapDispatchToProps = {
  disableInput,
  enableInput
};

export const WrappedTextarea = props => {
  const {
    checked,
    complete,
    component,
    dirty,
    disabled,
    disableInput,
    enableInput,
    error,
    focus,
    id,
    options,
    ready,
    render,
    touched,
    validate,
    ...textareaProps
  } = props;

  const handleToggle = () => {
    const [formId, inputId] = id.split('__');

    if (disabled) {
      enableInput(formId, inputId);
    } else {
      disableInput(formId, inputId);
    }
  };

  return (
    <Wrapper>
      <Label htmlFor={id}>Textarea Input</Label>
      <div style={{ display: 'flex' }}>
        <div style={{ alignItems: 'center', display: 'flex', marginRight: '10px', width: '250px' }}>
          <textarea
            id={`${id}`}
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

export const Textarea = withRedux(null, mapDispatchToProps)(WrappedTextarea);
