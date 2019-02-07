/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import {
  createForm,
  errorWithForm,
  removeForm,
  submitForm
} from 'actions/form';
import createFormActiveSelector from 'selectors/form-active';
import createFormCompleteSelector from 'selectors/form-complete';
import createFormDataSelector from 'selectors/form-data';
import createFormDirtySelector from 'selectors/form-dirty';
import createFormDisabledSelector from 'selectors/form-disabled';
import createFormErrorSelector from 'selectors/form-error';
import createFormLoadingSelector from 'selectors/form-loading';
import React from 'react';
import { connect as withRedux } from 'react-redux';

/**
 * @typedef WrappedFormComponentProps
 * @type {object}
 * @property {boolean} active Form active state.
 * @property {boolean} complete Form complete state.
 * @property {object} data Current form payload data.
 * @property {boolean} dirty Form dirty state.
 * @property {string} error Form error state.
 * @property {function} errorWithForm Redux action to change the form error state.
 * @property {string} id The form id.
 * @property {boolean} loading Form loading state.
 * @property {function} onSubmit Function that returns a promise that resolves to an api endpoint.
 * @property {function} onValidate Function that returns a promise that can resolve any errors with the form values.
 * @property [HTMLFormElementProps]  Any props you might usually use with a react form component.
 * @property [HTMLElementProps]  Any props you might usually use with a react component that renders HTMLElement's.
*/

/**
 * The form context.
 * @constant
 * @type {object}
 */
export const FormContext = React.createContext();

/**
 * Maps the state from the store back to props that are passed down to the container component.
 * @function
 * @param {object} state The current state of the store.
 * @param {object} props The properties available to the the parent component.
 *
 * @returns {object} Mapped properties from the store.
 */
const mapStateToProps = (state, props) => {
  const formActiveSelector = createFormActiveSelector();
  const formCompleteSelector = createFormCompleteSelector();
  const formDataSelector = createFormDataSelector();
  const formDirtySelector = createFormDirtySelector();
  const formDisabledSelector = createFormDisabledSelector();
  const formErrorSelector = createFormErrorSelector();
  const formLoadingSelector = createFormLoadingSelector();

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
 * The action creators to wrap with react-redux.
 * @constant
 * @type {object}
 */
const mapDispatchToProps = {
  createForm,
  errorWithForm,
  removeForm,
  submitForm
};

/**
 * Custom error handler for the form.
 * @function
 * @param {object} props The properties available to the the parent component.
 *
 * @returns {function} Asychronous function that returns a promise to be resolved.
 */
const handleErrors = (props) => (data) => (
  new Promise((resolve, reject) => {
    if (!props.onValidate) {
      resolve();
    } else {
      props.onValidate(data).then(resolve).catch(reject);
    }
  })
);

/**
 * Custom submit handler for the form.
 * @function
 * @param {object} props The properties available to the the parent component.
 *
 * @returns {function} Connected event handler for the submit action type.
 */
const handleSubmit = (props) => (event) => {
  const {
    errorWithForm,
    onSubmit,
    data,
    dirty,
    id,
    disabled,
    loading,
    submitForm
  } = props;

  event.preventDefault();

  if (dirty && !loading && !disabled) {
    handleErrors(props)(data).then(() => (
      submitForm(id, data, onSubmit)
    )).catch((error) => (
      errorWithForm(id, error)
    ));
  }
};

/**
 * Creates a new component wrapped by the withForm higher order component.
 * @function
 * @param {function} Component React form component to wrap.
 *
 * @returns {function} The connected and wrapped withForm higher order component.
 */
const withForm = (Component) => {
  class WrappedComponent extends React.PureComponent {

    /**
     * Event handler for the form submit action type.
     * @function
     * @memberof WrappedComponent
     */
    onSubmit = handleSubmit(this.props)

    /**
     * Returns only the component properties that need to be passed to the child component.
     * @function
     * @memberof WrappedComponent
     * @returns {object} New object that does not contain props only needed for the parent component.
     */
    getComponentProps() {
      return {
        ...Object.keys(this.props).filter((name) => (
          ![
            'data',
            'createForm',
            'removeForm',
            'submitForm'
          ].includes(name)
        )).reduce((result, name) => {
          result[name] = this.props[name];

          return result;
        }, {}),
        onSubmit: handleSubmit(this.props)
      };
    }

    /**
     * Creates the form state before the first render.
     * @class
     * @param {object} props The properties available to the component.
     */
    constructor(props) {
      super(props);

      const { createForm, id } = props;

      createForm(id);
    }

    /**
     * Removes the form state when the component unmounts.
     * @function
     * @memberof WrappedComponent
     * @returns {undefined} Function does not return a value.
     */
    componentWillUnmount() {
      const { id, removeForm } = this.props;

      removeForm(id);
    }

    /**
     * Renders the child component whenever the props have changed.
     * @function
     * @memberof WrappedComponent
     * @returns {object} React JSX to render the child component.
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

  WrappedComponent.displayName = `WithForm(${Component.displayName})`;

  return withRedux(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};

export default withForm;
