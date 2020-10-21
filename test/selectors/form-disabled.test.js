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

import { createFormDisabledSelector } from 'selectors/form-disabled';

const formId = 'test-form';
const inputKey = `${formId}__test-input`;
const mockError = new Error('test-error');

describe('selectors/form-disabled.js', () => {
  it('should return true if the form state is not yet initialized.', () => {
    const formDisabledSelector = createFormDisabledSelector(formId);
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };

    expect(formDisabledSelector(mockState)).toEqual(true);
  });

  it('should return true if the form is loading.', () => {
    const formDisabledSelector = createFormDisabledSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {
            loading: true
          }
        },
        inputs: {}
      }
    };

    expect(formDisabledSelector(mockState)).toEqual(true);
  });

  it('should return true if any inputs have an error.', () => {
    const formDisabledSelector = createFormDisabledSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        },
        inputs: {
          [inputKey]: {
            error: mockError.message
          }
        }
      }
    };

    expect(formDisabledSelector(mockState)).toEqual(true);
  });
});
