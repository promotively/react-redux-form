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

import {
  blurInput,
  completeInput,
  changeInput,
  createInput,
  destroyInput,
  disableInput,
  enableInput,
  errorInput,
  focusInput,
  resetInput,
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_CREATE,
  FORM_INPUT_DESTROY,
  FORM_INPUT_DISABLE,
  FORM_INPUT_ENABLE,
  FORM_INPUT_ERROR,
  FORM_INPUT_FOCUS,
  FORM_INPUT_RESET
} from 'actions/input';

const formId = 'test-form';
const inputId = 'test-input';
const defaultValue = 'test-default-value';
const newValue = 'test-value';
const mockError = new Error('test-error');

describe('actions/input.js', () => {
  it('should handle creating a input with a default value.', () => {
    expect(createInput(formId, inputId, defaultValue)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_CREATE,
      value: defaultValue
    });
  });

  it('should handle creating a input without a default value.', () => {
    expect(createInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_CREATE,
      value: null
    });
  });

  it('should handle removing a input.', () => {
    expect(destroyInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_DESTROY
    });
  });

  it('should handle resetting a input.', () => {
    expect(resetInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_RESET
    });
  });

  it('should handle blurring a input.', () => {
    expect(blurInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_BLUR
    });
  });

  it('should handle focusing a input.', () => {
    expect(focusInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_FOCUS
    });
  });

  it('should handle changing a input value.', () => {
    expect(changeInput(formId, inputId, newValue)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_CHANGE,
      value: newValue
    });
  });

  it('should handle changing a input value if the new value is null.', () => {
    expect(changeInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_CHANGE,
      value: null
    });
  });

  it('should handle errors on a input value.', () => {
    expect(errorInput(formId, inputId, mockError.message)).toEqual({
      error: mockError.message,
      formId,
      inputId,
      type: FORM_INPUT_ERROR
    });
  });

  it('should handle completing a input value.', () => {
    expect(completeInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_COMPLETE
    });
  });

  it('should handle disabling a input.', () => {
    expect(disableInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_DISABLE
    });
  });

  it('should handle disabling a input.', () => {
    expect(enableInput(formId, inputId)).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_ENABLE
    });
  });
});
