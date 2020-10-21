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
 * Returns a reselect.js selector function that returns the current input error state or an empty string.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createInputErrorSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const inputErrorSelector = createInputErrorSelector('profile', 'name');
 *
 *   return {
 *     error: inputErrorSelector(state)
 *
 * ...
 */
export const createInputErrorSelector = (formId, inputId) =>
  createSelector(
    state => {
      const input = state.form.inputs[`${formId}__${inputId}`];

      return input?.error || null;
    },
    error => error
  );
