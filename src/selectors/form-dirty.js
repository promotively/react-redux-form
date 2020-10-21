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
 * Returns a reselect.js selector function that returns the current form dirty state.
 *
 * @function
 * @param {string} formId The ID for the form.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormDirtySelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formDirtySelector = createFormDirtySelector('profile');
 *
 *   return {
 *     dirty: formDirtySelector(state)
 *
 * ...
 */
export const createFormDirtySelector = formId =>
  createSelector(
    state =>
      Object.keys(state.form.inputs).some(
        key => formId === key.split('__')[0] && state.form.inputs[key]?.value !== state.form.inputs[key]?.default
      ),
    dirty => dirty
  );
