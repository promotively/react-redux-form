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
 * Returns a reselect.js selector function to get the current form error state or return an empty string.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormErrorSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formErrorSelector = createFormErrorSelector('profile');
 *
 *   return {
 *     error: formErrorSelector(state)
 *
 * ...
 */
export const createFormErrorSelector = formId =>
  createSelector(
    state => state.form.forms[formId]?.error || null,
    error => error
  );
