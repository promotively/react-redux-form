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

/**
 * @module actions
 *
 * @see {@link https://github.com/reduxjs/redux}
 */

/**
 * Value for the FORM_INPUT_BLUR redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_BLUR = '@@promotively/FORM_INPUT_BLUR';

/**
 * Value for the FORM_INPUT_CHANGE redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_CHANGE = '@@promotively/FORM_INPUT_CHANGE';

/**
 * Value for the FORM_INPUT_COMPLETE redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_COMPLETE = '@@promotively/FORM_INPUT_COMPLETE';

/**
 * Value for the FORM_INPUT_CREATE redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_CREATE = '@@promotively/FORM_INPUT_CREATE';

/**
 * Value for the FORM_INPUT_DISABLE redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_DISABLE = '@@promotively/FORM_INPUT_DISABLE';

/**
 * Value for the FORM_INPUT_ENABLE redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_ENABLE = '@@promotively/FORM_INPUT_ENABLE';

/**
 * Value for the FORM_INPUT_ERROR redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_ERROR = '@@promotively/FORM_INPUT_ERROR';

/**
 * Value for the FORM_INPUT_FOCUS redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_FOCUS = '@@promotively/FORM_INPUT_FOCUS';

/**
 * Value for the FORM_INPUT_DESTROY redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_DESTROY = '@@promotively/FORM_INPUT_DESTROY';

/**
 * Value for the FORM_INPUT_DESTROY redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const FORM_INPUT_RESET = '@@promotively/FORM_INPUT_RESET';

/**
 * Creates a redux.js action that unsets the focus on a input in the store.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @returns {object} The redux.js action for the FORM_INPUT_BLUR redux.js
 * action type.
 * @example
 * ...
 *
 * import { blurInput } from '@promotively/react-redux-form';
 *
 * const blurUserNameInput = (props) => (
 *   props.dispatch(blurInput('signup', 'username'))
 * );
 *
 * ...
 */
export const blurInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_BLUR
});

/**
 * Creates a redux.js action that changes a input value.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @param {string|number|boolean|object|Array} defaultValue The initial value for the input.
 * @param value
 * @param {string|number|boolean|object|Array} newValue The new value for the input.
 * @returns {object} The redux.js action for the FORM_INPUT_CHANGE redux.js
 * action type.
 * @example
 * ...
 *
 * import { changeInput } from '@promotively/react-redux-form';
 *
 * const updateStoreId = (props) => {
 * const storeId = window.STORE_ID;
 * return props.dispatch(changeInput('signup', 'store_id', '', storeId));
 * };
 *
 * ...
 */
export const changeInput = (formId, inputId, value = null) => ({
  formId,
  inputId,
  type: FORM_INPUT_CHANGE,
  value
});

/**
 * Creates a redux.js action that completes a input value.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @returns {object} The redux.js action for the FORM_INPUT_COMPLETE redux.js
 * action type.
 * @example
 * ...
 *
 * import { completeInput } from '@promotively/react-redux-form';
 *
 * const overrideSignupInputError = (props) => (
 *   props.dispatch(completeInput('signup', props.id))
 * );
 *
 * ...
 */
export const completeInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_COMPLETE
});

/**
 * Creates a redux.js action that creates a input.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @param value
 * @param {string} defaultValue The initial value for the input.
 * @returns {object} The redux.js action for the FORM_INPUT_CREATE redux.js
 * action type.
 * @example
 * ...
 *
 * import { createInput } from '@promotively/react-redux-form';
 *
 * const createSignupInput = (props) => (
 * props.dispatch(createInput('signup', props.id));
 * );
 *
 * ...
 */
export const createInput = (formId, inputId, value = null) => ({
  formId,
  inputId,
  type: FORM_INPUT_CREATE,
  value
});

/**
 * Creates a redux.js action that disables a input.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @returns {object} The redux.js action for the FORM_INPUT_DISABLE redux.js
 * action type.
 * @example
 * ...
 *
 * import { disableInput } from '@promotively/react-redux-form';
 *
 * const changeSignupMode = (props) => (
 *   props.type === 'email' ?
 *     props.dispatch(disableInput('signup', 'username'));
 *   :
 *     props.dispatch(disableInput('signup', 'email'));
 * );
 *
 * ...
 */
export const disableInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_DISABLE
});

/**
 * Creates a redux.js action that enables a input.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @returns {object} The redux.js action for the FORM_INPUT_ENABLE redux.js
 * action type.
 * @example
 * ...
 *
 * import { enableInput } from '@promotively/react-redux-form';
 *
 * const enablePrivacyPolicyCheckBoxOnScroll = (props) => (
 *   props.dispatch(enableInput('signup', 'privacy-policy'));
 * );
 *
 * ...
 */
export const enableInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_ENABLE
});

/**
 * Creates a redux.js action that sets the error state on a input.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @param {Error} error An error object containing the error message for the
 * input.
 * @returns {object} The redux.js action for the FORM_INPUT_ERROR redux.js
 * action type.
 * @example
 * ...
 *
 * import { errorInput } from '@promotively/react-redux-form';
 *
 * const verifyEmailAddressError = (props) => (
 *   props.dispatch(errorInput('signup', 'username',
 *     new Error('This username already exists, please try again.')
 *   ))
 * );
 *
 * ...
 */
export const errorInput = (formId, inputId, error) => ({
  error,
  formId,
  inputId,
  type: FORM_INPUT_ERROR
});

/**
 * Creates a redux.js action that sets the focus on a input.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @returns {object} The redux.js action for the FORM_INPUT_FOCUS redux.js
 * action type.
 * @example
 * ...
 *
 * import { focusInput } from '@promotively/react-redux-form';
 *
 * const focusEmailOnLoad = (props) => (
 *   props.dispatch(focusInput('signup', 'email'))
 * );
 *
 * ...
 */
export const focusInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_FOCUS
});

/**
 * Creates a redux.js action that destroys a input.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @returns {object} The redux.js action for the FORM_INPUT_DESTROY redux.js
 * action type.
 * @example
 * ...
 *
 * import { destroyInput } from '@promotively/react-redux-form';
 *
 * const removeReferrerFromSignup() = (props) => (
 *   !props.dirty && props.dispatch(destroyInput('signup', 'referral_code'))
 * );
 *
 * ...
 */
export const destroyInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_DESTROY
});

/**
 * Creates a redux.js action that destroys a input.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param inputId
 * @param ,kl{string} inputId The ID for the input.
 * @returns {object} The redux.js action for the FORM_INPUT_DESTROY redux.js
 * action type.
 * @example
 * ...
 *
 * import { destroyInput } from '@promotively/react-redux-form';
 *
 * const removeReferrerFromSignup() = (props) => (
 * !props.dirty && props.dispatch(destroyInput('signup', 'referral_code'))
 * );
 *
 * ...
 */
export const resetInput = (formId, inputId) => ({
  formId,
  inputId,
  type: FORM_INPUT_RESET
});
