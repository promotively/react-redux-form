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
 * Returns a reselect.js selector function that returns the current form dirty state.
 * @function
 * @param {String} formId The ID for the form.
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
    state => Object.keys(state.form.inputs).some(key => formId === key.split('__')[0] && state.form.inputs[key]?.dirty),
    dirty => dirty
  );
