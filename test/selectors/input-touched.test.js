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

import { createInputTouchedSelector } from 'selectors/input-touched';

const formId = 'test-form';
const inputId = 'test-input';
const inputKey = `${formId}__${inputId}`;

describe('selectors/input-touched.js', () => {
  it('should return true when the input has been touched.', () => {
    const inputTouchedSelector = createInputTouchedSelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {
          [inputKey]: {
            touched: true
          }
        }
      }
    };

    expect(inputTouchedSelector(mockState)).toEqual(true);
  });

  it('should return false when the input has not been touched.', () => {
    const inputTouchedSelector = createInputTouchedSelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {
          [inputKey]: {}
        }
      }
    };

    expect(inputTouchedSelector(mockState)).toEqual(false);
  });
});
