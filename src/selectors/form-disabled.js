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
 * Returns a selector function that returns the current form disabled state.
 * @function
 * @returns {function} reselect.js based selector
*/
const createFormDisabledSelector = () => createSelector(
  (state, props) => (
    !state.form[props.id] || state.form[props.id].loading || Object.keys(state.formInput).some((key) => (
      props.id === key.split('__')[0] && state.formInput[key].error
    ))
  ),
  (disabled) => (
    disabled
  )
);

export default createFormDisabledSelector;
