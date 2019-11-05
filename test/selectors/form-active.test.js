/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormActiveSelector from 'selectors/form-active';

const formId = 'test-form';
const inputKeys = [
  `${formId}__test-form-input-1`,
  `${formId}__test-form-input-2`
];

describe('selectors/form-active.js', () => {
  it('should return true when any form inputs are active.', () => {
    const formActiveSelector = createFormActiveSelector(formId);
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKeys[0]]: {
          active: true
        },
        [inputKeys[1]]: {
          active: false
        }
      }
    };

    expect(formActiveSelector(mockState)).toEqual(true);
  });

  it('should return false when no form inputs are active.', () => {
    const formActiveSelector = createFormActiveSelector(formId);
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKeys[0]]: {
          active: false
        },
        [inputKeys[1]]: {
          active: false
        }
      }
    };

    expect(formActiveSelector(mockState)).toEqual(false);
  });
});
