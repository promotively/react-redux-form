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
 * Returns a selector function that returns the current form input value or an empty string.
 * @function
 * @returns {function} reselect.js based selector
*/
const createFormInputValueSelector = () => createSelector(
  (state, props) => {
    const input = state.formInput[`${props.formId}__${props.id}`];

    return (input && input.value) || '';
  },
  (value) => (
    value
  )
);

export default createFormInputValueSelector;
