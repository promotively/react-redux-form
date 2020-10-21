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
 * Returns a reselect.js selector function that returns the current form complete state.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormCompleteSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formCompleteSelector = createFormCompleteSelector('profile');
 *
 *   return {
 *     complete: formCompleteSelector(state)
 *
 * ...
 */
export const createFormCompleteSelector = formId =>
  createSelector(
    state => Boolean(state.form.forms[formId]?.complete),
    complete => complete
  );
