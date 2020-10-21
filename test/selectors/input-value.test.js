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

import { createInputValueSelector } from 'selectors/input-value';

const formId = 'test-form';
const inputId = 'test-input';
const inputKey = `${formId}__${inputId}`;
const newValue = 'test-value';
const mockProps = {};

describe('selectors/input-value.js', () => {
  it('should return the input value.', () => {
    const inputValueSelector = createInputValueSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            value: newValue
          }
        }
      }
    };

    expect(inputValueSelector(mockState, mockProps)).toEqual(newValue);
  });

  it('should return null if the input has no value.', () => {
    const inputValueSelector = createInputValueSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            value: null
          }
        }
      }
    };

    expect(inputValueSelector(mockState, mockProps)).toBeNull();
  });

  it('should return false if the input has a false boolean value.', () => {
    const inputValueSelector = createInputValueSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            value: false
          }
        }
      }
    };

    expect(inputValueSelector(mockState, mockProps)).toEqual(false);
  });

  it('should return true if the input has a true boolean value.', () => {
    const inputValueSelector = createInputValueSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            value: true
          }
        }
      }
    };

    expect(inputValueSelector(mockState, mockProps)).toEqual(true);
  });

  it('should return zero if the input has a zero value.', () => {
    const inputValueSelector = createInputValueSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            value: 0
          }
        }
      }
    };

    expect(inputValueSelector(mockState, mockProps)).toEqual(0);
  });

  it('should return a number if the input has a number value.', () => {
    const inputValueSelector = createInputValueSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            value: 1
          }
        }
      }
    };

    expect(inputValueSelector(mockState, mockProps)).toEqual(1);
  });
});
