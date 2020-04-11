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
 * Returns a reselect.js selector function that returns the current form input disabled state.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormInputDisabledSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formInputDisabledSelector = createFormInputDisabledSelector('profile', 'name');
 *
 *   return {
 *     disabled: formInputDisabledSelector(state)
 *
 * ...
 */
const createFormInputDisabledSelector = (formId, inputId) =>
  createSelector(
    state => {
      const input = state.formInput[`${formId}__${inputId}`];

      return Boolean(input?.disabled);
    },
    disabled => disabled
  );

export default createFormInputDisabledSelector;
