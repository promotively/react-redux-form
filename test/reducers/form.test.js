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

import { FORM_CREATE, FORM_DESTROY, FORM_LOADING, FORM_COMPLETE, FORM_ERROR } from 'actions/form';
import { formReducer } from 'reducers/form';

const formId = 'test-form';
const anotherFormId = `${formId}-2`;
const mockError = new Error('test-error');
const initialState = {};
const previousState = {
  [anotherFormId]: {
    complete: false,
    error: null,
    loading: false
  },
  [formId]: {
    complete: false,
    error: null,
    loading: false
  }
};

describe('reducers/form.js', () => {
  it('should not mutate state when action type is not found in the reducer.', () => {
    expect(formReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FORM_CREATE action type.', () => {
    const nextState = {
      ...previousState,
      [formId]: {
        complete: false,
        error: null,
        loading: false
      }
    };

    expect(
      formReducer(
        {
          [anotherFormId]: {
            complete: false,
            error: null,
            loading: false
          }
        },
        {
          id: formId,
          type: FORM_CREATE
        }
      )
    ).toEqual(nextState);
  });

  it('should handle FORM_LOADING action type.', () => {
    const nextState = {
      ...previousState,
      [formId]: {
        complete: false,
        error: null,
        loading: true
      }
    };

    expect(
      formReducer(previousState, {
        id: formId,
        type: FORM_LOADING
      })
    ).toEqual(nextState);
  });

  it('should handle FORM_ERROR action type.', () => {
    const nextState = {
      ...previousState,
      [formId]: {
        complete: false,
        error: mockError.message,
        loading: false
      }
    };

    expect(
      formReducer(previousState, {
        error: mockError.message,
        id: formId,
        type: FORM_ERROR
      })
    ).toEqual(nextState);
  });

  it('should handle FORM_COMPLETE action type.', () => {
    const nextState = {
      ...previousState,
      [formId]: {
        complete: true,
        error: null,
        loading: false
      }
    };

    expect(
      formReducer(previousState, {
        id: formId,
        type: FORM_COMPLETE
      })
    ).toEqual(nextState);
  });

  it('should handle FORM_DESTROY action type.', () => {
    expect(
      formReducer(
        { ...previousState },
        {
          id: formId,
          type: FORM_DESTROY
        }
      )
    ).toEqual({
      [anotherFormId]: {
        complete: false,
        error: null,
        loading: false
      }
    });
  });
});
