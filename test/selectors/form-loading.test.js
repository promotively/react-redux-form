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

import { createFormLoadingSelector } from 'selectors/form-loading';

const formId = 'test-form';

describe('selectors/form-loading.js', () => {
  it('should return true when the form is submitting.', () => {
    const formLoadingSelector = createFormLoadingSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {
            loading: true
          }
        }
      }
    };

    expect(formLoadingSelector(mockState)).toEqual(true);
  });

  it('should return false when the form is not submitting.', () => {
    const formLoadingSelector = createFormLoadingSelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        }
      }
    };

    expect(formLoadingSelector(mockState)).toEqual(false);
  });
});
