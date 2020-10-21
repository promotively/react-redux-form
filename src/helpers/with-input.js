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
import {
  createInput,
  blurInput,
  focusInput,
  changeInput,
  completeInput,
  errorInput,
  destroyInput,
  disableInput
} from 'actions/input';
import { handleInputValidation } from 'helpers/validation';
import { createInputCompleteSelector } from 'selectors/input-complete';
import { createInputDirtySelector } from 'selectors/input-dirty';
import { createInputDisabledSelector } from 'selectors/input-disabled';
import { createInputErrorSelector } from 'selectors/input-error';
import { createInputFocusSelector } from 'selectors/input-focus';
import { createInputReadySelector } from 'selectors/input-ready';
import { createInputRevalidateSelector } from 'selectors/input-revalidate';
import { createInputTouchedSelector } from 'selectors/input-touched';
import { createInputValueSelector } from 'selectors/input-value';
import { parseValue, stringifyValue } from 'helpers/value';
import { withFormContext } from 'helpers/with-form-context';

/**
 * Maps the state from the redux.js store back to props that are passed down
 * to the react.js component.
 *
 * @private
 * @function
 * @param {object} state The current state of the store.
 * @param {object} props The properties available to the the parent component.
 * @returns {object} Mapped properties from the redux.js store.
 */
const mapStateToProps = (state, props) => {
  const { checked, disabled, formId, id: inputId, type, value } = props;
  const inputCompleteSelector = createInputCompleteSelector(formId, inputId);
  const inputDirtySelector = createInputDirtySelector(formId, inputId);
  const inputDisabledSelector = createInputDisabledSelector(formId, inputId, disabled);
  const inputErrorSelector = createInputErrorSelector(formId, inputId);
  const inputFocusSelector = createInputFocusSelector(formId, inputId);
  const inputReadySelector = createInputReadySelector(formId, inputId);
  const inputTouchedSelector = createInputTouchedSelector(formId, inputId);
  const inputDefaultValueSelector = createInputValueSelector(
    formId,
    inputId,
    type === 'checkbox' ? checked || false : value
  );
  const inputRevalidateSelector = createInputRevalidateSelector(formId, inputId);
  const inputValueSelector = createInputValueSelector(formId, inputId);

  return {
    complete: inputCompleteSelector(state),
    defaultDisabled: disabled,
    defaultValue: inputDefaultValueSelector(state),
    dirty: inputDirtySelector(state),
    disabled: inputDisabledSelector(state),
    error: inputErrorSelector(state),
    focus: inputFocusSelector(state),
    ready: inputReadySelector(state),
    revalidate: inputRevalidateSelector(state),
    touched: inputTouchedSelector(state),
    value: inputValueSelector(state)
  };
};

/**
 * The redux.js action creators to wrap with react-redux.
 *
 * @constant
 * @type {object}
 */
const mapDispatchToProps = {
  blurInput,
  changeInput,
  completeInput,
  createInput,
  destroyInput,
  disableInput,
  errorInput,
  focusInput
};

/**
 * @typedef InputComponentComponentProps
 * @type {object}
 * @property {boolean} dirty Form input dirty state.
 * @property {Function} blurInput Redux action to blur the input.
 * @property {Function} changeInput Redux action to change the input value.
 * @property {boolean} complete Form input complete state.
 * @property {Function} completeInput Redux action to complete the input value.
 * @property {boolean} value The value of the input.
 * @property {boolean} touched Form input touched state.
 * @property {string} error Form input error state.
 * @property {Function} errorInput Redux action to change the input error.
 * @property {string} formId The form id.
 * @property {string} id The input id.
 * @property {boolean} focus Form input focus state.
 * @property {Function} focusInput Redux action to focus the input.
 * @property {Function} validate Function that returns a promise that can
 * resolve any errors with the input value.
 * @property [HTMLInputElementProps]  Any props you might usually use with a react input component.
 * @property [HTMLElementProps]  Any props you might usually use with a react component that renders HTMLElement's.
 */

/**
 * Creates a new component wrapped by the withInput higher order component.
 *
 * @function
 * @param {Function} Component A react.js input component.
 * @returns {Function} A react.js component that that wraps your input component
 * using the withInput higher order component.
 * @example
 * ...
 *
 * import { withInput } from '@promotively/react-redux-form';
 *
 * const Input = (props) => (
 *   <input {...props} />
 * );
 * const InputContainer = withInput(Input);
 *
 * ...
 */
