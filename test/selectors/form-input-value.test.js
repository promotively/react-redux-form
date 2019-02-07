/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormInputValueSelector from 'selectors/form-input-value';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;
const newValue = 'test-value';

describe('selectors/form-input-value.js', () => {
  it('should return the form input value.', () => {
    const formInputValueSelector = createFormInputValueSelector();
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          value: newValue
        }
      }
    };
    const mockProps = {
      formId,
      id: inputId
    };

    expect(formInputValueSelector(mockState, mockProps)).toEqual(newValue);
  });

  it('should return an empty string if the form input has no value.', () => {
    const formInputValueSelector = createFormInputValueSelector();
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          value: null
        }
      }
    };
    const mockProps = {
      formId,
      id: inputId
    };

    expect(formInputValueSelector(mockState, mockProps)).toEqual('');
  });
});
