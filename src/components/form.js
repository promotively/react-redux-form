/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import React from 'react';

/**
 * Renders a react.js form component.
 * @function
 * @param {Object} formProps The properties used to render the component.
 * @returns {Function} A react.js component that renders a default or custom form component.
 */
const Form = formProps => {
  const { component: Component, render, ...props } = formProps;

  if (Component) {
    return <Component {...props} />;
  }

  if (render) {
    return render(props);
  }

  return (
    <form
      autoComplete={props.autoComplete}
      className={props.className}
      id={props.id}
      onSubmit={props.onSubmit}
      style={props.style}
    >
      {props.children}
    </form>
  );
};

export default Form;
