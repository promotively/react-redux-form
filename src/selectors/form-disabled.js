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
 * Returns a reselect.js selector function that returns the current form disabled state.
 * @function
 * @param {String} formId The ID for the form.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormDisabledSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formDisabledSelector = createFormDisabledSelector('profile');
 *
 *   return {
 *     disabled: formDisabledSelector(state)
 *
 * ...
 */
const createFormDisabledSelector = (formId) => createSelector(
  (state) => (
    !state.form[formId] || state.form[formId].loading || Object.keys(state.formInput).some((key) => (
      formId === key.split('__')[0] && state.formInput[key].error
    ))
  ),
  (disabled) => (
    disabled
  )
);

export default createFormDisabledSelector;
