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
/* eslint-disable react/no-array-index-key */

import React, { Fragment } from 'react';
import { connect as withRedux } from 'react-redux';
import { disableInput, enableInput } from '../../../src/actions/input';
import { Label } from '../../common/components/label';
import { Meta } from '../../common/components/meta';
import { Wrapper } from '../../common/components/wrapper';

const mapDispatchToProps = {
  disableInput,
  enableInput
};

export const WrappedRadio = props => {
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
    ...radioInputProps
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
      <Label htmlFor={`${id}_0`}>Radio Input</Label>
      <div style={{ display: 'flex' }}>
        <div style={{ alignItems: 'center', display: 'flex', marginRight: '10px', width: '250px' }}>
          {options.map((option, index) => {
            const { label, ...optionProps } = option;

            return (
              <Fragment key={`${id}_${index}`}>
                <input
                  style={{
                    border: '1px solid #000',
                    borderRadius: '4px',
                    height: '34px',
                    lineHeight: '24px',
                    padding: '5px'
                  }}
                  {...radioInputProps}
                  {...optionProps}
                  disabled={disabled}
                  id={`${id}_${index}`}
                />
                <label htmlFor={`${id}_${index}`}>{label}</label>
              </Fragment>
            );
          })}
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

WrappedRadio.defaultProps = {
  options: []
};

export const Radio = withRedux(null, mapDispatchToProps)(WrappedRadio);
