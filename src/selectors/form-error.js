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
 * Returns a selector function to get the current form error state or return an empty string.
 * @function
 * @returns {function} reselect.js based selector
*/
const createFormErrorSelector = () => createSelector(
  (state, props) => (
    (state.form[props.id] && state.form[props.id].error) || ''
  ),
  (error) => (
    error
  )
);

export default createFormErrorSelector;
