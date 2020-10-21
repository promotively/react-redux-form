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

import { createFormErrorSelector } from 'selectors/form-error';

const formId = 'test-form';
const mockError = new Error('test-error');

describe('selectors/form-error.js', () => {
  it('should return the form error.', () => {
    const formErrorSelector = createFormErrorSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {
            error: mockError.message
          }
        }
      }
    };

    expect(formErrorSelector(mockState)).toEqual(mockError.message);
  });

  it('should return null if there is no form error.', () => {
    const formErrorSelector = createFormErrorSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        }
      }
    };

    expect(formErrorSelector(mockState)).toBeNull();
  });
});
