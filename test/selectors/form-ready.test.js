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

import { createFormReadySelector } from 'selectors/form-ready';

const formId = 'test-form';

describe('selectors/form-ready.js', () => {
  it('should return true when the form has already been created.', () => {
    const formReadySelector = createFormReadySelector(formId);
    const mockState = {
      form: {
        forms: {
          [formId]: {}
        }
      }
    };

    expect(formReadySelector(mockState)).toEqual(true);
  });

  it('should return false when the form has not yet been created.', () => {
    const formReadySelector = createFormReadySelector(formId);
    const mockState = {
      form: {
        forms: {}
      }
    };

    expect(formReadySelector(mockState)).toEqual(false);
  });
});
