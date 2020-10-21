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

import React from 'react';
import { FormContext } from 'helpers/form-context';

/**
 * Creates a new component that has the formId property.
 *
 * @private
 * @function
 * @param {Function} Component The wrapped withInput higher order component to pass the form id down to.
 * @returns {Function} The wrapped withInput higher order component with the form id.
 */
export const withFormContext = Component => {
  const WrappedComponent = props => (
    <FormContext.Consumer>
      {context => <Component {...props} destroy={context?.destroy} formId={context?.id} />}
    </FormContext.Consumer>
  );

  WrappedComponent.displayName = 'WithFormContext(WrappedComponent)';

  return WrappedComponent;
};
