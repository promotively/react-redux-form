/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/*
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/redux-thunk}
 */

/**
 * Value for the FORM_COMPLETE redux.js action type.
 * @constant
 * @type {string}
 */
export const FORM_COMPLETE = '@@promotively/FORM_COMPLETE';

/**
 * Value for the FORM_CREATE redux.js action type.
 * @constant
 * @type {string}
 */
export const FORM_CREATE = '@@promotively/FORM_CREATE';

/**
 * Value for the FORM_ERROR redux.js action type.
 * @constant
 * @type {string}
 */
export const FORM_ERROR = '@@promotively/FORM_ERROR';

/**
 * Value for the FORM_LOADING redux.js action type.
 * @constant
 * @type {string}
 */
export const FORM_LOADING = '@@promotively/FORM_LOADING';

/**
 * Value for the FORM_REMOVE redux.js action type.
 * @constant
 * @type {string}
 */
export const FORM_REMOVE = '@@promotively/FORM_REMOVE';

/**
 * Creates a redux.js action that creates a form.
 * @function
 * @param {String} id The ID for the form.
 * @returns {Object} The redux.js action for the FORM_CREATE redux.js action type.
 * @example
 * ...
 *
 * import { createForm } from '@promotively/react-redux-form';
 *
 * const createLoginForm = (props) => (
 *   props.dispatch(createForm('login'))
 * );
 *
 * ...
 */
export const createForm = (id) => ({
  id,
  type: FORM_CREATE
});

/**
 * Creates a redux.js action that removes a form.
 * @function
 * @param {String} id The ID for the form.
 * @returns {Object} The redux.js action for the FORM_REMOVE redux.js action type.
 * @example
 * ...
 *
 * import { removeForm } from '@promotively/react-redux-form';
 *
 * const destroyLoginForm = (props) => (
 *   props.dispatch(removeForm('login'))
 * );
 *
 * ...
 */
export const removeForm = (id) => ({
  id,
  type: FORM_REMOVE
});

/**
 * Creates a redux.js action that sets the error state on a form.
 * @function
 * @param {String} id The ID for the form.
 * @param {Error} error An error object containing the error message for the form.
 * @returns {Object} The redux.js action for the FORM_ERROR redux.js action type.
 * @example
 * ...
 *
 * import { errorForm } from '@promotively/react-redux-form';
 *
 * const handleAccountBanError = (props) => (
 *   props.dispatch(errorForm('login', new Error('Your account has been banned for 24 hours.')))
 * );
 *
 * ...
 */
export const errorForm = (id, error) => ({
  error: error.message,
  id,
  type: FORM_ERROR
});

/**
 * Creates a redux.js action that sets the loading state on a form.
 * @function
 * @param {String} id The ID for the form.
 * @returns {Object} The redux.js action for the FORM_LOADING redux.js action type.
 * @example
 * ...
 *
 * import { loadingForm } from '@promotively/react-redux-form';
 *
 * // 50% chance of a form not loading and getting stuck on a spinning wheel of death :))
 * const triggerTrollFormLoadingBug = (props) => (
 *   Math.random() < 0.5 && props.dispatch(loadingForm(props.id))
 * );
 *
 * ...
 */
export const loadingForm = (id) => ({
  id,
  type: FORM_LOADING
});

/**
 * Creates a redux.js action that sets the complete state on a form.
 * @function
 * @param {String} id The ID for the form.
 * @param {Object|Array} data An object or array containing the data from the form submission.
 * @returns {Object} The redux.js action for the FORM_LOADING redux.js action type.
 * @example
 * ...
 *
 * import { completeForm } from '@promotively/react-redux-form';
 *
 * const completeLoginForm = (props) => (
 *   props.dispatch(completeForm('login', { email: 'steven.ewing@promotively.com', token: '2afa99040e27b9' }))
 * );
 *
 * ...
 */
export const completeForm = (id, data) => ({
  data,
  id,
  type: FORM_COMPLETE
});

/**
 * Creates a redux.js thunk that submits a form.
 * @function
 * @param {String} id The ID for the form.
 * @param {Object} data The data payload for the form.
 * @param {Function} action A function that returns a promise to be resolved during form submission.
 * @returns {Function} A function that returns a promise that dispatches redux.js actions for FORM_LOADING to FORM_ERROR and FORM_LOADING to FORM_COMPLETE during form submission.
 * @example
 * ...
 *
 * import { submitForm } from '@promotively/react-redux-form';
 *
 * const data = { email: 'steven.ewing@promotively.com', password: 'hunter42' };
 * const submitLoginForm = (props) => (
 *   submitForm('login', data, () => Promise.resolve(data)))
 * );
 *
 * ...
 */
export const submitForm = (id, data, action) => (dispatch) => {
  dispatch(loadingForm(id));

  return action(data).then((response) => (
    dispatch(completeForm(id, response))
  )).catch((error) => (
    dispatch(errorForm(id, error))
  ));
};
