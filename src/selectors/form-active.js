/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/*
 * @see {@link https://github.com/reduxjs/reselect}
 */

import { createSelector } from 'reselect';

/**
 * Returns a reselect.js selector function that returns the current form active state.
 * @function
 * @param {String} formId The ID for the form.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormActiveSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formActiveSelector = createFormActiveSelector('profile');
 *
 *   return {
 *     active: formActiveSelector(state)
 *
 * ...
 */
const createFormActiveSelector = (formId) => createSelector(
  (state) => (
    Object.keys(state.formInput).some((key) => (
      formId === key.split('__')[0] && state.formInput[key].active
    ))
  ),
  (active) => (
    active
  )
);

export default createFormActiveSelector;
