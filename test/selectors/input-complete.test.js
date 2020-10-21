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

import { createInputCompleteSelector } from 'selectors/input-complete';

const formId = 'test-form';
const inputId = 'test-input';
const inputKey = `${formId}__${inputId}`;
const anotherInputKey = `${formId}__${inputId}-2`;
const newValue = 'test-value';
const mockError = new Error('test-error');

describe('selectors/input-complete.js', () => {
  it('should return true if the input has a value and no errors.', () => {
    const inputCompleteSelector = createInputCompleteSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            error: null,
            value: newValue
          }
        }
      }
    };

    expect(inputCompleteSelector(mockState)).toEqual(true);
  });

  it('should return false if the input has errors.', () => {
    const inputCompleteSelector = createInputCompleteSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            error: mockError.message,
            value: newValue
          }
        }
      }
    };

    expect(inputCompleteSelector(mockState)).toEqual(false);
  });

  it('should return true if the input has falsey values.', () => {
    const inputCompleteSelector = createInputCompleteSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [anotherInputKey]: {
            value: false
          },
          [inputKey]: {
            value: 0
          }
        }
      }
    };

    expect(inputCompleteSelector(mockState)).toEqual(true);
  });
});
