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
 * Returns a selector function that returns the current form input focus state.
 * @function
 * @returns {function} reselect.js based selector
*/
const createFormInputFocusSelector = () => createSelector(
  (state, props) => {
    const input = state.formInput[`${props.formId}__${props.id}`];

    return Boolean(input && input.focus);
  },
  (focus) => (
    focus
  )
);

export default createFormInputFocusSelector;
