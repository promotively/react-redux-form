/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import {
  FORM_CREATE,
  FORM_REMOVE,
  FORM_LOADING,
  FORM_COMPLETE,
  FORM_ERROR
} from 'actions/form';
import clone from 'clone';

/**
 * Initial state used for the first time the reducer function is called.
 * @constant
 * @type {object}
 */
const initialState = {};

/**
 * Reducer function to handle the state mutations that are required for handling forms.
 * @function
 * @param {object} state The current state of the store.
 * @param {object} action The action that was dispatched.
 *
 * @returns {object} Deep clone of the existing state of the store with any mutations related to handling forms.
*/
const formReducer = (state = initialState, action) => {
  const formId = action.id;

  switch (action.type) {
    case FORM_CREATE: {
      const newState = clone(state);

      newState[formId] = {
        complete: false,
        error: null,
        loading: false
      };

      return newState;
    }
    case FORM_REMOVE: {
      const newState = clone(state);

      delete newState[formId];

      return newState;
    }
    case FORM_LOADING: {
      const newState = clone(state);

      newState[formId] = {
        ...newState[formId],
        error: null,
        loading: true
      };

      return newState;
    }
    case FORM_COMPLETE: {
      const newState = clone(state);

      newState[formId] = {
        ...newState[formId],
        complete: true,
        loading: false
      };

      return newState;
    }
    case FORM_ERROR: {
      const newState = clone(state);

      newState[formId] = {
        ...newState[formId],
        error: action.error,
        loading: false
      };

      return newState;
    }
    default:
      return state;
  }
};

export default formReducer;
