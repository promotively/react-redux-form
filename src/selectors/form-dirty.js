/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import { createSelector } from 'reselect';

/**
 * Returns a selector function that returns the current form dirty state.
 * @function
 * @returns {function} reselect.js based selector
*/
const createFormDirtySelector = () => createSelector(
  (state) => (
    Object.keys(state.formInput).some((key) => (
      state.formInput[key].dirty
    ))
  ),
  (dirty) => (
    dirty
  )
);

export default createFormDirtySelector;
