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

import { createInputDisabledSelector } from 'selectors/input-disabled';

const formId = 'test-form';
const inputId = 'test-input';
const inputKey = `${formId}__${inputId}`;
const mockProps = {};

describe('selectors/input-disabled.js', () => {
  it('should return true if the input is disabled.', () => {
    const inputDisabledSelector = createInputDisabledSelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {
          [inputKey]: {
            disabled: true
          }
        }
      }
    };

    expect(inputDisabledSelector(mockState, mockProps)).toEqual(true);
  });

  it('should return false if the input is enabled.', () => {
    const inputDisabledSelector = createInputDisabledSelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {
          [inputKey]: {
            disabled: false
          }
        }
      }
    };

    expect(inputDisabledSelector(mockState, mockProps)).toEqual(false);
  });
});