export const withInput = Component => {
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
      checked: false,
      complete: false,
      destroy: true,
      disabled: false,
      error: null,
      focus: false,
      options: [],
      touched: false,
      value: null
    };

    /**
     * Changes and validates the value of a input.
     *
     * @private
     * @param event
     * @function
     * @param {string|number|boolean|object|Array} defaultValue The initial value of the input.
     * @returns {Function} A function that can pass props through to the change handler.returns an event
     * handler for the change and error action types.
     */
    handleChange = event => {
      const { checked, value } = event.target;
      const { props } = this;
      const { changeInput, error, formId, id: inputId, completeInput, errorInput, onChange, type, validate } = props;

      let newValue = value;
      if (type === 'checkbox') {
        newValue = checked;
      } else {
        newValue = parseValue(newValue);
      }

      if (onChange) {
        onChange(event);
      }

      changeInput(formId, inputId, newValue);

      return handleInputValidation(validate)(inputId, newValue)
        .then(() => error && completeInput(formId, inputId))
        .catch(caughtError => caughtError !== error && errorInput(formId, inputId, caughtError.message));
    };

    /**
     * Blurs a input.
     *
     * @private
     * @param event
     * @function
     * @param {object} props The properties available to the the parent component.
     * @returns {Function} Connected event handler for the blur action type.
     */
    handleBlur = event => {
      const { formId, id: inputId, blurInput, onBlur } = this.props;

      if (onBlur) {
        onBlur(event);
      }

      blurInput(formId, inputId);
    };

    /**
     * Focuses a input.
     *
     * @private
     * @param event
     * @function
     * @param {object} props The properties available to the the parent component.
     * @returns {Function} Connected event handler for the focus action type.
     */
    handleFocus = event => {
      const { formId, id: inputId, focusInput, onFocus } = this.props;

      if (onFocus) {
        onFocus(event);
      }

      focusInput(formId, inputId);
    };

    /**
     * Returns only the component properties that need to be passed to the child component.
     *
     * @function
     * @memberof WrappedComponent
     * @returns {InputComponentComponentProps} A new object that contains the
     * props to pass down to the wrapped component.
     */
    getInputProps() {
      const { props } = this;
      const { formId, id, options, type, value } = props;

      return {
        ...Object.keys(props)
          .filter(
            name =>
              ![
                'blurInput',
                'changeInput',
                'completeInput',
                'createInput',
                'defaultDisabled',
                'defaultValue',
                'destroy',
                'disableInput',
                'errorInput',
                'focusInput',
                'formId',
                'destroyInput',
                'revalidate',
                'validate'
              ].includes(name)
          )
          .reduce((result, name) => {
            result[name] = props[name];

            return result;
          }, {}),
        id: `${formId}__${id}`,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        value: stringifyValue(value),
        ...(type === 'checkbox' ? { checked: value || false, value: true } : { checked: false }),
        ...(type === 'radio'
          ? {
              options: options.map((option, index) => ({
                ...option,
                checked: value === option.value,
                id: `${formId}__${id}_${index}`,
                name: `${formId}__${id}`
              }))
            }
          : null)
      };
    }

    /**
     * Creates the input state with its initial value and/or error before the first render.
     *
     * @class
     * @param {object} props The properties available to the component.
     */
    constructor(props) {
      super(props);

      const {
        createInput,
        disableInput,
        errorInput,
        formId,
        id: inputId,
        defaultDisabled,
        defaultValue,
        ready,
        validate
      } = props;

      if (typeof formId === 'undefined') {
        throw Error('No form identifier.');
      }

      if (typeof inputId === 'undefined') {
        throw Error('No input identifier.');
      }

      setTimeout(() => {
        if (!ready) {
          createInput(formId, inputId, defaultValue);
        }

        if (defaultDisabled) {
          disableInput(formId, inputId);
        }

        handleInputValidation(validate)(inputId, defaultValue).catch(error => {
          errorInput(formId, inputId, error.message);
        });
      }, 1);
    }

    componentDidUpdate(previousProps) {
      const { error, formId, id: inputId, completeInput, errorInput, revalidate, validate, value } = this.props;

      if (!previousProps.revalidate && revalidate) {
        handleInputValidation(validate)(inputId, value)
          .then(() => error && completeInput(formId, inputId))
          .catch(caughtError => caughtError !== error && errorInput(formId, inputId, caughtError.message));
      }
    }

    /**
     * Removes the input state when the component unmounts.
     *
     * @function
     * @memberof WrappedComponent
     * @returns {undefined} Function does not return a value.
     */
    componentWillUnmount() {
      const { destroy, formId, id: inputId, destroyInput } = this.props;

      if (destroy) {
        setTimeout(() => destroyInput(formId, inputId), 1);
      }
    }

    /**
     * Renders the input component whenever the input state changes.
     *
     * @function
     * @memberof WrappedComponent
     * @returns {object} React JSX to render the child component.
     */
    render() {
      const inputProps = this.getInputProps();

      return <Component {...inputProps} />;
    }
  }

  WrappedComponent.displayName = 'WithInput(WrappedComponent)';

  return withFormContext(withRedux(mapStateToProps, mapDispatchToProps)(WrappedComponent));
};
