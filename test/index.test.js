/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import * as exports from 'index';
import {
  FORM_COMPLETE,
  FORM_CREATE,
  FORM_ERROR,
  FORM_LOADING,
  FORM_REMOVE,
  createForm,
  errorForm,
  removeForm,
  loadingForm,
  completeForm,
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
  FORM_INPUT_REMOVE,
  blurFormInput,
  changeFormInput,
  completeFormInput,
  createFormInput,
  disableFormInput,
  enableFormInput,
  errorFormInput,
  focusFormInput,
  removeFormInput
} from 'actions/form-input';
import createFormActiveSelector from 'selectors/form-active';
import createFormCompleteSelector from 'selectors/form-complete';
import createFormDataSelector from 'selectors/form-data';
import createFormDirtySelector from 'selectors/form-dirty';
import createFormDisabledSelector from 'selectors/form-disabled';
import createFormErrorSelector from 'selectors/form-error';
import createFormInputActiveSelector from 'selectors/form-input-active';
import createFormInputCompleteSelector from 'selectors/form-input-complete';
import createFormInputDirtySelector from 'selectors/form-input-dirty';
import createFormInputDisabledSelector from 'selectors/form-input-disabled';
import createFormInputErrorSelector from 'selectors/form-input-error';
import createFormInputFocusSelector from 'selectors/form-input-focus';
import createFormInputValueSelector from 'selectors/form-input-value';
import createFormLoadingSelector from 'selectors/form-loading';
import formInputReducer from 'reducers/form-input';
import formReducer from 'reducers/form';
import withForm from 'helpers/with-form';
import withFormInput from 'helpers/with-form-input';

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

  it('should export removeForm action creator.', () => {
    expect(exports.removeForm).toEqual(removeForm);
    expect(exports.removeForm).not.toBeFalsy();
  });

  it('should export submitForm action creator.', () => {
    expect(exports.submitForm).toEqual(submitForm);
    expect(exports.submitForm).not.toBeFalsy();
  });

  it('should export blurFormInput action creator.', () => {
    expect(exports.blurFormInput).toEqual(blurFormInput);
    expect(exports.blurFormInput).not.toBeFalsy();
  });

  it('should export changeFormInput action creator.', () => {
    expect(exports.changeFormInput).toEqual(changeFormInput);
    expect(exports.changeFormInput).not.toBeFalsy();
  });

  it('should export completeFormInput action creator.', () => {
    expect(exports.completeFormInput).toEqual(completeFormInput);
    expect(exports.completeFormInput).not.toBeFalsy();
  });

  it('should export createFormInput action creator.', () => {
    expect(exports.createFormInput).toEqual(createFormInput);
    expect(exports.createFormInput).not.toBeFalsy();
  });

  it('should export disableFormInput action creator.', () => {
    expect(exports.disableFormInput).toEqual(disableFormInput);
    expect(exports.disableFormInput).not.toBeFalsy();
  });

  it('should export enableFormInput action creator.', () => {
    expect(exports.enableFormInput).toEqual(enableFormInput);
    expect(exports.enableFormInput).not.toBeFalsy();
  });

  it('should export errorFormInput action creator.', () => {
    expect(exports.errorFormInput).toEqual(errorFormInput);
    expect(exports.errorFormInput).not.toBeFalsy();
  });

  it('should export focusFormInput action creator.', () => {
    expect(exports.focusFormInput).toEqual(focusFormInput);
    expect(exports.focusFormInput).not.toBeFalsy();
  });

  it('should export removeFormInput action creator.', () => {
    expect(exports.removeFormInput).toEqual(removeFormInput);
    expect(exports.removeFormInput).not.toBeFalsy();
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

  it('should export FORM_REMOVE action type.', () => {
    expect(exports.FORM_REMOVE).toEqual(FORM_REMOVE);
    expect(exports.FORM_REMOVE).not.toBeFalsy();
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

  it('should export FORM_INPUT_REMOVE action type.', () => {
    expect(exports.FORM_INPUT_REMOVE).toEqual(FORM_INPUT_REMOVE);
    expect(exports.FORM_INPUT_REMOVE).not.toBeFalsy();
  });

  it('should export withForm higher order component.', () => {
    expect(exports.withForm).toEqual(withForm);
    expect(exports.withForm).not.toBeFalsy();
  });

  it('should export withFormInput higher order component.', () => {
    expect(exports.withFormInput).toEqual(withFormInput);
    expect(exports.withFormInput).not.toBeFalsy();
  });

  it('should export the form reducer', () => {
    expect(exports.formReducer).toEqual(formReducer);
    expect(exports.formReducer).not.toBeFalsy();
  });

  it('should export the form input reducer', () => {
    expect(exports.formInputReducer).toEqual(formInputReducer);
    expect(exports.formInputReducer).not.toBeFalsy();
  });

  it('should export the createFormActiveSelector function', () => {
    expect(exports.createFormActiveSelector).toEqual(createFormActiveSelector);
    expect(exports.createFormActiveSelector).not.toBeFalsy();
  });

  it('should export the createFormCompleteSelector function', () => {
    expect(exports.createFormCompleteSelector).toEqual(createFormCompleteSelector);
    expect(exports.createFormCompleteSelector).not.toBeFalsy();
  });

  it('should export the createFormDataSelector function', () => {
    expect(exports.createFormDataSelector).toEqual(createFormDataSelector);
    expect(exports.createFormDataSelector).not.toBeFalsy();
  });

  it('should export the createFormDirtySelector function', () => {
    expect(exports.createFormDirtySelector).toEqual(createFormDirtySelector);
    expect(exports.createFormDirtySelector).not.toBeFalsy();
  });

  it('should export the createFormDisabledSelector function', () => {
    expect(exports.createFormDisabledSelector).toEqual(createFormDisabledSelector);
    expect(exports.createFormDisabledSelector).not.toBeFalsy();
  });

  it('should export the createFormErrorSelector function', () => {
    expect(exports.createFormErrorSelector).toEqual(createFormErrorSelector);
    expect(exports.createFormErrorSelector).not.toBeFalsy();
  });

  it('should export the createFormLoadingSelector function', () => {
    expect(exports.createFormLoadingSelector).toEqual(createFormLoadingSelector);
    expect(exports.createFormLoadingSelector).not.toBeFalsy();
  });

  it('should export the createFormInputActiveSelector function', () => {
    expect(exports.createFormInputActiveSelector).toEqual(createFormInputActiveSelector);
    expect(exports.createFormInputActiveSelector).not.toBeFalsy();
  });

  it('should export the createFormInputCompleteSelector function', () => {
    expect(exports.createFormInputCompleteSelector).toEqual(createFormInputCompleteSelector);
    expect(exports.createFormInputCompleteSelector).not.toBeFalsy();
  });

  it('should export the createFormInputDirtySelector function', () => {
    expect(exports.createFormInputDirtySelector).toEqual(createFormInputDirtySelector);
    expect(exports.createFormInputDirtySelector).not.toBeFalsy();
  });

  it('should export the createFormInputDisabledSelector function', () => {
    expect(exports.createFormInputDisabledSelector).toEqual(createFormInputDisabledSelector);
    expect(exports.createFormInputDisabledSelector).not.toBeFalsy();
  });

  it('should export the createFormInputErrorSelector function', () => {
    expect(exports.createFormInputErrorSelector).toEqual(createFormInputErrorSelector);
    expect(exports.createFormInputErrorSelector).not.toBeFalsy();
  });

  it('should export the createFormInputFocusSelector function', () => {
    expect(exports.createFormInputFocusSelector).toEqual(createFormInputFocusSelector);
    expect(exports.createFormInputFocusSelector).not.toBeFalsy();
  });

  it('should export the createFormInputValueSelector function', () => {
    expect(exports.createFormInputValueSelector).toEqual(createFormInputValueSelector);
    expect(exports.createFormInputValueSelector).not.toBeFalsy();
  });
});
