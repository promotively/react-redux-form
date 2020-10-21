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

import { createFormValuesSelector } from 'selectors/form-values';

const formId = 'test-form';

describe('selectors/form-values.js', () => {
  it('should return the last submitted form values.', () => {
    const formValuesSelector = createFormValuesSelector(formId);
    const mockFormValues = { test: true };
    const mockState = {
      form: {
        forms: {
          [formId]: {
            values: mockFormValues
          }
        }
      }
    };

    expect(formValuesSelector(mockState)).toEqual(mockFormValues);
  });

  it('should return an empty object if the form has not yet been submitted.', () => {
    const formValuesSelector = createFormValuesSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        }
      }
    };

    expect(formValuesSelector(mockState)).toEqual({});
  });
});
