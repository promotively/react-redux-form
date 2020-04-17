/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/*
 * @see {@link https://github.com/reduxjs/redux}
 */

import clone from 'clone';
import {
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_CREATE,
  FORM_INPUT_DISABLE,
  FORM_INPUT_ENABLE,
  FORM_INPUT_FOCUS,
  FORM_INPUT_DESTROY,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_ERROR
} from 'actions/form-input';

/**
 * Initial state used for the first time the redux.js reducer function is called.
 * @constant
 * @type {Object}
 */
const initialState = {};

/**
 * The redux.js reducer function to handle any state mutations that are required for handling form inputs.
 * @function
 * @param {Object} state The current state inside the redux.js store.
 * @param {Object} action The last redux.js action that was dispatched.
 * @returns {Object} Deep clone of the existing state of the store with any mutations related to handling form inputs.
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
        value: action.initialValue
      };

      return newState;
    }
    case FORM_INPUT_DESTROY: {
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
      const { initialValue, newValue } = action;

      newState[formInputId] = {
        ...newState[formInputId],
        dirty: newValue !== initialValue,
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
