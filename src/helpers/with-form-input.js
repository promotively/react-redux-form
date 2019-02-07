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
  createFormInput,
  removeFormInput,
  blurFormInput,
  focusFormInput,
  changeFormInput,
  completeFormInput,
  errorWithFormInput
} from 'actions/form-input';
import createFormInputActiveSelector from 'selectors/form-input-active';
import createFormInputCompleteSelector from 'selectors/form-input-complete';
import createFormInputDirtySelector from 'selectors/form-input-dirty';
import createFormInputDisabledSelector from 'selectors/form-input-disabled';
import createFormInputErrorSelector from 'selectors/form-input-error';
import createFormInputFocusSelector from 'selectors/form-input-focus';
import createFormInputValueSelector from 'selectors/form-input-value';
import { FormContext } from 'helpers/with-form';
import React from 'react';
import { connect as withRedux } from 'react-redux';

/**
 * @typedef WrappedFormInputComponentProps
 * @type {object}
 * @property {boolean} active Form input active state.
 * @property {function} blurFormInput Redux action to blur the form input.
 * @property {function} changeFormInput Redux action to change the form input value.
 * @property {boolean} complete Form input complete state.
 * @property {function} completeFormInput Redux action to complete the form input value.
 * @property {boolean} defaultValue The default value of the form input.
 * @property {boolean} dirty Form input dirty state.
 * @property {string} error Form input error state.
 * @property {function} errorWithFormInput Redux action to change the form input error.
 * @property {string} formId The form id.
 * @property {string} id The form input id.
 * @property {boolean} focus Form input focus state.
 * @property {function} focusFormInput Redux action to focus the form input.
 * @property {function} onValidate Function that returns a promise that can resolve any errors with the form input value.
 * @property [HTMLInputElementProps]  Any props you might usually use with a react form input component.
 * @property [HTMLElementProps]  Any props you might usually use with a react component that renders HTMLElement's.
*/

/**
 * Maps the state from the store back to props that are passed down to the container component.
 * @function
 * @param {object} state The current state of the store.
 * @param {object} props The properties available to the the parent component.
 *
 * @returns {object} Mapped properties from the store.
 */
const mapStateToProps = (state, props) => {
  const formInputActiveSelector = createFormInputActiveSelector();
  const formInputCompleteSelector = createFormInputCompleteSelector();
  const formInputDirtySelector = createFormInputDirtySelector();
  const formInputDisabledSelector = createFormInputDisabledSelector();
  const formInputErrorSelector = createFormInputErrorSelector();
  const formInputFocusSelector = createFormInputFocusSelector();
  const formInputValueSelector = createFormInputValueSelector();

  return {
    active: formInputActiveSelector(state, props),
    complete: formInputCompleteSelector(state, props),
    dirty: formInputDirtySelector(state, props),
    disabled: formInputDisabledSelector(state, props),
    error: formInputErrorSelector(state, props),
    focus: formInputFocusSelector(state, props),
    value: formInputValueSelector(state, props)
  };
};

/**
 * The action creators to wrap with react-redux.
 * @constant
 * @type {object}
 */
const mapDispatchToProps = {
  blurFormInput,
  changeFormInput,
  completeFormInput,
  createFormInput,
  errorWithFormInput,
  focusFormInput,
  removeFormInput
};

/**
 * Custom error handler for the form input.
 * @function
 * @param {object} props The properties available to the the parent component.
 *
 * @returns {function} Asychronous function that returns a promise to be resolved.
 */
const handleError = (props) => (id, value) => {
  const { onValidate } = props;

  return new Promise((resolve, reject) => {
    if (!onValidate) {
      resolve();
    } else {
      onValidate(id, value).then(resolve).catch(reject);
    }
  });
};

/**
 * Changes the value of a form input.
 * @function
 * @param {string} defaultValue The initial value for the form input.
 *
 * @returns {function} Function that returns an event handler for the change and error action types.
 */
