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
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/react-redux}
 * @see {@link https://github.com/reduxjs/reselect}
 */

/* eslint-disable react/prop-types */
/* eslint-disable promise/prefer-await-to-then */

import React from 'react';
import { connect as withRedux } from 'react-redux';
import { createForm, errorForm, destroyForm, submitForm } from 'actions/form';
import { handleFormValidation } from 'helpers/validation';
import { createFormDirtySelector } from 'selectors/form-dirty';
import { createFormCompleteSelector } from 'selectors/form-complete';
import { createFormDisabledSelector } from 'selectors/form-disabled';
import { createFormErrorSelector } from 'selectors/form-error';
import { createFormFocusSelector } from 'selectors/form-focus';
import { createFormLoadingSelector } from 'selectors/form-loading';
import { createFormPayloadSelector } from 'selectors/form-payload';
import { createFormReadySelector } from 'selectors/form-ready';
import { createFormTouchedSelector } from 'selectors/form-touched';
import { createFormValuesSelector } from 'selectors/form-values';
import { FormContext } from 'helpers/form-context';

/**
 * Maps the state from the redux.js store back to props that are passed down to the react.js component.
 *
 * @private
 * @function
 * @param {object} state The current state of the redux.js store.
 * @param {object} props The properties available to the the parent react.js component.
 * @returns {object} Mapped properties from the redux.js store.
 */
const mapStateToProps = (state, props) => {
  const { id: formId } = props;
  const formTouchedSelector = createFormTouchedSelector(formId);
  const formCompleteSelector = createFormCompleteSelector(formId);
  const formDirtySelector = createFormDirtySelector(formId);
  const formDisabledSelector = createFormDisabledSelector(formId);
  const formErrorSelector = createFormErrorSelector(formId);
  const formFocusSelector = createFormFocusSelector(formId);
  const formLoadingSelector = createFormLoadingSelector(formId);
  const formPayloadSelector = createFormPayloadSelector(formId);
  const formReadySelector = createFormReadySelector(formId);
  const formValuesSelector = createFormValuesSelector(formId);

  return {
    complete: formCompleteSelector(state, props),
    dirty: formDirtySelector(state, props),
    disabled: formDisabledSelector(state, props),
    error: formErrorSelector(state, props),
    focus: formFocusSelector(state, props),
    loading: formLoadingSelector(state, props),
    payload: formPayloadSelector(state, props),
    ready: formReadySelector(state, props),
    touched: formTouchedSelector(state, props),
    values: formValuesSelector(state, props)
  };
};

/**
 * The redux.js action creators to wrap with react-redux.
 *
 * @constant
 * @type {object}
 */
const mapDispatchToProps = {
  createForm,
  destroyForm,
  errorForm,
  submitForm
};

/**
 * @typedef FormComponentProps
 * @type {object}
 * @property {boolean} dirty Form dirty state.
 * @property {boolean} complete Form complete state.
 * @property {object} payload Current form payload.
 * @property {boolean} touched Form touched state.
 * @property {string} error Form error state.
 * @property {Function} errorForm Redux action to change the form error state.
 * @property {string} id The ID for the form.
 * @property {boolean} loading Form loading state.
 * @property {Function} onSubmit Function that returns a promise that resolves to an api endpoint.
 * @property {Function} validate Function that returns a promise that can resolve any errors with the form values.
 * @property [HTMLFormElementProps]  Any props you might usually use with a react form component.
 * @property [HTMLElementProps]  Any props you might usually use with a react component that renders HTMLElement's.
 */

/**
 * Creates a new component wrapped by the withForm higher order component.
 *
 * @function
 * @param {Function} Component A react.js form component.
 * @returns {Function} A react.js component that that wraps your form component
 * using the withForm higher order component.
 * @example
 * ...
 *
 * import { withForm } from '@promotively/react-redux-form';
 *
 * const Form = (props) => (
 *   <form onSubmit={props.onSubmit}>
 *     {props.children}
 *   </form>
 * );
 * const FormContainer = withForm(Form);
 *
 * ...
 */
export const withForm = Component => {
  /**
   * @private
   * @class
   */
  class WrappedComponent extends React.PureComponent {
    /**
     * The default props passed down to the component.
     *
     * @static
     * @memberof WrappedComponent
     * @type {object}
     */
    static defaultProps = {
      complete: false,
      destroy: true,
      error: null,
      loading: false
    };

    /**
     * Custom submit handler for the form.
     *
     * @private
     * @param event
     * @function
     * @param {object} props The properties available to the the parent component.
     * @returns {Function} Connected event handler for the submit action type.
     */
    handleSubmit = event => {
      const { disabled, errorForm, id, loading, onSubmit, payload, submitForm, validate } = this.props;

      event.preventDefault();

      return new Promise((resolve, reject) => {
        if (!loading && !disabled) {
          handleFormValidation(validate)(payload)
            .then(() => submitForm(id, payload, onSubmit) && resolve())
            .catch(error => errorForm(id, error) && reject(error));
        } else {
          resolve();
        }
      });
    };

    /**
     * Returns only the component properties that need to be passed to the child component.
     *
     * @function
     * @memberof WrappedComponent
     * @returns {FormComponentProps} A new object that contains the props to pass down to the wrapped component.
     */
    getFormProps() {
      return {
        ...Object.keys(this.props)
          .filter(
            name =>
              ![
                'createForm',
                'destroy',
                'destroyForm',
                'errorForm',
                'payload',
                'ready',
                'submitForm',
                'validate'
              ].includes(name)
          )
          .reduce((result, name) => {
            result[name] = this.props[name];

            return result;
          }, {}),
        onSubmit: this.handleSubmit
      };
    }

    /**
     * Creates the form state before the first render.
     *
     * @class
     * @param {object} props The properties available to the component.
     */
    constructor(props) {
      super(props);

      const { createForm, id, ready } = props;

      if (typeof id === 'undefined') {
        throw Error('No form identifier.');
      }

      if (!ready) {
        setTimeout(() => createForm(id), 1);
      }
    }

    /**
     * Removes the form state when the component unmounts.
     *
     * @function
     * @memberof WrappedComponent
     * @returns {undefined} Function does not return a value.
     */
    componentWillUnmount() {
      const { destroy, id, destroyForm } = this.props;

      if (destroy) {
        setTimeout(() => destroyForm(id), 1);
      }
    }

    /**
     * Renders the child component whenever the props have changed.
     *
     * @function
     * @memberof WrappedComponent
     * @returns {object} React JSX to render the child component.
     */
    render() {
      const { props } = this;
      const { destroy, id } = props;
      const context = { destroy, id };
      const formProps = this.getFormProps();

      return (
        <FormContext.Provider value={context}>
          <Component {...formProps} />
        </FormContext.Provider>
      );
    }
  }

  WrappedComponent.displayName = 'WithForm(WrappedComponent)';

  return withRedux(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};
