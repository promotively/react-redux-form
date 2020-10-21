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

import { createInputReadySelector } from 'selectors/input-ready';

const formId = 'test-form';
const inputId = 'test-input';
const inputKey = `${formId}__${inputId}`;

describe('selectors/input-ready.js', () => {
  it('should return true when the input has already been created.', () => {
    const inputReadySelector = createInputReadySelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {
          [inputKey]: {
            focus: true
          }
        }
      }
    };

    expect(inputReadySelector(mockState)).toEqual(true);
  });

  it('should return false when the input has not yet been created.', () => {
    const inputReadySelector = createInputReadySelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {}
      }
    };

    expect(inputReadySelector(mockState)).toEqual(false);
  });
});
