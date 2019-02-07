/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/**
 * Value for the FORM_COMPLETE action type.
 * @constant
 * @type {string}
 */
export const FORM_COMPLETE = '@@promotively/FORM_COMPLETE';

/**
 * Value for the FORM_CREATE action type.
 * @constant
 * @type {string}
 */
export const FORM_CREATE = '@@promotively/FORM_CREATE';

/**
 * Value for the FORM_ERROR action type.
 * @constant
 * @type {string}
 */
export const FORM_ERROR = '@@promotively/FORM_ERROR';

/**
 * Value for the FORM_LOADING action type.
 * @constant
 * @type {string}
 */
export const FORM_LOADING = '@@promotively/FORM_LOADING';

/**
 * Value for the FORM_REMOVE action type.
 * @constant
 * @type {string}
 */
export const FORM_REMOVE = '@@promotively/FORM_REMOVE';

/**
 * Creates an action that creates a form in the store.
 * @function
 * @param {string} id Unique identifier for the form.
 *
 * @returns {object} Action for FORM_CREATE type.
 */
export const createForm = (id) => ({
  id,
  type: FORM_CREATE
});

/**
 * Creates an action that removes a form from the store.
 * @function
 * @param {string} id Unique identifier for the form.
 *
 * @returns {object} Action for FORM_REMOVE type.
 */
export const removeForm = (id) => ({
  id,
  type: FORM_REMOVE
});

/**
 * Creates an action that errors a form in the store.
 * @function
 * @param {string} id Unique identifier for the form.
 * @param {object} error Error object.
 *
 * @returns {object} Action for FORM_ERROR type.
 */
export const errorWithForm = (id, error) => ({
  error: error.message,
  id,
  type: FORM_ERROR
});

/**
 * Creates an asynchronous action that submits a form and updates form in the store.
 * @function
 * @param {string} id Unique identifier for the form.
 * @param {string} data Data payload for the form.
 * @param {function} action Asychronous function that returns a promise to be resolved.
 *
 * @returns {function} Asychronous function that returns a promise that resolves the action.
 */
export const submitForm = (id, data, action) => (dispatch) => {
  dispatch({
    id,
    type: FORM_LOADING
  });

  return action(data).then((response) => (
    dispatch({
      data: response,
      id,
      type: FORM_COMPLETE
    })
  )).catch((error) => (
    dispatch(errorWithForm(id, error))
  ));
};
