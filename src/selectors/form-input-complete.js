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
 * Returns a selector function that returns the current form input complete state.
 * @function
 * @returns {function} reselect.js based selector
*/
const createFormInputCompleteSelector = () => createSelector(
  (state, props) => {
    const input = state.formInput[`${props.formId}__${props.id}`];

    return Boolean(input && !input.error && input.value);
  },
  (complete) => (
    complete
  )
);

export default createFormInputCompleteSelector;
