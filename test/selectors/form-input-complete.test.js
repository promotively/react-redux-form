/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormInputCompleteSelector from 'selectors/form-input-complete';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;
const newValue = 'test-value';
const mockError = new Error('test-error');

describe('selectors/form-input-complete.js', () => {
  it('should return true if the form input has a value and no errors.', () => {
    const formInputCompleteSelector = createFormInputCompleteSelector(formId, inputId);
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

    expect(formInputCompleteSelector(mockState)).toEqual(true);
  });

  it('should return false if the form input has errors.', () => {
    const formInputCompleteSelector = createFormInputCompleteSelector(formId, inputId);
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

    expect(formInputCompleteSelector(mockState)).toEqual(false);
  });
});
