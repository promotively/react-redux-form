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
 * Returns a reselect.js selector function to get the current form payload.
 * @function
 * @param {String} formId The ID for the form.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createFormDataSelector } from '@promotively/react-redux-form';
 *
 * const mapStateToProps = (state) => {
 *   const formDataSelector = createFormDataSelector('profile');
 *
 *   return {
 *     data: formDataSelector(state)
 *
 * ...
 */
const createFormDataSelector = formId =>
  createSelector(
    state =>
      Object.keys(state.formInput)
        .filter(key => formId === key.split('__')[0])
        .map(key => ({
          name: key.split('__')[1],
          value: state.formInput[key].value
        }))
        .reduce((result, item) => {
          result[item.name] = item.value;

          return result;
        }, {}),
    data => data
  );

export default createFormDataSelector;