const handleChange = (defaultValue) => (props) => (event) => {
  const { value } = event.target;
  const {
    changeFormInput,
    error,
    formId,
    id: inputId,
    completeFormInput,
    errorWithFormInput
  } = props;

  changeFormInput(formId, inputId, defaultValue, value);

  handleError(props)(inputId, value)
    .then(() => error && completeFormInput(formId, inputId))
    .catch((error) => (
      props.error !== error && errorWithFormInput(formId, inputId, error.message)
    ));
};

/**
 * Blurs on a form input.
 * @function
 * @param {object} props The properties available to the the parent component.
 *
 * @returns {function} Connected event handler for the blur action type.
 */
const handleBlur = (props) => () => {
  const { formId, id: inputId, blurFormInput } = props;

  blurFormInput(formId, inputId);
};

/**
 * Focuses on a form input.
 * @function
 * @param {object} props The properties available to the the parent component.
 *
 * @returns {function} Connected event handler for the focus action type.
 */
const handleFocus = (props) => () => {
  const { formId, id: inputId, focusFormInput } = props;

  focusFormInput(formId, inputId);
};

/**
 * Creates a new component that has the formId property.
 * @function
 * @param {function} Component The wrapped withFormInput higher order component to pass the form id down to.
 *
 * @returns {function} The wrapped withFormInput higher order component with the form id.
 */
const withContext = (Component) => {
  const WrappedComponent = (props) => (
    <FormContext.Consumer>
      {(context) => (
        context && context.id ? <Component {...props} formId={context.id} /> : null
      )}
    </FormContext.Consumer>
  );

  WrappedComponent.displayName = `WithContext(${Component.displayName})`;

  return WrappedComponent;
};

/**
 * Creates a new component wrapped by the withFormInput higher order component.
 * @function
 * @param {function} Component Form input component to wrap.
 *
 * @returns {function} The connected and wrapped withFormInput higher order component with the form id.
 */
const withFormInput = (Component) => {

  class WrappedComponent extends React.PureComponent {

    /**
     * The default props passed down to the component.
     * @static
     * @memberof WrappedComponent
     * @type {object}
     */
    static defaultProps = {
      active: false,
      complete: false,
      defaultValue: '',
      disabled: false,
      error: '',
      focus: false,
      value: ''
    }

    /**
     * Creates the form input state with its initial value and/or error before the first render.
     * @class
     * @param {object} props The properties available to the component.
     */
    constructor(props) {
      super(props);

      const {
        createFormInput,
        errorWithFormInput,
        formId,
        id: inputId,
        defaultValue
      } = props;

      createFormInput(formId, inputId, defaultValue);

      handleError(props)(inputId, defaultValue).catch((error) => {
        errorWithFormInput(formId, inputId, error.message);
      });
    }

    /**
     * Returns only the component properties that need to be passed to the child component.
     * @function
     * @memberof WrappedComponent
     * @returns {object} New object that does not contain props only needed for the parent component.
     */
    getComponentProps() {
      const { props } = this;

      return {
        ...Object.keys(props).filter((name) => (
          ![
            'createFormInput',
            'removeFormInput'
          ].includes(name)
        )).reduce((result, name) => {
          result[name] = props[name];

          return result;
        }, {}),
        onBlur: handleBlur(props),
        onChange: handleChange(props.defaultValue)(props),
        onFocus: handleFocus(props)
      };
    }

    /**
     * Removes the form input state when the component unmounts.
     * @function
     * @memberof WrappedComponent
     * @returns {undefined} Function does not return a value.
     */
    componentWillUnmount() {
      const { formId, id: inputId, removeFormInput } = this.props;

      removeFormInput(formId, inputId);
    }

    /**
     * Renders the form input component whenever the form input state changes.
     * @function
     * @memberof WrappedComponent
     * @returns {object} React JSX to render the child component.
     */
    render() {
      const props = this.getComponentProps();

      return <Component {...props} />;
    }

  }

  WrappedComponent.displayName = `WithFormInput(${Component.displayName})`;

  return withContext(withRedux(mapStateToProps, mapDispatchToProps)(WrappedComponent));
};

export default withFormInput;
