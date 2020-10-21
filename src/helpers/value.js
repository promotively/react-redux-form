/**
 * promotively/react-redux-form
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-form}
 */

/**
 * @module helpers
 */

export const stringifyValue = value => {
  if (typeof value === 'boolean' || typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value;
};

export const parseValue = value => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (!isNaN(value) && value !== '' && value !== null) {
    return parseInt(value, 10);
  }

  if (typeof value === 'undefined') {
    return null;
  }

  if (value === '') {
    return null;
  }

  return value;
};
