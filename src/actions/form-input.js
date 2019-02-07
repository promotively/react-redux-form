/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/**
 * Value for the FORM_INPUT_BLUR action type.
 * @constant
 * @type {string}
 */
export const FORM_INPUT_BLUR = '@@promotively/FORM_INPUT_BLUR';

/**
 * Value for the FORM_INPUT_CHANGE action type.
 * @constant
 * @type {string}
 */
export const FORM_INPUT_CHANGE = '@@promotively/FORM_INPUT_CHANGE';

/**
 * Value for the FORM_INPUT_COMPLETE action type.
 * @constant
 * @type {string}
 */
export const FORM_INPUT_COMPLETE = '@@promotively/FORM_INPUT_COMPLETE';

/**
 * Value for the FORM_INPUT_CREATE action type.
 * @constant
 * @type {string}
 */
export const FORM_INPUT_CREATE = '@@promotively/FORM_INPUT_CREATE';

/**
 * Value for the FORM_INPUT_DISABLE action type.
 * @constant
 * @type {string}
 */
export const FORM_INPUT_DISABLE = '@@promotively/FORM_INPUT_DISABLE';

/**
 * Value for the FORM_INPUT_ENABLE action type.
 * @constant
 * @type {string}
 */
export const FORM_INPUT_ENABLE = '@@promotively/FORM_INPUT_ENABLE';

/**
 * Value for the FORM_INPUT_ERROR action type.
 * @constant
 * @type {string}
 */
export const FORM_INPUT_ERROR = '@@promotively/FORM_INPUT_ERROR';

/**
 * Value for the FORM_INPUT_FOCUS action type.
 * @constant
 * @type {string}
 */
export const FORM_INPUT_FOCUS = '@@promotively/FORM_INPUT_FOCUS';

/**
 * Value for the FORM_INPUT_REMOVE action type.
 * @constant
 * @type {string}
 */
export const FORM_INPUT_REMOVE = '@@promotively/FORM_INPUT_REMOVE';

/**
 * Creates an action that unsets the focus on a form input in the store.
 * @function
 * @param {string} formId Unique identifier for the form.
 * @param {string} inputId Unique identifier for the form input.
 *
 * @returns {object} Action for FORM_INPUT_BLUR type.
 */
export const blurFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_BLUR
});

/**
 * Creates an action that changes a form input value in the store.
 * @function
 * @param {string} formId Unique identifier for the form.
 * @param {string} inputId Unique identifier for the form input.
 * @param {string} defaultValue Initial value for the form input.
 * @param {string} newValue The new value for the form input.
 *
 * @returns {object} Action for FORM_INPUT_CHANGE type.
 */
export const changeFormInput = (formId, inputId, defaultValue, newValue) => ({
  defaultValue,
  formId,
  inputId,
  newValue,
  type: FORM_INPUT_CHANGE
});

/**
 * Creates an action that completes a form input in the store.
 * @function
 * @param {string} formId Unique identifier for the form.
 * @param {string} inputId Unique identifier for the form input.
 *
 * @returns {object} Action for FORM_INPUT_COMPLETE type.
 */
export const completeFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_COMPLETE
});

/**
 * Creates an action that creates a form input in the store.
 * @function
 * @param {string} formId Unique identifier for the form.
 * @param {string} inputId Unique identifier for the form input.
 * @param {string} defaultValue Initial value for the form input.
 *
 * @returns {object} Action for FORM_INPUT_CREATE type.
 */
export const createFormInput = (formId, inputId, defaultValue) => ({
  defaultValue,
  formId,
  inputId,
  type: FORM_INPUT_CREATE
});

/**
 * Creates an action that disables a form input in the store.
 * @function
 * @param {string} formId Unique identifier for the form.
 * @param {string} inputId Unique identifier for the form input.
 *
 * @returns {object} Action for FORM_INPUT_DISABLE type.
 */
export const disableFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_DISABLE
});

/**
 * Creates an action that enables a form input in the store.
 * @function
 * @param {string} formId Unique identifier for the form.
 * @param {string} inputId Unique identifier for the form input.
 *
 * @returns {object} Action for FORM_INPUT_ENABLE type.
 */
export const enableFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_ENABLE
});

/**
 * Creates an action that errors a form input in the store.
 * @function
 * @param {string} formId Unique identifier for the form.
 * @param {string} inputId Unique identifier for the form input.
 * @param {object} error Error object.
 *
 * @returns {object} Action for FORM_INPUT_ERROR type.
 */
export const errorWithFormInput = (formId, inputId, error) => ({
  error,
  formId,
  inputId,
  type: FORM_INPUT_ERROR
});

/**
 * Creates an action that sets the focus on a form input in the store.
 * @function
 * @param {string} formId Unique identifier for the form.
 * @param {string} inputId Unique identifier for the form input.
 *
 * @returns {object} Action for FORM_INPUT_FOCUS type.
 */
export const focusFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_FOCUS
});

/**
 * Creates an action that removes a form input from the store.
 * @function
 * @param {string} formId Unique identifier for the form.
 * @param {string} inputId Unique identifier for the form input.
 *
 * @returns {object} Action for FORM_INPUT_REMOVE type.
 */
export const removeFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_REMOVE
});
