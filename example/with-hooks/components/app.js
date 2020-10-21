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

/* eslint-disable react/prop-types */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFormDirtySelector, createFormDisabledSelector, resetForm } from '../../../src';
import { handleFormValidation, handleTextInputValidation, handleFormSubmit } from '../../common/helpers/form';
import { Button } from '../../common/components/button';
import { Wrapper } from '../../common/components/wrapper';
import { Form } from './form';
import { Text } from './text';
import { Checkbox } from './checkbox';
import { Number } from './number';
import { Radio } from './radio';
import { Textarea } from './textarea';
import { Select } from './select';
import { Date } from './date';

const formId = 'example-form';

export const App = () => {
  const dirty = useSelector(createFormDirtySelector(formId));
  const disabled = useSelector(createFormDisabledSelector(formId));
  const dispatch = useDispatch();

  const handleReset = event => {
    event.preventDefault();

    dispatch(resetForm(formId));
  };

  return (
    <Form id={formId} onSubmit={handleFormSubmit} validate={handleFormValidation}>
      <Text id="text" type="text" validate={handleTextInputValidation} />
      <Text disabled id="email" type="email" validate={handleTextInputValidation} value="name@example.com" />
      <Number id="number" value={0} />
      <Date id="date" />
      <Checkbox checked id="checkbox" type="checkbox" />
      <Radio
        id="radio"
        options={[
          { label: 'Radio 1', value: 'radio_1' },
          { label: 'Radio 2', value: 'radio_2' }
        ]}
        type="radio"
        value="radio_2"
      />
      <Select
        id="select"
        options={[
          { label: 'Option 1', value: 'option_1' },
          { label: 'Option 2', value: 'option_2' },
          { label: 'Option 3', value: 'option_3' },
          { label: 'Option 4', value: 'option_4' }
        ]}
        type="radio"
        value="option_3"
      />
      <Textarea id="textarea" type="textarea" />
      <Wrapper>
        <Button disabled={disabled} style={{ marginRight: '10px' }}>
          Submit
        </Button>
        <Button disabled={!dirty} onClick={handleReset}>
          Reset
        </Button>
      </Wrapper>
    </Form>
  );
};
