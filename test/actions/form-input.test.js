/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import {
  blurFormInput,
  completeFormInput,
  changeFormInput,
  createFormInput,
  disableFormInput,
  enableFormInput,
  errorFormInput,
  focusFormInput,
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_CREATE,
  FORM_INPUT_DISABLE,
  FORM_INPUT_ENABLE,
  FORM_INPUT_ERROR,
  FORM_INPUT_FOCUS,
  FORM_INPUT_REMOVE,
  removeFormInput
} from 'actions/form-input';

const formId = 'test-form';
const inputId = 'test-form-input';
const defaultValue = 'test-default-value';
const newValue = 'test-value';
const mockError = new Error('test-error');

describe('actions/form-input.js', () => {
  it('should handle creating a form input.', () => {
    expect(createFormInput(formId, inputId, defaultValue)).toEqual({
      defaultValue,
      formId,
      inputId,
      type: FORM_INPUT_CREATE
    });
  });

  it('should handle removing a form input.', () => {
    expect(removeFormInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_REMOVE
    });
  });

  it('should handle blurring a form input.', () => {
    expect(blurFormInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_BLUR
    });
  });

  it('should handle focusing a form input.', () => {
    expect(focusFormInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_FOCUS
    });
  });

  it('should handle changing a form input value.', () => {
    expect(changeFormInput(formId, inputId, defaultValue, newValue)).toEqual({
      defaultValue,
      formId,
      inputId,
      newValue,
      type: FORM_INPUT_CHANGE
    });
  });

  it('should handle errors on a form input value.', () => {
    expect(errorFormInput(formId, inputId, mockError.message)).toEqual({
      error: mockError.message,
      formId,
      inputId,
      type: FORM_INPUT_ERROR
    });
  });

  it('should handle completing a form input value.', () => {
    expect(completeFormInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_COMPLETE
    });
  });

  it('should handle disabling a form input.', () => {
    expect(disableFormInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_DISABLE
    });
  });

  it('should handle disabling a form input.', () => {
    expect(enableFormInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_ENABLE
    });
  });
});
