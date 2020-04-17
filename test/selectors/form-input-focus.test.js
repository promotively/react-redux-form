/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormInputFocusSelector from 'selectors/form-input-focus';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;

describe('selectors/form-input-focus.js', () => {
  it('should return a boolean indicating whether form input has focus.', () => {
    const formInputValueSelector = createFormInputFocusSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            focus: true
          }
        }
      }
    };

    expect(formInputValueSelector(mockState)).toEqual(true);
  });
});
