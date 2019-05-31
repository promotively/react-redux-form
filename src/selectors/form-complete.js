/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/*
 * @see {@link https://github.com/reduxjs/reselect}
 */

import { createSelector } from 'reselect';

/**
 * Returns a reselect.js selector function that returns the current form complete state.
 * @function
 * @param {String} formId The ID for the form.
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
const createFormCompleteSelector = (formId) => createSelector(
  (state) => (
    Boolean(state.form[formId] && state.form[formId].complete)
  ),
  (complete) => (
    complete
  )
);

export default createFormCompleteSelector;
