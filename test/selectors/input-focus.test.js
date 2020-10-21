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

import { createInputFocusSelector } from 'selectors/input-focus';

const formId = 'test-form';
const inputId = 'test-input';
const inputKey = `${formId}__${inputId}`;

describe('selectors/input-focus.js', () => {
  it('should return true if the input has focus.', () => {
    const inputValueSelector = createInputFocusSelector(formId, inputId);
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

    expect(inputValueSelector(mockState)).toEqual(true);
  });

  it('should return true if the input does not have focus.', () => {
    const inputValueSelector = createInputFocusSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            focus: false
          }
        }
      }
    };

    expect(inputValueSelector(mockState)).toEqual(false);
  });
});
