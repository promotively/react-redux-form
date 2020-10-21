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

import { createInputErrorSelector } from 'selectors/input-error';

const formId = 'test-form';
const inputId = 'test-input';
const inputKey = `${formId}__${inputId}`;

describe('selectors/input-error.js', () => {
  it('should return the input error.', () => {
    const inputErrorSelector = createInputErrorSelector(formId, inputId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            error: 'error'
          }
        }
      }
    };

    expect(inputErrorSelector(mockState)).toEqual('error');
  });

  it('should return null if the input has no error.', () => {
    const inputErrorSelector = createInputErrorSelector();
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            error: null
          }
        }
      }
    };

    expect(inputErrorSelector(mockState)).toBeNull();
  });
});
