/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormInputDisabledSelector from 'selectors/form-input-disabled';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;

describe('selectors/form-input-disabled.js', () => {
  it('should return a boolean indicating whether the form input is disabled.', () => {
    const formInputDisabledSelector = createFormInputDisabledSelector();
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          disabled: true
        }
      }
    };
    const mockProps = {
      formId,
      id: inputId
    };

    expect(formInputDisabledSelector(mockState, mockProps)).toEqual(true);
  });
});
