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
 * Returns a reselect.js selector function that returns the current input focus state.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createInputFocusSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const inputFocusSelector = createInputFocusSelector('profile', 'name');
 *
 *   return {
 *     focus: inputFocusSelector(state)
 *
 * ...
 */
export const createInputReadySelector = (formId, inputId) =>
  createSelector(
    state => Boolean(state.form.inputs[`${formId}__${inputId}`]),
    ready => ready
  );
