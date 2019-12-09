/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/*
 * @see {@link https://github.com/reduxjs/reselect}
 */

import { createSelector } from 'reselect';

/**
 * Returns a reselect.js selector function that returns the current form loading state.
 * @function
 * @param {String} formId The ID for the form.
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
 *     loading: formInputValueSelector(state)
 *
 * ...
 */
const createFormLoadingSelector = formId =>
  createSelector(
    state => Boolean(state.form[formId] && state.form[formId].loading),
    loading => loading
  );

export default createFormLoadingSelector;
