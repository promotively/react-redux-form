/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import {
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_CREATE,
  FORM_INPUT_DISABLE,
  FORM_INPUT_ENABLE,
  FORM_INPUT_FOCUS,
  FORM_INPUT_REMOVE,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_ERROR
} from 'actions/form-input';
import formInputReducer from 'reducers/form-input';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;
const defaultValue = 'test-value';
const newValue = 'test-value-new';
const initialState = {};
const mockError = new Error('test-error');
const mockInputState = {
  [inputKey]: {
    active: false,
    dirty: false,
    disabled: false,
    error: null,
    focus: false,
    value: null
  }
};

describe('reducers/form-input.js', () => {
  it('should not mutate state when action type is not found in the reducer.', () => {
    expect(formInputReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FORM_INPUT_CREATE action type.', () => {
    expect(formInputReducer({}, {
      defaultValue,
      formId,
      inputId,
      type: FORM_INPUT_CREATE
    })).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        value: defaultValue
      }
    });
  });

  it('should handle FORM_INPUT_CHANGE action type.', () => {
    expect(formInputReducer(mockInputState, {
      defaultValue,
      formId,
      inputId,
      newValue,
      type: FORM_INPUT_CHANGE
    })).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        dirty: true,
        value: newValue
      }
    });
  });

  it('should handle FORM_INPUT_ERROR action type.', () => {
    expect(formInputReducer(mockInputState, {
      error: mockError.message,
      formId,
      inputId,
      type: FORM_INPUT_ERROR
    })).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        error: mockError.message
      }
    });
  });

  it('should handle FORM_INPUT_BLUR action type.', () => {
    expect(formInputReducer(mockInputState, {
      formId,
      inputId,
      type: FORM_INPUT_BLUR
    })).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        active: true,
        focus: false
      }
    });
  });

  it('should handle FORM_INPUT_FOCUS action type.', () => {
    expect(formInputReducer(mockInputState, {
      formId,
      inputId,
      type: FORM_INPUT_FOCUS
    })).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        focus: true
      }
    });
  });

  it('should handle FORM_INPUT_COMPLETE action type.', () => {
    expect(formInputReducer(mockInputState, {
      formId,
      inputId,
      type: FORM_INPUT_COMPLETE
    })).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        error: null
      }
    });
  });

  it('should handle FORM_INPUT_DISABLE action type.', () => {
    expect(formInputReducer(mockInputState, {
      formId,
      inputId,
      type: FORM_INPUT_DISABLE
    })).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        disabled: true
      }
    });
  });

  it('should handle FORM_INPUT_DISABLE action type.', () => {
    expect(formInputReducer(mockInputState, {
      formId,
      inputId,
      type: FORM_INPUT_ENABLE
    })).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        disabled: false
      }
    });
  });

  it('should handle FORM_INPUT_REMOVE action type.', () => {
    expect(formInputReducer(mockInputState, {
      formId,
      inputId,
      type: FORM_INPUT_REMOVE
    })).toEqual({});
  });
});
