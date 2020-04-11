/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import React from 'react';

/**
 * Renders a react.js form input component.
 * @function
 * @param {Object} inputProps The properties used to render the component.
 * @returns {Function} A react.js component that renders a default or custom form input component.
 */
const FormInput = inputProps => {
  const { component: Component, render, ...props } = inputProps;

  if (Component) {
    return <Component {...props} />;
  }

  if (render) {
    return render(props);
  }

  return (
    <input
      alt={props.alt}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      checked={props.checked}
      className={props.className}
      disabled={props.disabled}
      id={props.id}
      list={props.list}
      max={props.max}
      maxLength={props.maxLength}
      min={props.min}
      minLength={props.minLength}
      multiple={props.multiple}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      src={props.src}
      step={props.step}
      style={props.style}
      type={props.type}
      value={props.value}
    />
  );
};

export default FormInput;
