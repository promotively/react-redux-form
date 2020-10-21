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

import * as exports from 'index';
import {
  FORM_COMPLETE,
  FORM_CREATE,
  FORM_ERROR,
  FORM_LOADING,
  FORM_DESTROY,
  FORM_RESET,
  createForm,
  errorForm,
  destroyForm,
  loadingForm,
  completeForm,
  resetForm,
  submitForm
} from 'actions/form';
import {
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_CREATE,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_DISABLE,
  FORM_INPUT_ENABLE,
  FORM_INPUT_ERROR,
  FORM_INPUT_FOCUS,
  FORM_INPUT_DESTROY,
  FORM_INPUT_RESET,
  blurInput,
  changeInput,
  completeInput,
  createInput,
  disableInput,
  enableInput,
  errorInput,
  focusInput,
  destroyInput,
  resetInput
} from 'actions/input';
import { Form } from 'containers/form';
import { FormComponent } from 'components/form';
import { Input } from 'containers/input';
import { InputComponent } from 'components/input';
import { Select } from 'containers/select';
import { SelectComponent } from 'components/select';
import { Textarea } from 'containers/textarea';
import { TextareaComponent } from 'components/textarea';

import { createFormCompleteSelector } from 'selectors/form-complete';
import { createFormDirtySelector } from 'selectors/form-dirty';
import { createFormDisabledSelector } from 'selectors/form-disabled';
import { createFormErrorSelector } from 'selectors/form-error';
import { createFormFocusSelector } from 'selectors/form-focus';
import { createFormReadySelector } from 'selectors/form-ready';
import { createFormTouchedSelector } from 'selectors/form-touched';
import { createInputCompleteSelector } from 'selectors/input-complete';
import { createInputDirtySelector } from 'selectors/input-dirty';
import { createInputDisabledSelector } from 'selectors/input-disabled';
import { createInputErrorSelector } from 'selectors/input-error';
import { createInputFocusSelector } from 'selectors/input-focus';
import { createInputReadySelector } from 'selectors/input-ready';
import { createInputTouchedSelector } from 'selectors/input-touched';
import { createInputRevalidateSelector } from 'selectors/input-revalidate';
import { createInputValueSelector } from 'selectors/input-value';
import { createFormLoadingSelector } from 'selectors/form-loading';
import { createFormPayloadSelector } from 'selectors/form-payload';
import { createFormValuesSelector } from 'selectors/form-values';
import { inputReducer } from 'reducers/input';
import { formReducer } from 'reducers/form';
import { useFormContext } from 'helpers/use-form-context';
import { useForm } from 'helpers/use-form';
import { withForm } from 'helpers/with-form';
import { useInput } from 'helpers/use-input';
import { withInput } from 'helpers/with-input';

import { handleInputValidation, handleFormValidation } from 'helpers/validation';
import { parseValue, stringifyValue } from 'helpers/value';

