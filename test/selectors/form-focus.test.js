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

import { createFormFocusSelector } from 'selectors/form-focus';

const formId = 'test-form';
const inputKeys = [`${formId}__test-input-1`, `${formId}__test-input-2`];

describe('selectors/form-focus.js', () => {
  it('should return true when any inputs have focus.', () => {
    const formFocusSelector = createFormFocusSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKeys[0]]: {
            focus: true
          },
          [inputKeys[1]]: {
            focus: false
          }
        }
      }
    };

    expect(formFocusSelector(mockState)).toEqual(true);
  });

  it('should return false when all inputs are blurred.', () => {
    const formFocusSelector = createFormFocusSelector(formId);
    const mockState = {
      form: {
        form: {
          [formId]: {}
        },
        inputs: {
          [inputKeys[0]]: {
            focus: false
          },
          [inputKeys[1]]: {
            focus: false
          }
        }
      }
    };

    expect(formFocusSelector(mockState)).toEqual(false);
  });
});
