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

import { createInputRevalidateSelector } from 'selectors/input-revalidate';

const formId = 'test-form';
const inputId = 'test-input';
const inputKey = `${formId}__${inputId}`;
const mockProps = {};

describe('selectors/input-revalidate.js', () => {
  it('should return true if the input value needs revalidation.', () => {
    const inputDisabledSelector = createInputRevalidateSelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {
          [inputKey]: {
            revalidate: true
          }
        }
      }
    };

    expect(inputDisabledSelector(mockState, mockProps)).toEqual(true);
  });

  it('should return false if the input value does not need revalidation.', () => {
    const inputDisabledSelector = createInputRevalidateSelector(formId, inputId);
    const mockState = {
      form: {
        inputs: {
          [inputKey]: {
            revalidate: false
          }
        }
      }
    };

    expect(inputDisabledSelector(mockState, mockProps)).toEqual(false);
  });
});