describe('index.js', () => {
  it('should export createForm action creator.', () => {
    expect(exports.createForm).toEqual(createForm);
    expect(exports.createForm).not.toBeFalsy();
  });

  it('should export errorForm action creator.', () => {
    expect(exports.errorForm).toEqual(errorForm);
    expect(exports.errorForm).not.toBeFalsy();
  });

  it('should export loadingForm action creator.', () => {
    expect(exports.loadingForm).toEqual(loadingForm);
    expect(exports.loadingForm).not.toBeFalsy();
  });

  it('should export completeForm action creator.', () => {
    expect(exports.completeForm).toEqual(completeForm);
    expect(exports.completeForm).not.toBeFalsy();
  });

  it('should export destroyForm action creator.', () => {
    expect(exports.destroyForm).toEqual(destroyForm);
    expect(exports.destroyForm).not.toBeFalsy();
  });

  it('should export submitForm action creator.', () => {
    expect(exports.submitForm).toEqual(submitForm);
    expect(exports.submitForm).not.toBeFalsy();
  });

  it('should export blurInput action creator.', () => {
    expect(exports.blurInput).toEqual(blurInput);
    expect(exports.blurInput).not.toBeFalsy();
  });

  it('should export changeInput action creator.', () => {
    expect(exports.changeInput).toEqual(changeInput);
    expect(exports.changeInput).not.toBeFalsy();
  });

  it('should export completeInput action creator.', () => {
    expect(exports.completeInput).toEqual(completeInput);
    expect(exports.completeInput).not.toBeFalsy();
  });

  it('should export createInput action creator.', () => {
    expect(exports.createInput).toEqual(createInput);
    expect(exports.createInput).not.toBeFalsy();
  });

  it('should export disableInput action creator.', () => {
    expect(exports.disableInput).toEqual(disableInput);
    expect(exports.disableInput).not.toBeFalsy();
  });

  it('should export enableInput action creator.', () => {
    expect(exports.enableInput).toEqual(enableInput);
    expect(exports.enableInput).not.toBeFalsy();
  });

  it('should export errorInput action creator.', () => {
    expect(exports.errorInput).toEqual(errorInput);
    expect(exports.errorInput).not.toBeFalsy();
  });

  it('should export focusInput action creator.', () => {
    expect(exports.focusInput).toEqual(focusInput);
    expect(exports.focusInput).not.toBeFalsy();
  });

  it('should export destroyInput action creator.', () => {
    expect(exports.destroyInput).toEqual(destroyInput);
    expect(exports.destroyInput).not.toBeFalsy();
  });

  it('should export FORM_COMPLETE action type.', () => {
    expect(exports.FORM_COMPLETE).toEqual(FORM_COMPLETE);
    expect(exports.FORM_COMPLETE).not.toBeFalsy();
  });

  it('should export FORM_INPUT_DISABLE action type.', () => {
    expect(exports.FORM_INPUT_DISABLE).toEqual(FORM_INPUT_DISABLE);
    expect(exports.FORM_INPUT_DISABLE).not.toBeFalsy();
  });

  it('should export FORM_INPUT_ENABLE action type.', () => {
    expect(exports.FORM_INPUT_ENABLE).toEqual(FORM_INPUT_ENABLE);
    expect(exports.FORM_INPUT_ENABLE).not.toBeFalsy();
  });

  it('should export FORM_CREATE action type.', () => {
    expect(exports.FORM_CREATE).toEqual(FORM_CREATE);
    expect(exports.FORM_CREATE).not.toBeFalsy();
  });

  it('should export FORM_ERROR action type.', () => {
    expect(exports.FORM_ERROR).toEqual(FORM_ERROR);
    expect(exports.FORM_ERROR).not.toBeFalsy();
  });

  it('should export FORM_LOADING action type.', () => {
    expect(exports.FORM_LOADING).toEqual(FORM_LOADING);
    expect(exports.FORM_LOADING).not.toBeFalsy();
  });

  it('should export FORM_DESTROY action type.', () => {
    expect(exports.FORM_DESTROY).toEqual(FORM_DESTROY);
    expect(exports.FORM_DESTROY).not.toBeFalsy();
  });

  it('should export FORM_INPUT_BLUR action type.', () => {
    expect(exports.FORM_INPUT_BLUR).toEqual(FORM_INPUT_BLUR);
    expect(exports.FORM_INPUT_BLUR).not.toBeFalsy();
  });

  it('should export FORM_INPUT_CHANGE action type.', () => {
    expect(exports.FORM_INPUT_CHANGE).toEqual(FORM_INPUT_CHANGE);
    expect(exports.FORM_INPUT_CHANGE).not.toBeFalsy();
  });

  it('should export FORM_INPUT_CREATE action type.', () => {
    expect(exports.FORM_INPUT_CREATE).toEqual(FORM_INPUT_CREATE);
    expect(exports.FORM_INPUT_CREATE).not.toBeFalsy();
  });

  it('should export FORM_INPUT_COMPLETE action type.', () => {
    expect(exports.FORM_INPUT_COMPLETE).toEqual(FORM_INPUT_COMPLETE);
    expect(exports.FORM_INPUT_COMPLETE).not.toBeFalsy();
  });

  it('should export FORM_INPUT_ERROR action type.', () => {
    expect(exports.FORM_INPUT_ERROR).toEqual(FORM_INPUT_ERROR);
    expect(exports.FORM_INPUT_ERROR).not.toBeFalsy();
  });

  it('should export FORM_INPUT_FOCUS action type.', () => {
    expect(exports.FORM_INPUT_FOCUS).toEqual(FORM_INPUT_FOCUS);
    expect(exports.FORM_INPUT_FOCUS).not.toBeFalsy();
  });

  it('should export FORM_INPUT_DESTROY action type.', () => {
    expect(exports.FORM_INPUT_DESTROY).toEqual(FORM_INPUT_DESTROY);
    expect(exports.FORM_INPUT_DESTROY).not.toBeFalsy();
  });

  it('should export withForm higher order component.', () => {
    expect(exports.withForm).toEqual(withForm);
    expect(exports.withForm).not.toBeFalsy();
  });

  it('should export withInput higher order component.', () => {
    expect(exports.withInput).toEqual(withInput);
    expect(exports.withInput).not.toBeFalsy();
  });

  it('should export the form reducer.', () => {
    expect(exports.formReducer).toEqual(formReducer);
    expect(exports.formReducer).not.toBeFalsy();
  });

  it('should export the input reducer.', () => {
    expect(exports.inputReducer).toEqual(inputReducer);
    expect(exports.inputReducer).not.toBeFalsy();
  });

  it('should export the createFormTouchedSelector function.', () => {
    expect(exports.createFormTouchedSelector).toEqual(createFormTouchedSelector);
    expect(exports.createFormTouchedSelector).not.toBeFalsy();
  });

  it('should export the createFormCompleteSelector function.', () => {
    expect(exports.createFormCompleteSelector).toEqual(createFormCompleteSelector);
    expect(exports.createFormCompleteSelector).not.toBeFalsy();
  });

  it('should export the createFormDirtySelector function.', () => {
    expect(exports.createFormDirtySelector).toEqual(createFormDirtySelector);
    expect(exports.createFormDirtySelector).not.toBeFalsy();
  });

  it('should export the createFormDisabledSelector function.', () => {
    expect(exports.createFormDisabledSelector).toEqual(createFormDisabledSelector);
    expect(exports.createFormDisabledSelector).not.toBeFalsy();
  });

  it('should export the createFormErrorSelector function.', () => {
    expect(exports.createFormErrorSelector).toEqual(createFormErrorSelector);
    expect(exports.createFormErrorSelector).not.toBeFalsy();
  });

  it('should export the createFormFocusSelector function.', () => {
    expect(exports.createFormFocusSelector).toEqual(createFormFocusSelector);
    expect(exports.createFormFocusSelector).not.toBeFalsy();
  });

  it('should export the createFormLoadingSelector function.', () => {
    expect(exports.createFormLoadingSelector).toEqual(createFormLoadingSelector);
    expect(exports.createFormLoadingSelector).not.toBeFalsy();
  });

  it('should export the createFormPayloadSelector function.', () => {
    expect(exports.createFormPayloadSelector).toEqual(createFormPayloadSelector);
    expect(exports.createFormPayloadSelector).not.toBeFalsy();
  });

  it('should export the createFormValuesSelector function.', () => {
    expect(exports.createFormValuesSelector).toEqual(createFormValuesSelector);
    expect(exports.createFormValuesSelector).not.toBeFalsy();
  });

  it('should export the createInputTouchedSelector function.', () => {
    expect(exports.createInputTouchedSelector).toEqual(createInputTouchedSelector);
    expect(exports.createInputTouchedSelector).not.toBeFalsy();
  });

  it('should export the createInputCompleteSelector function.', () => {
    expect(exports.createInputCompleteSelector).toEqual(createInputCompleteSelector);
    expect(exports.createInputCompleteSelector).not.toBeFalsy();
  });

  it('should export the createInputDirtySelector function.', () => {
    expect(exports.createInputDirtySelector).toEqual(createInputDirtySelector);
    expect(exports.createInputDirtySelector).not.toBeFalsy();
  });

  it('should export the createInputDisabledSelector function.', () => {
    expect(exports.createInputDisabledSelector).toEqual(createInputDisabledSelector);
    expect(exports.createInputDisabledSelector).not.toBeFalsy();
  });

  it('should export the createInputErrorSelector function.', () => {
    expect(exports.createInputErrorSelector).toEqual(createInputErrorSelector);
    expect(exports.createInputErrorSelector).not.toBeFalsy();
  });

  it('should export the createInputFocusSelector function.', () => {
    expect(exports.createInputFocusSelector).toEqual(createInputFocusSelector);
    expect(exports.createInputFocusSelector).not.toBeFalsy();
  });

  it('should export the createInputValueSelector function.', () => {
    expect(exports.createInputValueSelector).toEqual(createInputValueSelector);
    expect(exports.createInputValueSelector).not.toBeFalsy();
  });
});
