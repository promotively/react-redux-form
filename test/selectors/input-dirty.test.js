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

import { createInputDirtySelector } from 'selectors/input-dirty';

const formId = 'test-form';
const inputId = 'test-input';
const inputKey = `${formId}__${inputId}`;
const defaultValue = 'test-value';
const newValue = 'test-new-value';

describe('selectors/input-dirty.js', () => {
  it('should return true if the input value has changed.', () => {
    const inputDirtySelector = createInputDirtySelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {
          [inputKey]: {
            default: defaultValue,
            value: newValue
          }
        }
      }
    };

    expect(inputDirtySelector(mockState)).toEqual(true);
  });

  it('should return false if the input value has not changed.', () => {
    const inputDirtySelector = createInputDirtySelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {
          [inputKey]: {
            default: defaultValue,
            value: defaultValue
          }
        }
      }
    };

    expect(inputDirtySelector(mockState)).toEqual(false);
  });
});
