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

/* eslint-disable promise/prefer-await-to-then */

/**
 * (A)synchronous form validation handler.
 *
 * @private
 * @param validator
 * @function
 * @param {object} props The properties available to the the parent component.
 * @returns {Function} A function that creates a function that returns a promise to be resolved.
 */
export const handleFormValidation = validator => payload =>
  new Promise((resolve, reject) => {
    if (!validator) {
      resolve();
    } else {
      const validate = validator(payload);

      if (validate instanceof Promise) {
        validate.then(resolve).catch(reject);
      } else if (validate) {
        reject(new Error(validate));
      } else {
        resolve(validate);
      }
    }
  });

/**
 * (A)synchronous form validation handler.
 *
 * @private
 * @param validator
 * @function
 * @param {object} props The properties available to the the parent component.
 * @returns {Function} A function that creates a function that returns a promise to be resolved.
 */
export const handleInputValidation = validator => (id, value) =>
  new Promise((resolve, reject) => {
    if (!validator) {
      resolve();
    } else {
      const validate = validator(id, value);

      if (validate instanceof Promise) {
        validate.then(resolve).catch(reject);
      } else if (validate) {
        reject(new Error(validate));
      } else {
        resolve(validate);
      }
    }
  });
