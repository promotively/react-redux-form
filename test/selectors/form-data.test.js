/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import { createFormDataSelector } from 'selectors/form-data';

const formId = 'test-form';
const inputIds = ['test-form-input-1', 'test-form-input-2', 'test-form-input-3'];
const inputKeys = [`${formId}__${inputIds[0]}`, `${formId}__${inputIds[1]}`, `${formId}__${inputIds[2]}`];
const inputValues = ['test-value-1', 'test-value-2', 'test-value-3'];

describe('selectors/form-data.js', () => {
  it('should return the correct serialized form payload.', () => {
    const formDataSelector = createFormDataSelector(formId);
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
      [inputIds[1]]: inputValues[1],
      [inputIds[2]]: inputValues[2]
    });
  });
});
