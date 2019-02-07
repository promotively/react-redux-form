/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import createFormDisabledSelector from 'selectors/form-disabled';

const formId = 'test-form';
const inputKey = `${formId}__test-form-input`;
const mockError = new Error('test-error');

describe('selectors/form-disabled.js', () => {
  it('should return true if the form state is not yet initialized.', () => {
    const formDisabledSelector = createFormDisabledSelector();
    const mockState = {
      form: {}
    };
    const mockProps = {
      id: formId
    };

    expect(formDisabledSelector(mockState, mockProps)).toEqual(true);
  });

  it('should return true if the form is loading.', () => {
    const formDisabledSelector = createFormDisabledSelector();
    const mockState = {
      form: {
        [formId]: {
          loading: true
        }
      },
      formInput: {}
    };
    const mockProps = {
      id: formId
    };

    expect(formDisabledSelector(mockState, mockProps)).toEqual(true);
  });

  it('should return true if any form inputs have an error.', () => {
    const formDisabledSelector = createFormDisabledSelector();
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          error: mockError.message
        }
      }
    };
    const mockProps = {
      id: formId
    };

    expect(formDisabledSelector(mockState, mockProps)).toEqual(true);
  });
});
