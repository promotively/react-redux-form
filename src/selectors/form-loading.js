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
 * Returns a reselect.js selector function that returns the current form loading state.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormLoadingSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formLoadingSelector = createFormLoadingSelector('profile');
 *
 *   return {
 *     loading: inputValueSelector(state)
 *
 * ...
 */
export const createFormLoadingSelector = formId =>
  createSelector(
    state => Boolean(state.form.forms[formId] && state.form.forms[formId].loading),
    loading => loading
  );
