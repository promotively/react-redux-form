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
 * Returns a reselect.js selector function that returns the current form input error state or an empty string.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormInputErrorSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formInputErrorSelector = createFormInputErrorSelector('profile', 'name');
 *
 *   return {
 *     error: formInputErrorSelector(state)
 *
 * ...
 */
const createFormInputErrorSelector = (formId, inputId) =>
  createSelector(
    state => {
      const input = state.formInput[`${formId}__${inputId}`];

      return (input && input.error) || '';
    },
    error => error
  );

export default createFormInputErrorSelector;
