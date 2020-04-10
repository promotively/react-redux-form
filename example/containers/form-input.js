/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import { FormInput, withFormInput } from '../../src';

const FormInputContainer = withFormInput({
  // (default=true, optional) Set to false if you want to keep the data in your
  // store when this component unmounts.
  destroy: true
})(FormInput);

export default FormInputContainer;
