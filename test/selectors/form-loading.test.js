/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormLoadingSelector from 'selectors/form-loading';

const formId = 'test-form';

describe('selectors/form-loading.js', () => {
  it('should return true when the form is submitting.', () => {
    const formLoadingSelector = createFormLoadingSelector(formId);
    const mockState = {
      form: {
        [formId]: {
          loading: true
        }
      }
    };

    expect(formLoadingSelector(mockState)).toEqual(true);
  });
});
