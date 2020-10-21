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
 * @module containers
 *
 * @see {@link https://github.com/facebook/react}
 */

import { SelectComponent } from 'components/select';
import { withInput } from 'helpers/with-input';

/**
 * @typedef SelectProps
 * @type {object}
 * @property {object} children Any react.js child components to be rendered.
 * @property {string} id An id for storing the data.
 * @property {Function} source A function that returns a promise that fetches the data.
 */

/**
 * Fetches data through a higher-order react.js component and renders any react.js components passed through.
 *
 * @function
 * @param {SelectProps} props Any of the props available in the DateProps @typedef.
 * @returns {Function} A react.js component that renders any react.js child components.
 */
export const Select = withInput(SelectComponent);
