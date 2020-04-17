/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/*
 * @see {@link https://github.com/reduxjs/reselect}
 */

import { createSelector } from 'reselect';

/**
 * Returns a reselect.js selector function to get the current form error state or return an empty string.
 * @function
 * @param {String} formId The ID for the form.
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
const createFormErrorSelector = formId =>
  createSelector(
    state => state.form.forms[formId]?.error || '',
    error => error
  );

export default createFormErrorSelector;
