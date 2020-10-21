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
 * @module selectors
 *
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/reselect}
 */

import { createSelector } from 'reselect';

/**
 * Returns a reselect.js selector function that returns the current form disabled state.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormDisabledSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formDisabledSelector = createFormDisabledSelector('profile');
 *
 *   return {
 *     disabled: formDisabledSelector(state)
 *
 * ...
 */
export const createFormDisabledSelector = formId =>
  createSelector(
    state =>
      !state.form.forms[formId] ||
      state.form.forms[formId].loading ||
      Object.keys(state.form.inputs).some(key => formId === key.split('__')[0] && state.form.inputs[key]?.error),
    disabled => disabled
  );
