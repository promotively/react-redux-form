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
 * Returns a selector function that returns the current form complete state.
 * @function
 * @returns {function} reselect.js based selector
*/
const createFormCompleteSelector = () => createSelector(
  (state, props) => (
    Boolean(state.form[props.id] && state.form[props.id].complete)
  ),
  (complete) => (
    complete
  )
);

export default createFormCompleteSelector;
