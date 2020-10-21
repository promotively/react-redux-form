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

import { createFormCompleteSelector } from 'selectors/form-complete';

const formId = 'test-form';

describe('selectors/form-complete.js', () => {
  it('should return true if the form has been submitted.', () => {
    const formCompleteSelector = createFormCompleteSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {
            complete: true
          }
        }
      }
    };

    expect(formCompleteSelector(mockState)).toEqual(true);
  });

  it('should return false if the form has not yet been submitted.', () => {
    const formCompleteSelector = createFormCompleteSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {
            complete: false
          }
        }
      }
    };

    expect(formCompleteSelector(mockState)).toEqual(false);
  });
});
