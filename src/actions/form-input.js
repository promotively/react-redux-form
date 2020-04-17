/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/**
 * @see {@link https://github.com/reduxjs/redux}
 */

/**
 * Value for the FORM_INPUT_BLUR redux.js action type.
 * @constant
 * @type {String}
 */
export const FORM_INPUT_BLUR = '@@promotively/FORM_INPUT_BLUR';

/**
 * Value for the FORM_INPUT_CHANGE redux.js action type.
 * @constant
 * @type {String}
 */
export const FORM_INPUT_CHANGE = '@@promotively/FORM_INPUT_CHANGE';

/**
 * Value for the FORM_INPUT_COMPLETE redux.js action type.
 * @constant
 * @type {String}
 */
export const FORM_INPUT_COMPLETE = '@@promotively/FORM_INPUT_COMPLETE';

/**
 * Value for the FORM_INPUT_CREATE redux.js action type.
 * @constant
 * @type {String}
 */
export const FORM_INPUT_CREATE = '@@promotively/FORM_INPUT_CREATE';

/**
 * Value for the FORM_INPUT_DISABLE redux.js action type.
 * @constant
 * @type {String}
 */
export const FORM_INPUT_DISABLE = '@@promotively/FORM_INPUT_DISABLE';

/**
 * Value for the FORM_INPUT_ENABLE redux.js action type.
 * @constant
 * @type {String}
 */
export const FORM_INPUT_ENABLE = '@@promotively/FORM_INPUT_ENABLE';

/**
 * Value for the FORM_INPUT_ERROR redux.js action type.
 * @constant
 * @type {String}
 */
export const FORM_INPUT_ERROR = '@@promotively/FORM_INPUT_ERROR';

/**
 * Value for the FORM_INPUT_FOCUS redux.js action type.
 * @constant
 * @type {String}
 */
export const FORM_INPUT_FOCUS = '@@promotively/FORM_INPUT_FOCUS';

/**
 * Value for the FORM_INPUT_DESTROY redux.js action type.
 * @constant
 * @type {String}
 */
export const FORM_INPUT_DESTROY = '@@promotively/FORM_INPUT_DESTROY';

/**
 * Creates a redux.js action that unsets the focus on a form input in the store.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Object} The redux.js action for the FORM_INPUT_BLUR redux.js
 * action type.
 * @example
 * ...
 *
 * import { blurFormInput } from '@promotively/react-redux-form';
 *
 * const blurUserNameFormInput = (props) => (
 *   props.dispatch(blurFormInput('signup', 'username'))
 * );
 *
 * ...
 */
export const blurFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_BLUR
});

/**
 * Creates a redux.js action that changes a form input value.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @param {String} initialValue The initial value for the form input.
 * @param {String} newValue The new value for the form input.
 * @returns {Object} The redux.js action for the FORM_INPUT_CHANGE redux.js
 * action type.
 * @example
 * ...
 *
 * import { changeFormInput } from '@promotively/react-redux-form';
 *
 * const updateStoreId = (props) => {
 *   const storeId = window.STORE_ID;
 *   return props.dispatch(changeFormInput('signup', 'store_id', '', storeId));
 * };
 *
 * ...
 */
export const changeFormInput = (formId, inputId, initialValue, newValue) => ({
  formId,
  initialValue,
  inputId,
  newValue,
  type: FORM_INPUT_CHANGE
});

/**
 * Creates a redux.js action that completes a form input value.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Object} The redux.js action for the FORM_INPUT_COMPLETE redux.js
 * action type.
 * @example
 * ...
 *
 * import { completeFormInput } from '@promotively/react-redux-form';
 *
 * const overrideSignupInputError = (props) => (
 *   props.dispatch(completeFormInput('signup', props.id))
 * );
 *
 * ...
 */
export const completeFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_COMPLETE
});

/**
 * Creates a redux.js action that creates a form input.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @param {String} initialValue The initial value for the form input.
 * @returns {Object} The redux.js action for the FORM_INPUT_CREATE redux.js
 * action type.
 * @example
 * ...
 *
 * import { createFormInput } from '@promotively/react-redux-form';
 *
 * const createSignupFormInput = (props) => (
 *   props.dispatch(createFormInput('signup', props.id));
 * );
 *
 * ...
 */
export const createFormInput = (formId, inputId, initialValue) => ({
  formId,
  initialValue,
  inputId,
  type: FORM_INPUT_CREATE
});

/**
 * Creates a redux.js action that disables a form input.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Object} The redux.js action for the FORM_INPUT_DISABLE redux.js
 * action type.
 * @example
 * ...
 *
 * import { disableFormInput } from '@promotively/react-redux-form';
 *
 * const changeSignupMode = (props) => (
 *   props.type === 'email' ?
 *     props.dispatch(disableFormInput('signup', 'username'));
 *   :
 *     props.dispatch(disableFormInput('signup', 'email'));
 * );
 *
 * ...
 */
export const disableFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_DISABLE
});

/**
 * Creates a redux.js action that enables a form input.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Object} The redux.js action for the FORM_INPUT_ENABLE redux.js
 * action type.
 * @example
 * ...
 *
 * import { enableFormInput } from '@promotively/react-redux-form';
 *
 * const enablePrivacyPolicyCheckBoxOnScroll = (props) => (
 *   props.dispatch(enableFormInput('signup', 'privacy-policy'));
 * );
 *
 * ...
 */
export const enableFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_ENABLE
});

/**
 * Creates a redux.js action that sets the error state on a form input.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @param {Error} error An error object containing the error message for the
 * form input.
 * @returns {Object} The redux.js action for the FORM_INPUT_ERROR redux.js
 * action type.
 * @example
 * ...
 *
 * import { errorFormInput } from '@promotively/react-redux-form';
 *
 * const verifyEmailAddressError = (props) => (
 *   props.dispatch(errorFormInput('signup', 'username',
 *     new Error('This username already exists, please try again.')
 *   ))
 * );
 *
 * ...
 */
export const errorFormInput = (formId, inputId, error) => ({
  error,
  formId,
  inputId,
  type: FORM_INPUT_ERROR
});

/**
 * Creates a redux.js action that sets the focus on a form input.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Object} The redux.js action for the FORM_INPUT_FOCUS redux.js
 * action type.
 * @example
 * ...
 *
 * import { focusFormInput } from '@promotively/react-redux-form';
 *
 * const focusEmailOnLoad = (props) => (
 *   props.dispatch(focusFormInput('signup', 'email'))
 * );
 *
 * ...
 */
export const focusFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_FOCUS
});

/**
 * Creates a redux.js action that destroys a form input.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Object} The redux.js action for the FORM_INPUT_DESTROY redux.js
 * action type.
 * @example
 * ...
 *
 * import { destroyFormInput } from '@promotively/react-redux-form';
 *
 * const removeReferrerFromSignup() = (props) => (
 *   !props.active && props.dispatch(destroyFormInput('signup', 'referral_code'))
 * );
 *
 * ...
 */
export const destroyFormInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_DESTROY
});
