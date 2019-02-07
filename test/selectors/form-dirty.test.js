/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormDirtySelector from 'selectors/form-dirty';

const formId = 'test-form';
const inputKeys = [
  `${formId}__test-form-input-1`,
  `${formId}__test-form-input-2`
];

describe('selectors/form-dirty.js', () => {
  it('should return true when any form inputs are dirty.', () => {
    const formDirtySelector = createFormDirtySelector();
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKeys[0]]: {
          dirty: true
        },
        [inputKeys[1]]: {
          dirty: false
        }
      }
    };

    expect(formDirtySelector(mockState)).toEqual(true);
  });

  it('should return false when all form inputs are pristine.', () => {
    const formDirtySelector = createFormDirtySelector();
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKeys[0]]: {
          dirty: false
        },
        [inputKeys[1]]: {
          dirty: false
        }
      }
    };

    expect(formDirtySelector(mockState)).toEqual(false);
  });
});
