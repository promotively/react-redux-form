/**
 * promotively/react-redux-form
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-form}
 */

import { createFormDirtySelector } from 'selectors/form-dirty';

const formId = 'test-form';
const inputKeys = [`${formId}__test-input-1`, `${formId}__test-input-2`];
const defaultValue = 'test-value';
const newValue = 'test-new-value';

describe('selectors/form-dirty.js', () => {
  it('should return true when any inputs are dirty.', () => {
    const formDirtySelector = createFormDirtySelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKeys[0]]: {
            default: defaultValue,
            value: newValue
          },
          [inputKeys[1]]: {
            default: defaultValue,
            value: defaultValue
          }
        }
      }
    };

    expect(formDirtySelector(mockState)).toEqual(true);
  });

  it('should return false when all inputs are clean.', () => {
    const formDirtySelector = createFormDirtySelector(formId);
    const mockState = {
      form: {
        form: {
          [formId]: {}
        },
        inputs: {
          [inputKeys[0]]: {
            default: defaultValue,
            value: defaultValue
          },
          [inputKeys[1]]: {
            default: defaultValue,
            value: defaultValue
          }
        }
      }
    };

    expect(formDirtySelector(mockState)).toEqual(false);
  });
});
