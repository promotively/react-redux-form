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
 *
 * @see {@link https://github.com/facebook/react}
 */

import { useContext } from 'react';
import { FormContext } from 'helpers/form-context';

export const useFormContext = () => useContext(FormContext) || {};
