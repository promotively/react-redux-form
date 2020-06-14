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
 * Returns a reselect.js selector function that returns the current form input value or an empty string.
 * @function
 * @param {String} formId The ID for the form.
 * @param {String} inputId The ID for the form input.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormInputValueSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formInputValueSelector = createFormInputValueSelector('profile', 'name');
 *
 *   return {
 *     value: formInputValueSelector(state)
 *
 * ...
 */
export const createFormInputValueSelector = (formId, inputId) =>
  createSelector(
    (state, props) => {
      const input = state.form.inputs[`${formId}__${inputId}`];

      if (input?.value === '' && props.value) {
        return input?.value;
      }

      return input?.value || props.value || '';
    },
    value => value
  );
