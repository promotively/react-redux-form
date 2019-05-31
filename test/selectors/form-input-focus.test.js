/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormInputFocusSelector from 'selectors/form-input-focus';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;

describe('selectors/form-input-focus.js', () => {
  it('should return a boolean indicating whether form input has focus,', () => {
    const formInputValueSelector = createFormInputFocusSelector(formId, inputId);
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          focus: true
        }
      }
    };

    expect(formInputValueSelector(mockState)).toEqual(true);
  });
});
