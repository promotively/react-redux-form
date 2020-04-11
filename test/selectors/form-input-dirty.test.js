/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormInputDirtySelector from 'selectors/form-input-dirty';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;

describe('selectors/form-input-active.js', () => {
  it('should return a boolean indicating whether the form input value has changed.', () => {
    const formInputDirtySelector = createFormInputDirtySelector(formId, inputId);
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          dirty: true
        }
      }
    };

    expect(formInputDirtySelector(mockState)).toEqual(true);
  });
});
