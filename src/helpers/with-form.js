/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/*
 * @see {@link https://github.com/facebook/react}
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/react-redux}
 */

/* eslint-disable react/prop-types */

import React from 'react';
import { connect as withRedux } from 'react-redux';
import { createForm, errorForm, removeForm, submitForm } from 'actions/form';
import createFormActiveSelector from 'selectors/form-active';
import createFormCompleteSelector from 'selectors/form-complete';
import createFormDataSelector from 'selectors/form-data';
import createFormDirtySelector from 'selectors/form-dirty';
import createFormDisabledSelector from 'selectors/form-disabled';
import createFormErrorSelector from 'selectors/form-error';
import createFormLoadingSelector from 'selectors/form-loading';
import FormContext from 'helpers/form-context';

/**
 * Maps the state from the redux.js store back to props that are passed down to the react.js component.
 * @function
 * @param {Object} state The current state of the redux.js store.
 * @param {Object} props The properties available to the the parent react.js component.
 * @returns {Object} Mapped properties from the redux.js store.
 */
const mapStateToProps = (state, props) => {
  const { id: formId } = props;
  const formActiveSelector = createFormActiveSelector(formId);
  const formCompleteSelector = createFormCompleteSelector(formId);
  const formDataSelector = createFormDataSelector(formId);
  const formDirtySelector = createFormDirtySelector(formId);
  const formDisabledSelector = createFormDisabledSelector(formId);
  const formErrorSelector = createFormErrorSelector(formId);
  const formLoadingSelector = createFormLoadingSelector(formId);

  return {
    active: formActiveSelector(state, props),
    complete: formCompleteSelector(state, props),
    data: formDataSelector(state, props),
    dirty: formDirtySelector(state, props),
    disabled: formDisabledSelector(state, props),
    error: formErrorSelector(state, props),
    loading: formLoadingSelector(state, props)
  };
};

/**
 * The redux.js action creators to wrap with react-redux.
 * @constant
 * @type {Object}
 */
const mapDispatchToProps = {
  createForm,
  errorForm,
  removeForm,
  submitForm
};

/**
 * Custom error handler for the form.
 * @function
 * @param {Object} props The properties available to the the parent component.
 * @returns {Function} A function that creates a function that returns a promise to be resolved.
 */
const handleValidation = props => data =>
  new Promise((resolve, reject) => {
    if (!props.onValidate) {
      resolve();
    } else {
      props.onValidate(data).then(resolve).catch(reject);
    }
  });

/**
 * Custom submit handler for the form.
 * @function
 * @param {Object} props The properties available to the the parent component.
 * @returns {Function} Connected event handler for the submit action type.
 */
const handleSubmit = props => event => {
  const { errorForm, onSubmit, data, id, dirty, disabled, loading, submitForm } = props;

  event.preventDefault();

  return new Promise((resolve, reject) => {
    if (onSubmit && !loading && !disabled && dirty) {
      handleValidation(props)(data)
        .then(() => {
          submitForm(id, data, onSubmit);

          return resolve();
        })
        .catch(error => {
          errorForm(id, error);

          return reject(error);
        });
    } else {
      resolve();
    }
  });
};

/**
 * Creates a new component wrapped by the withForm higher order component.
 * @function
 * @param {Object} options An object containing configuration options.
 * @returns {Function} A function that that wraps your form component using the withForm higher order component.
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
const withForm = options => Component => {
  class WrappedComponent extends React.PureComponent {
    /**
     * @typedef WrappedFormComponentProps
     * @type {Object}
     * @property {Boolean} active Form active state.
     * @property {Boolean} complete Form complete state.
     * @property {Object} data Current form payload data.
     * @property {Boolean} dirty Form dirty state.
     * @property {String} error Form error state.
     * @property {Function} errorForm Redux action to change the form error state.
     * @property {String} id The ID for the form.
     * @property {Boolean} loading Form loading state.
     * @property {Function} onSubmit Function that returns a promise that resolves to an api endpoint.
     * @property {Function} onValidate Function that returns a promise that can resolve any errors with the form values.
     * @property [HTMLFormElementProps]  Any props you might usually use with a react form component.
     * @property [HTMLElementProps]  Any props you might usually use with a react component that renders HTMLElement's.
     */

    /**
     * The default configuration options for this component.
     * @constant
     * @type {Object}
     */
    defaults = {
      destroy: true
    };

    /**
     * The default configuration options merged with the specified options.
     * @constant
     * @type {Object}
     */
    options = {
      ...this.defaults,
      ...options
    };

    /**
     * Returns only the component properties that need to be passed to the child component.
     * @function
     * @memberof WrappedComponent
     * @returns {WrappedFormComponentProps} A new object that contains the props to pass down to the wrapped component.
     */
    getComponentProps() {
      return {
        ...Object.keys(this.props)
          .filter(name => !['data', 'createForm', 'errorForm', 'removeForm', 'submitForm'].includes(name))
          .reduce((result, name) => {
            result[name] = this.props[name];

            return result;
          }, {}),
        onSubmit: handleSubmit(this.props)
      };
    }

    /**
     * Creates the form state before the first render.
     * @class
     * @param {Object} props The properties available to the component.
     */
    constructor(props) {
      super(props);

      const { createForm, id } = props;

      setTimeout(() => createForm(id), 1);
    }

    /**
     * Removes the form state when the component unmounts.
     * @function
     * @memberof WrappedComponent
     * @returns {Undefined} Function does not return a value.
     */
    componentWillUnmount() {
      const { destroy } = this.options;
      const { id, removeForm } = this.props;

      if (destroy) {
        setTimeout(() => removeForm(id), 1);
      }
    }

    /**
     * Renders the child component whenever the props have changed.
     * @function
     * @memberof WrappedComponent
     * @returns {Object} React JSX to render the child component.
     */
    render() {
      const props = this.getComponentProps();
      const context = {
        id: props.id
      };

      return (
        <FormContext.Provider value={context}>
          <Component {...props} />
        </FormContext.Provider>
      );
    }
  }

  WrappedComponent.displayName = 'WithForm(WrappedComponent)';

  return withRedux(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};

export default withForm;
