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
 * Returns a reselect.js selector function that returns the current form input focus state.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormInputFocusSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formInputFocusSelector = createFormInputFocusSelector('profile', 'name');
 *
 *   return {
 *     focus: formInputFocusSelector(state)
 *
 * ...
 */
const createFormInputFocusSelector = (formId, inputId) =>
  createSelector(
    state => {
      const input = state.formInput[`${formId}__${inputId}`];

      return Boolean(input?.focus);
    },
    focus => focus
  );

export default createFormInputFocusSelector;
