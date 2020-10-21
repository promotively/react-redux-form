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
import { parseValue } from '../helpers/value';

/**
 * Returns a reselect.js selector function that returns the current input value or an empty string.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @param {string} inputId The ID for the input.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createInputValueSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const inputValueSelector = createInputValueSelector('profile', 'name');
 *
 *   return {
 *     value: inputValueSelector(state)
 *
 * ...
 */
export const createInputValueSelector = (formId, inputId, defaultValue) =>
  createSelector(
    state => {
      if (typeof defaultValue !== 'undefined') {
        return parseValue(defaultValue);
      }

      const input = state.form.inputs[`${formId}__${inputId}`];

      if (typeof input?.value === 'boolean') {
        if (input?.value === false) {
          return input?.value;
        }
      }

      if (typeof input?.value === 'number') {
        if (input?.value === 0) {
          return input?.value;
        }
      }

      return input?.value || null;
    },
    value => value
  );
