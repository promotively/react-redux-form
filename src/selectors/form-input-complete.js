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
 * Returns a reselect.js selector function that returns the current form input complete state.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormInputCompleteSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formInputCompleteSelector = createFormInputCompleteSelector('profile', 'name');
 *
 *   return {
 *     complete: formInputCompleteSelector(state)
 *
 * ...
 */
const createFormInputCompleteSelector = (formId, inputId) =>
  createSelector(
    state => {
      const input = state.formInput[`${formId}__${inputId}`];

      return Boolean(input && !input.error && input.value);
    },
    complete => complete
  );

export default createFormInputCompleteSelector;
