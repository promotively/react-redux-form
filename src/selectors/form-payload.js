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
 * Returns a reselect.js selector function to get the current form payload.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormDataSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formDataSelector = createFormDataSelector('profile');
 *
 *   return {
 *     data: formDataSelector(state)
 *
 * ...
 */
export const createFormPayloadSelector = formId =>
  createSelector(
    state =>
      Object.keys(state.form.inputs)
        .filter(key => formId === key.split('__')[0])
        .map(key => ({
          name: key.split('__')[1],
          value: state.form.inputs[key].value
        }))
        .reduce((result, item) => {
          if (item.value !== null) {
            result[item.name] = item.value;
          }

          return result;
        }, {}),
    data => data
  );
