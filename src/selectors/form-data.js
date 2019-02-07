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
 * Returns a selector function to get the current form payload.
 * @function
 * @returns {function} reselect.js based selector
*/
const createFormDataSelector = () => createSelector(
  (state, props) => (
    Object.keys(state.formInput).filter((key) => (
      props.id === key.split('__')[0]
    )).map((key) => ({
      name: key.split('__')[1],
      value: state.formInput[key].value
    })).reduce((result, item) => {
      result[item.name] = item.value;

      return result;
    }, {})
  ),
  (data) => (
    data
  )
);

export default createFormDataSelector;
