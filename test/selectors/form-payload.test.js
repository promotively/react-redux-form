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

import { createFormPayloadSelector } from 'selectors/form-payload';

const formId = 'test-form';
const inputIds = ['test-input-1', 'test-input-2', 'test-input-3'];
const inputKeys = [`${formId}__${inputIds[0]}`, `${formId}__${inputIds[1]}`, `${formId}__${inputIds[2]}`];
const inputValues = ['test-value-1', 'test-value-2', null];

describe('selectors/form-payload.js', () => {
  it('should return the correct serialized form payload.', () => {
    const formDataSelector = createFormPayloadSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKeys[0]]: {
            value: inputValues[0]
          },
          [inputKeys[1]]: {
            value: inputValues[1]
          },
          [inputKeys[2]]: {
            value: inputValues[2]
          }
        }
      }
    };

    expect(formDataSelector(mockState)).toEqual({
      [inputIds[0]]: inputValues[0],
      [inputIds[1]]: inputValues[1]
    });
  });
});
