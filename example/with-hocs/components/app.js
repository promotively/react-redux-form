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
import { connect as withRedux } from 'react-redux';
import {
  Form,
  Select,
  Textarea,
  Input,
  createFormDirtySelector,
  createFormDisabledSelector,
  resetForm
} from '../../../src';
import { handleFormValidation, handleTextInputValidation, handleFormSubmit } from '../../common/helpers/form';
import { Button } from '../../common/components/button';
import { Wrapper } from '../../common/components/wrapper';
import { Checkbox as CustomCheckboxInput } from './checkbox';
import { Date as CustomDate } from './date';
import { Form as CustomForm } from './form';
import { Number as CustomNumber } from './number';
import { Radio as CustomRadioInput } from './radio';
import { Select as CustomSelect } from './select';
import { Text as CustomTextInput } from './text';
import { Textarea as CustomTextarea } from './textarea';

const formId = 'example-form';

const mapStateToProps = (state, props) => {
  const formDirtySelector = createFormDirtySelector(formId);
  const formDisabledSelector = createFormDisabledSelector(formId);

  return {
    dirty: formDirtySelector(state, props),
    disabled: formDisabledSelector(state, props)
  };
};

const mapDispatchToProps = { resetForm };

export const WrappedApp = props => {
  const { dirty, disabled, resetForm } = props;

  const handleReset = event => {
    event.preventDefault();

    resetForm(formId);
  };

  return (
    <Form component={CustomForm} id={formId} onSubmit={handleFormSubmit} validate={handleFormValidation}>
      <Input component={CustomTextInput} id="text" type="text" validate={handleTextInputValidation} />
      <Input
        component={CustomTextInput}
        disabled
        id="email"
        type="email"
        validate={handleTextInputValidation}
        value="name@example.com"
      />
      <Input component={CustomNumber} id="number" value={0} />
      <Input component={CustomDate} id="date" />
      <Input checked component={CustomCheckboxInput} id="checkbox" type="checkbox" />
      <Input
        component={CustomRadioInput}
        id="radio"
        options={[
          { label: 'Radio 1', value: 'radio_1' },
          { label: 'Radio 2', value: 'radio_2' }
        ]}
        type="radio"
        value="radio_2"
      />
      <Select
        component={CustomSelect}
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
      <Textarea component={CustomTextarea} id="textarea" type="textarea" />
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

export const App = withRedux(mapStateToProps, mapDispatchToProps)(WrappedApp);
