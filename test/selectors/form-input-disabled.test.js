/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormInputDisabledSelector from 'selectors/form-input-disabled';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;
const mockProps = {};

describe('selectors/form-input-disabled.js', () => {
  it('should return a boolean indicating whether the form input is disabled.', () => {
    const formInputDisabledSelector = createFormInputDisabledSelector(formId, inputId);
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

    expect(formInputDisabledSelector(mockState, mockProps)).toEqual(true);
  });
});
