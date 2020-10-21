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
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_CREATE,
  FORM_INPUT_DISABLE,
  FORM_INPUT_ENABLE,
  FORM_INPUT_FOCUS,
  FORM_INPUT_DESTROY,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_ERROR,
  FORM_INPUT_RESET
} from 'actions/input';
import { FORM_RESET } from 'actions/form';
import { inputReducer } from 'reducers/input';

const formId = 'test-form';
const anotherFormId = `${formId}_2`;
const inputId = 'test-input';
const anotherInputId = 'test-input-2';
const inputKey = `${formId}__${inputId}`;
const anotherInputKey = `${formId}__${anotherInputId}`;
const yetAnotherInputKey = `${anotherFormId}__${inputId}`;
const defaultValue = 'test-value';
const newValue = 'test-value-new';
const initialState = {};
const mockError = new Error('test-error');
const mockInputState = {
  [anotherInputKey]: {
    default: null,
    disabled: false,
    error: null,
    focus: false,
    revalidate: false,
    touched: false,
    value: null
  },
  [inputKey]: {
    default: defaultValue,
    disabled: false,
    error: null,
    focus: false,
    revalidate: false,
    touched: false,
    value: defaultValue
  },
  [yetAnotherInputKey]: {
    default: null,
    disabled: false,
    error: null,
    focus: false,
    revalidate: false,
    touched: false,
    value: null
  }
};

describe('reducers/input.js', () => {
  it('should not mutate state when action type is not found in the reducer.', () => {
    expect(inputReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FORM_INPUT_CREATE action type.', () => {
    expect(
      inputReducer(mockInputState, {
        formId,
        inputId,
        type: FORM_INPUT_CREATE,
        value: defaultValue
      })
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        revalidate: true,
        value: defaultValue
      }
    });
  });

  it('should handle FORM_INPUT_CHANGE action type.', () => {
    expect(
      inputReducer(mockInputState, {
        formId,
        inputId,
        type: FORM_INPUT_CHANGE,
        value: newValue
      })
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        touched: false,
        value: newValue
      }
    });
  });

  it('should handle FORM_INPUT_ERROR action type.', () => {
    expect(
      inputReducer(mockInputState, {
        error: mockError.message,
        formId,
        inputId,
        type: FORM_INPUT_ERROR
      })
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        error: mockError.message
      }
    });
  });

  it('should handle FORM_INPUT_BLUR action type.', () => {
    expect(
      inputReducer(mockInputState, {
        formId,
        inputId,
        type: FORM_INPUT_BLUR
      })
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        focus: false,
        touched: true
      }
    });
  });

  it('should handle FORM_INPUT_FOCUS action type.', () => {
    expect(
      inputReducer(mockInputState, {
        formId,
        inputId,
        type: FORM_INPUT_FOCUS
      })
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        focus: true
      }
    });
  });

  it('should handle FORM_INPUT_COMPLETE action type.', () => {
    expect(
      inputReducer(mockInputState, {
        formId,
        inputId,
        type: FORM_INPUT_COMPLETE
      })
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        error: null
      }
    });
  });

  it('should handle FORM_INPUT_DISABLE action type.', () => {
    expect(
      inputReducer(mockInputState, {
        formId,
        inputId,
        type: FORM_INPUT_DISABLE
      })
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        disabled: true
      }
    });
  });

  it('should handle FORM_INPUT_DISABLE action type.', () => {
    expect(
      inputReducer(mockInputState, {
        formId,
        inputId,
        type: FORM_INPUT_ENABLE
      })
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        disabled: false
      }
    });
  });

  it('should handle FORM_INPUT_DESTROY action type.', () => {
    expect(
      inputReducer(mockInputState, {
        formId,
        inputId,
        type: FORM_INPUT_DESTROY
      })
    ).toEqual({
      [anotherInputKey]: {
        default: null,
        disabled: false,
        error: null,
        focus: false,
        revalidate: false,
        touched: false,
        value: null
      },
      [yetAnotherInputKey]: {
        default: null,
        disabled: false,
        error: null,
        focus: false,
        revalidate: false,
        touched: false,
        value: null
      }
    });
  });

  it('should handle FORM_INPUT_RESET action type.', () => {
    expect(
      inputReducer(
        {
          ...mockInputState,
          [inputKey]: {
            ...mockInputState[inputKey],
            value: newValue
          }
        },
        {
          formId,
          inputId,
          type: FORM_INPUT_RESET
        }
      )
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        revalidate: true
      }
    });
  });

  it('should handle FORM_RESET action type.', () => {
    expect(
      inputReducer(
        {
          ...mockInputState,
          [inputKey]: {
            ...mockInputState[inputKey],
            value: newValue
          }
        },
        {
          formId,
          inputId,
          type: FORM_RESET
        }
      )
    ).toEqual({
      ...mockInputState,
      [inputKey]: {
        ...mockInputState[inputKey],
        revalidate: true
      }
    });
  });
});
