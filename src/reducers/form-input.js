/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import {
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_CREATE,
  FORM_INPUT_DISABLE,
  FORM_INPUT_ENABLE,
  FORM_INPUT_FOCUS,
  FORM_INPUT_REMOVE,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_ERROR
} from 'actions/form-input';
import clone from 'clone';

/**
 * Initial state used for the first time the reducer function is called.
 * @constant
 * @type {object}
 */
const initialState = {};

/**
 * Reducer function to handle the state mutations that are required for handling form inputs.
 * @function
 * @param {object} state The current state of the store.
 * @param {object} action The action that was dispatched.
 *
 * @returns {object} Deep clone of the existing state of the store with any mutations related to handling form inputs.
*/
const formInputReducer = (state = initialState, action) => {
  const formInputId = `${action.formId}__${action.inputId}`;

  switch (action.type) {
    case FORM_INPUT_CREATE: {
      const newState = clone(state);

      newState[formInputId] = {
        active: false,
        dirty: false,
        disabled: false,
        error: null,
        focus: false,
        value: action.defaultValue
      };

      return newState;
    }
    case FORM_INPUT_REMOVE: {
      const newState = clone(state);

      delete newState[formInputId];

      return newState;
    }
    case FORM_INPUT_FOCUS: {
      const newState = clone(state);

      newState[formInputId] = {
        ...newState[formInputId],
        focus: true
      };

      return newState;
    }
    case FORM_INPUT_BLUR: {
      const newState = clone(state);

      newState[formInputId] = {
        ...newState[formInputId],
        active: true,
        focus: false
      };

      return newState;
    }
    case FORM_INPUT_CHANGE: {
      const newState = clone(state);
      const { defaultValue, newValue } = action;

      newState[formInputId] = {
        ...newState[formInputId],
        dirty: newValue !== defaultValue,
        value: newValue
      };

      return newState;
    }
    case FORM_INPUT_ERROR: {
      const newState = clone(state);

      newState[formInputId] = {
        ...newState[formInputId],
        error: action.error
      };

      return newState;
    }
    case FORM_INPUT_COMPLETE: {
      const newState = clone(state);

      newState[formInputId] = {
        ...newState[formInputId],
        error: null
      };

      return newState;
    }
    case FORM_INPUT_DISABLE: {
      const newState = clone(state);

      newState[formInputId] = {
        ...newState[formInputId],
        disabled: true
      };

      return newState;
    }
    case FORM_INPUT_ENABLE: {
      const newState = clone(state);

      newState[formInputId] = {
        ...newState[formInputId],
        disabled: false
      };

      return newState;
    }
    default:
      return state;
  }
};

export default formInputReducer;
