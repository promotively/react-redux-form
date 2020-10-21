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

import { createFormTouchedSelector } from 'selectors/form-touched';

const formId = 'test-form';
const inputKeys = [`${formId}__test-input-1`, `${formId}__test-input-2`];

describe('selectors/form-touched.js', () => {
  it('should return true when any inputs are touched.', () => {
    const formTouchedSelector = createFormTouchedSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKeys[0]]: {
            touched: true
          },
          [inputKeys[1]]: {
            touched: false
          }
        }
      }
    };

    expect(formTouchedSelector(mockState)).toEqual(true);
  });

  it('should return false when no inputs are touched.', () => {
    const formTouchedSelector = createFormTouchedSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKeys[0]]: {
            touched: false
          },
          [inputKeys[1]]: {
            touched: false
          }
        }
      }
    };

    expect(formTouchedSelector(mockState)).toEqual(false);
  });
});
