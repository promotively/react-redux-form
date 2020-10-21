/*
 * promotively/react-redux-form
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-form}
 */

/**
 * @module actions
 *
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/redux-thunk}
 */

/* eslint-disable promise/prefer-await-to-then */

/**
 * Value for the FORM_COMPLETE redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_COMPLETE = '@@promotively/FORM_COMPLETE';

/**
 * Value for the FORM_CREATE redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_CREATE = '@@promotively/FORM_CREATE';

/**
 * Value for the FORM_DESTROY redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_DESTROY = '@@promotively/FORM_DESTROY';

/**
 * Value for the FORM_ERROR redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_ERROR = '@@promotively/FORM_ERROR';

/**
 * Value for the FORM_LOADING redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_LOADING = '@@promotively/FORM_LOADING';

/**
 * Value for the FORM_RESET redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_RESET = '@@promotively/FORM_RESET';

/**
 * Creates a redux.js action that creates a form.
 *
 * @function
 * @param {string} id The ID for the form.
 * @returns {object} The redux.js action for the FORM_CREATE redux.js
 * action type.
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
export const createForm = id => ({ id, type: FORM_CREATE });

/**
 * Creates a redux.js action that destroys a form.
 *
 * @function
 * @param {string} id The ID for the form.
 * @returns {object} The redux.js action for the FORM_DESTROY redux.js
 * action type.
 * @example
 * ...
 *
 * import { destroyForm } from '@promotively/react-redux-form';
 *
 * const destroyLoginForm = (props) => (
 *   props.dispatch(destroyForm('login'))
 * );
 *
 * ...
 */
export const destroyForm = id => ({ id, type: FORM_DESTROY });

/**
 * Creates a redux.js action that sets the error state on a form.
 *
 * @function
 * @param {string} id The ID for the form.
 * @param {Error} error An error object containing the error message for
 * the form.
 * @returns {object} The redux.js action for the FORM_ERROR redux.js
 * action type.
 * @example
 * ...
 *
 * import { errorForm } from '@promotively/react-redux-form';
 *
 * const handleAccountBanError = (props) => (
 *   props.dispatch(errorForm('login',
 *     new Error('Your account has been banned for 24 hours.')
 *   ))
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
 *
 * @function
 * @param {string} id The ID for the form.
 * @param {object} payload An object or array containing the data from
 * the form submission.
 * @returns {object} The redux.js action for the FORM_LOADING redux.js
 * action type.
 * @example
 * ...
 *
 * import { loadingForm } from '@promotively/react-redux-form';
 *
 * // 50% chance of a form not loading and getting stuck on a spinning
 * wheel of death :))
 * const triggerTrollFormLoadingBug = (props) => (
 *   Math.random() < 0.5 && props.dispatch(loadingForm(props.id))
 * );
 *
 * ...
 */
export const loadingForm = (id, payload) => ({ id, payload, type: FORM_LOADING });

/**
 * Creates a redux.js action that sets the loading state on a form.
 *
 * @function
 * @param {string} id The ID for the form.
 * @param {object} payload An object or array containing the data from
 * the form submission.
 * @returns {object} The redux.js action for the FORM_LOADING redux.js
 * action type.
 * @example
 * ...
 *
 * import { loadingForm } from '@promotively/react-redux-form';
 *
 * // 50% chance of a form not loading and getting stuck on a spinning
 * wheel of death :))
 * const triggerTrollFormLoadingBug = (props) => (
 *   Math.random() < 0.5 && props.dispatch(loadingForm(props.id))
 * );
 *
 * ...
 */
export const resetForm = id => ({ id, type: FORM_RESET });

/**
 * Creates a redux.js action that sets the complete state on a form.
 *
 * @function
 * @param payload
 * @param response
 * @param {string} id The ID for the form.
 * @returns {object} The redux.js action for the FORM_LOADING redux.js
 * action type.
 * @example
 * ...
 *
 * import { completeForm } from '@promotively/react-redux-form';
 *
 * const completeLoginForm = (props) => (
 * props.dispatch(completeForm('login', {
 * email: 'steven.ewing@promotively.com',
 * token: '2afa99040e27b9'
 * }))
 * );
 *
 * ...
 */
export const completeForm = (id, payload, response) => ({ id, payload, response, type: FORM_COMPLETE });

/**
 * Creates a redux.js thunk that submits a form.
 *
 * @function
 * @param {string} id The ID for the form.
 * @param {object} payload The data payload for the form.
 * @param {Function} action A function that returns a promise to be resolved
 * during form submission.
 * @returns {Function} A function that returns a promise that dispatches
 * redux.js actions for FORM_LOADING to FORM_ERROR and FORM_LOADING to
 * FORM_COMPLETE during form submission.
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
export const submitForm = (id, payload, action) => dispatch => {
  dispatch(loadingForm(id, payload));

  if (action) {
    return action(payload)
      .then(response => dispatch(completeForm(id, payload, response)))
      .catch(error => dispatch(errorForm(id, error)));
  }

  return dispatch(completeForm(id, payload, {}));
};
