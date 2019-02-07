/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormInputErrorSelector from 'selectors/form-input-error';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;

describe('selectors/form-input-error.js', () => {
  it('should return the form input error.', () => {
    const formInputErrorSelector = createFormInputErrorSelector();
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          error: 'error'
        }
      }
    };
    const mockProps = {
      formId,
      id: inputId
    };

    expect(formInputErrorSelector(mockState, mockProps)).toEqual('error');
  });

  it('should return an empty string if the form input has no error', () => {
    const formInputErrorSelector = createFormInputErrorSelector();
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          error: null
        }
      }
    };
    const mockProps = {
      formId,
      id: inputId
    };

    expect(formInputErrorSelector(mockState, mockProps)).toEqual('');
  });
});
