/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormCompleteSelector from 'selectors/form-complete';

const formId = 'test-form';

describe('selectors/form-complete.js', () => {
  it('should return true if the form has been submitted.', () => {
    const formCompleteSelector = createFormCompleteSelector();
    const mockState = {
      form: {
        [formId]: {
          complete: true
        }
      }
    };
    const mockProps = {
      id: formId
    };

    expect(formCompleteSelector(mockState, mockProps)).toEqual(true);
  });

  it('should return false if the form has not yet been submitted.', () => {
    const formCompleteSelector = createFormCompleteSelector();
    const mockState = {
      form: {
        [formId]: {
          complete: false
        }
      }
    };
    const mockProps = {
      id: formId
    };

    expect(formCompleteSelector(mockState, mockProps)).toEqual(false);
  });
});
