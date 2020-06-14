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
import {
  createFormInput,
  blurFormInput,
  focusFormInput,
  changeFormInput,
  completeFormInput,
  errorFormInput,
  destroyFormInput
} from 'actions/form-input';
import { createFormInputActiveSelector } from 'selectors/form-input-active';
import { createFormInputCompleteSelector } from 'selectors/form-input-complete';
import { createFormInputDirtySelector } from 'selectors/form-input-dirty';
import { createFormInputDisabledSelector } from 'selectors/form-input-disabled';
import { createFormInputErrorSelector } from 'selectors/form-input-error';
import { createFormInputFocusSelector } from 'selectors/form-input-focus';
import { createFormInputValueSelector } from 'selectors/form-input-value';
import { FormContext } from 'helpers/form-context';

/**
 * Maps the state from the redux.js store back to props that are passed down
 * to the react.js component.
 * @function
 * @param {Object} state The current state of the store.
 * @param {Object} props The properties available to the the parent component.
 * @returns {Object} Mapped properties from the redux.js store.
 */
const mapStateToProps = (state, props) => {
  const { formId, id: inputId } = props;
  const formInputActiveSelector = createFormInputActiveSelector(formId, inputId);
  const formInputCompleteSelector = createFormInputCompleteSelector(formId, inputId);
  const formInputDirtySelector = createFormInputDirtySelector(formId, inputId);
  const formInputDisabledSelector = createFormInputDisabledSelector(formId, inputId);
  const formInputErrorSelector = createFormInputErrorSelector(formId, inputId);
  const formInputFocusSelector = createFormInputFocusSelector(formId, inputId);
  const formInputValueSelector = createFormInputValueSelector(formId, inputId);

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
 * The redux.js action creators to wrap with react-redux.
 * @constant
 * @type {Object}
 */
const mapDispatchToProps = {
  blurFormInput,
  changeFormInput,
  completeFormInput,
  createFormInput,
  destroyFormInput,
  errorFormInput,
  focusFormInput
};

/**
 * (A)synchronous form validation handler.
 * @function
 * @param {Object} props The properties available to the the parent component.
 * @returns {Function} A function that creates a function that returns a promise to be resolved.
 */
const handleValidation = props => (id, value) =>
  new Promise((resolve, reject) => {
    if (!props.validate) {
      resolve();
    } else {
      const validator = props.validate(id, value);

      if (validator instanceof Promise) {
        validator.then(resolve).catch(reject);
      } else if (validator) {
        reject(new Error(validator));
      } else {
        resolve(validator);
      }
    }
  });

/**
 * Changes and validates the value of a form input.
 * @function
 * @param {Object} initialValue The initial value of the form input.
 * @returns {Function} A function that returns an event handler for the change and error action types.
 */
const handleChange = initialValue => props => event => {
  const { value } = event.target;
  const { changeFormInput, error, formId, id: inputId, completeFormInput, errorFormInput, onChange } = props;

  if (onChange) {
    onChange(event);
  }

  changeFormInput(formId, inputId, initialValue, value);

  return handleValidation(props)(inputId, value)
    .then(() => error && completeFormInput(formId, inputId))
    .catch(error => props.error !== error && errorFormInput(formId, inputId, error.message));
};

/**
 * Blurs a form input.
 * @function
 * @param {Object} props The properties available to the the parent component.
 * @returns {Function} Connected event handler for the blur action type.
 */
const handleBlur = props => event => {
  const { formId, id: inputId, blurFormInput, onBlur } = props;

  if (onBlur) {
    onBlur(event);
  }

  blurFormInput(formId, inputId);
};

/**
 * Focuses a form input.
 * @function
 * @param {Object} props The properties available to the the parent component.
 * @returns {Function} Connected event handler for the focus action type.
 */
const handleFocus = props => event => {
  const { formId, id: inputId, focusFormInput, onFocus } = props;

  if (onFocus) {
    onFocus(event);
  }

  focusFormInput(formId, inputId);
};

/**
 * Creates a new component that has the formId property.
 * @function
 * @param {Function} Component The wrapped withFormInput higher order component to pass the form id down to.
 * @returns {Function} The wrapped withFormInput higher order component with the form id.
 */
const withFormContext = Component => {
  const WrappedComponent = props => (
    <FormContext.Consumer>
      {context =>
        context && context.id ? <Component {...props} destroy={context.destroy} formId={context.id} /> : null
      }
    </FormContext.Consumer>
  );

  WrappedComponent.displayName = 'WithFormContext(WrappedComponent)';

  return WrappedComponent;
};

/**
 * Creates a new component wrapped by the withFormInput higher order component.
 * @function
 * @param {Function} Component A react.js form input component.
 * @returns {Function} A react.js component that that wraps your form input component
 * using the withFormInput higher order component.
 * @example
 * ...
 *
 * import { withFormInput } from '@promotively/react-redux-form';
 *
 * const FormInput = (props) => (
 *   <input {...props} />
 * );
 * const FormInputContainer = withFormInput(FormInput);
 *
 * ...
 */
export const withFormInput = Component => {
  class WrappedComponent extends React.PureComponent {
    /**
     * @typedef WrappedFormInputComponentProps
     * @type {Object}
     * @property {Boolean} active Form input active state.
     * @property {Function} blurFormInput Redux action to blur the form input.
     * @property {Function} changeFormInput Redux action to change the form input value.
     * @property {Boolean} complete Form input complete state.
     * @property {Function} completeFormInput Redux action to complete the form input value.
     * @property {Boolean} value The value of the form input.
     * @property {Boolean} dirty Form input dirty state.
     * @property {String} error Form input error state.
     * @property {Function} errorFormInput Redux action to change the form input error.
     * @property {String} formId The form id.
     * @property {String} id The form input id.
     * @property {Boolean} focus Form input focus state.
     * @property {Function} focusFormInput Redux action to focus the form input.
     * @property {Function} validate Function that returns a promise that can
     * resolve any errors with the form input value.
     * @property [HTMLInputElementProps]  Any props you might usually use with a react form input component.
     * @property [HTMLElementProps]  Any props you might usually use with a react component that renders HTMLElement's.
     */

    /**
     * The default props passed down to the component.
     * @static
     * @memberof WrappedComponent
     * @type {Object}
     */
    static defaultProps = {
      active: false,
      complete: false,
      destroy: true,
      disabled: false,
      error: null,
      focus: false,
      value: ''
    };

    /**
     * Creates the form input state with its initial value and/or error before the first render.
     * @class
     * @param {Object} props The properties available to the component.
     */
    constructor(props) {
      super(props);

      const { createFormInput, errorFormInput, formId, id: inputId, value } = props;

      this.initialValue = value;

      setTimeout(() => {
        createFormInput(formId, inputId, value);

        handleValidation(props)(inputId, value).catch(error => {
          errorFormInput(formId, inputId, error.message);
        });
      }, 1);
    }

    /**
     * Returns only the component properties that need to be passed to the child component.
     * @function
     * @memberof WrappedComponent
     * @returns {WrappedFormInputComponentProps} A new object that contains the
     * props to pass down to the wrapped component.
     */
    getComponentProps() {
      const { props } = this;

      return {
        ...Object.keys(props)
          .filter(
            name =>
              ![
                'blurFormInput',
                'changeFormInput',
                'completeFormInput',
                'createFormInput',
                'destroy',
                'errorFormInput',
                'focusFormInput',
                'destroyFormInput'
              ].includes(name)
          )
          .reduce((result, name) => {
            result[name] = props[name];

            return result;
          }, {}),
        onBlur: handleBlur(props),
        onChange: handleChange(this.initialValue)(props),
        onFocus: handleFocus(props)
      };
    }

    /**
     * Removes the form input state when the component unmounts.
     * @function
     * @memberof WrappedComponent
     * @returns {Undefined} Function does not return a value.
     */
    componentWillUnmount() {
      const { destroy, formId, id: inputId, destroyFormInput } = this.props;

      if (destroy) {
        setTimeout(() => destroyFormInput(formId, inputId), 1);
      }
    }

    /**
     * Renders the form input component whenever the form input state changes.
     * @function
     * @memberof WrappedComponent
     * @returns {Object} React JSX to render the child component.
     */
    render() {
      const props = this.getComponentProps();

      return <Component {...props} />;
    }
  }

  WrappedComponent.displayName = 'WithFormInput(WrappedComponent)';

  return withFormContext(withRedux(mapStateToProps, mapDispatchToProps)(WrappedComponent));
};
