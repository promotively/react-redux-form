[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Version](https://badge.fury.io/js/%40promotively%2Freact-redux-form.svg)](https://badge.fury.io/js/%40promotively%2Freact-redux-form)
[![Coverage Status](https://coveralls.io/repos/github/promotively/react-redux-form/badge.svg)](https://coveralls.io/github/promotively/react-redux-form)
[![Build Status](https://codebuild.us-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiN3BRdWU4eHhaOU50VG9oZEhsaHJ4YmJxQWVXNmhyVUdpN21MQk0zVTNMRVQ4clFTOTA3TXdnNU5EUFFyaEUxTktnVzFkV0J4azNZZG03R3p3eFNhR0FNPSIsIml2UGFyYW1ldGVyU3BlYyI6Ikt4R0REVk5ZQlZwQnAyY3EiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)](https://aws.amazon.com/codebuild)
[![GitHub Issues](https://img.shields.io/github/issues/promotively/react-redux-form.svg)](https://github.com/promotively/react-redux-form/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/promotively/react-redux-form.svg)](https://GitHub.com/promotively/react-redux-form/pull/)

# @promotively/react-redux-form

Universal/isomorphic react.js/redux.js library for building forms.

## Why?

* You are using redux.js in your app.
* You are frustrated with using redux-form.
* You want an easy yet powerful way to build forms.
* You are building a new app and want to use redux.js to handle your form state.
* You have existing repetitive form related react.js/redux.js boilerplate that you want to refactor.
* You want a proper form abstraction layer but don't have the time to build one.
* You want to be able to debug your forms through redux dev tools.
* You need a library that is compatible with server side rendering.
* You need to handle advanced A/B testing scenarios with your forms.
* You need to integrate with external applications and/or tools.
* You need to know if a form or input has been touched, changed or completed.
* You need client side error validation on a form or form input(s).

## Installation

Requires **React 16.8.3 or later and Redux 7.0.0 or later.**

With Yarn

`yarn add @promotively/react-redux-form`

With NPM

`npm install @promotively/react-redux-form`

## Example

A working example is available inside the ```/example``` folder.

Once you have executed ```yarn build``` go to the ```dist/example``` folder and from there you can open the ```index.html``` file to run the example.

An example is also [available online](https://promotively-react-redux-form.s3-us-west-1.amazonaws.com/example/index.html).

## Documentation

The source code is documented using JSDoc syntax and documentation is generated using [esdoc](https://github.com/esdoc/esdoc).

Once you have executed ```yarn docs``` documentation is available inside the ```dist/docs``` folder.

Documentation for the most recent release is also [available online](https://promotively-react-redux-form.s3-us-west-1.amazonaws.com/docs/index.html).

## Setup

Add ```formReducer``` and ```formInputReducer``` to your redux store and make sure that ```redux-thunk``` is also added to your store middleware.

```javascript
// store.js

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { formReducer, formInputReducer } from '@promotively/react-redux-form';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({ 
    form: formReducer,
    formInput: formInputReducer
  }),
  applyMiddleware(...[ thunk ])
);

export default store;
```

## Usage

Wrap a react form component using the ```withForm``` higher order component.

Note: You can use the provided ```Form``` component or use your own.

```javascript
// containers/form.js

import { Form, withForm } from '@promotively/react-redux-form';

const FormContainer = withForm(Form);

export default FormContainer;
```

Wrap a react form input component using the ```withFormInput``` higher order component.

Note: You can use the provided ```FormInput``` component or use your own.

```javascript
// components/form-input.js
import { FormInput } from '@promotively/react-redux-form';
import React from 'react';

const WrappedFormInput = (props) => (
  <label>
    <span>{props.name}</span>
    <FormInput {...props} />
  </label>
);

export default WrappedFormInput;
```

```javascript
// containers/form-input.js

import FormInput from '../components/form-input';
import { withFormInput } from '@promotively/react-redux-form';

const FormInputContainer = withFormInput(FormInput);

export default FormInputContainer;
```

Use your form and form input container components to compose a form. (id is the only prop that is required)

```javascript
// components/form.js

import React from 'react';
import FormContainer from '../containers/form';
import FormInputContainer from '../containers/form-input';

const LoginForm = (props) => (
  <FormContainer id={props.id}>
    <FormInputContainer id="email" name="Email" type="email" />
    <FormInputContainer id="password" name="Password" type="password" />
    <button disabled={props.disabled}>Submit</button>
  </FormContainer>
);

export default LoginForm;
```

```javascript
// app.js

import createReduxStore from './store';
import { render } from 'react-dom';

const store = createReduxStore();
const app = (
  <Provider store={store}>
    <LoginForm id="login-form" />
  </Provider>
);

render(app, document.getElementsByTagName('main')[0]);
```

Add an onSubmit handler to the form (optional).

```javascript
// containers/login-form.js
import axios from 'axios';
import React from 'react';

const handleFormSubmit = (data) => (
  axios.post('http://localhost:3000/api/v1/login', data).then((response) => (
    response.data
  ))
);

const LoginFormContainer = (props) => (
  <LoginForm id={props.id} disabled={props.disabled} onSubmit={handleFormSubmit} />
);

export default LoginFormContainer;
```

```javascript
// component/login-form.js

import React from 'react';
import FormContainer from '../containers/form';
import FormInputContainer from '../containers/form-input';

const LoginForm = (props) => (
  <FormContainer id={props.id} onSubmit={props.onSubmit}>
    <FormInputContainer id="email" name="Email" type="email" />
    <FormInputContainer id="password" name="Password" type="password" />
    <button disabled={props.disabled}>Submit</button>
  </FormContainer>
);

export default LoginForm;
```

Add inline error handling to the form (optional).

```javascript
// containers/login-form.js
import axios from 'axios';
import React from 'react';

const handleFormValidation = (data) => (
  new Promise((resolve, reject) => {
    if (!data.email.includes('@')) {
      reject(new Error('Must be a valid email address.'));
    } else {
      resolve();
    }
  })
);

const handleFormSubmit = (data) => (
  axios.post('http://localhost:3000/api/v1/login', data).then((response) => (
    response.data
  ))
);

const LoginFormContainer = (props) => (
  <LoginForm id={props.id} disabled={props.disabled} onValidateForm={handleFormValidation} onSubmit={handleFormSubmit} />
);

export default LoginFormContainer;
```

```javascript
// component/login-form.js

import React from 'react';
import FormContainer from '../containers/form';
import FormInputContainer from '../containers/form-input';

const LoginForm = (props) => (
  <FormContainer id={props.id} onValidate={props.onValidateForm} onSubmit={props.onSubmit}>
    <FormInputContainer id="email" name="Email" type="email" />
    <FormInputContainer id="password" name="Password" type="password" />
    <button disabled={props.disabled}>Submit</button>
  </FormContainer>
);

export default LoginForm;
```

Add a default value to a form input (optional).

```javascript
// component/login-form.js

import React from 'react';
import FormContainer from '../containers/form';
import FormInputContainer from '../containers/form-input';

const LoginForm = (props) => (
  <FormContainer id={props.id} onValidate={props.onValidateForm} onSubmit={props.onSubmit}>
    <FormInputContainer id="email" name="Email" type="email" defaultValue="name@example.com" />
    <FormInputContainer id="password" name="Password" type="password" />
    <button disabled={props.disabled}>Submit</button>
  </FormContainer>
);

export default LoginForm;
```

Add inline error handling to the form inputs (optional).

```javascript
// containers/login-form.js
import axios from 'axios';
import React from 'react';

const handleFormEmailValidation = (value) => (
  new Promise((resolve, reject) => {
    if (!value) {
      reject(new Error('Required'));
    else if (!value.includes('@')) {
      reject(new Error('Invalid'));
    } else {
      resolve();
    }
  })
);

const handleFormPasswordValidation = (value) => (
  new Promise((resolve, reject) => {
    if (!value) {
      reject(new Error('Required'));
    } else {
      resolve();
    }
  })
);

const handleFormSubmit = (data) => (
  axios.post('http://localhost:3000/api/v1/login', data).then((response) => (
    response.data
  ))
);

const LoginFormContainer = (props) => (
  <LoginForm id={props.id} disabled={props.disabled} onValidateEmail={handleFormEmailValidation} onValidatePassword={handleFormPasswordValidation} onSubmit={handleFormSubmit} />
);

export default LoginFormContainer;
```

```javascript
// component/login-form.js

import React from 'react';
import FormContainer from '../containers/form';
import FormInputContainer from '../containers/form-input';

const LoginForm = (props) => (
  <FormContainer id={props.id} onSubmit={props.onSubmit}>
    <FormInputContainer id="email" name="Email" type="email" onValidate={props.onValidateEmail} />
    <FormInputContainer id="password" name="Password" type="password" onValidate={props.onValidatePassword} />
    <button disabled={props.disabled}>Submit</button>
  </FormContainer>
);

export default LoginForm;
```

## API

### Redux Action Creators

| Function | Arguments | Description |
| --- | --- | --- |
| `completeForm` | (formId) | Completes a form. |
| `createForm` | (formId) | Create a form. |
| `errorForm` | (formId, error) | Set the error state on a form. |
| `loadingForm` | (formId) | Sets the loading state on a form. |
| `submitForm` | (formId, data, action) | Submit a form. |
| `removeForm` | (formId) | Remove a form. |
| `blurFormInput` | (formId, inputId) | Blur a form input. |
| `changeFormInput` | (formId, inputId, defaultValue, newValue) | Change the value of a form input. |
| `completeFormInput` | (formId, inputId) | Complete the value of a form input. |
| `createFormInput` | (formId, inputId, defaultValue) | Create a form input. |
| `disableFormInput` | (formId, inputId) | Disable a form input. |
| `enableFormInput` | (formId, inputId) | Enable a form input. |
| `errorFormInput` | (formId, inputId, error) | Set the error on a form input. |
| `focusFormInput` | (formId, inputId) | Focus a form input. |
| `removeFormInput` | (formId, inputId) | Remove a form input. |

### React Components

| Function | Arguments | Description | Props
| --- | --- | --- | --- |
| `Form` | (Component) | Any react.js form component | { HTMLFormElementProps, HTMLElementProps } |
| `FormInput` | (Component) | Any react.js form input component | { HTMLInputElementProps, HTMLElementProps } |

### React Higher Order Components

| Function | Arguments | Description | Props
| --- | --- | --- | --- |
| `withForm` | (Component) | Higher order react.js component that handles forms. | { active, complete, data, dirty, error, errorForm, loading, onValidate, HTMLFormElementProps, HTMLElementProps}
| `withFormInput` | (Component) | Higher order react.js component that handles form inputs. | { active, blurFormInput, changeFormInput, complete, completeFormInput, defaultValue, dirty, error, errorFormInput, focus, focusFormInput, onValidate, HTMLInputElementProps, HTMLElementProps}

### Redux Reducers

| Function | Description |
| --- | --- 
| `formReducer` | A redux.js reducer function to handle the state mutations for forms. |
| `formInputReducer` | A redux.js reducer function to handle the state mutations for form inputs. |

### React Redux Selectors

| Function | Description |
| --- | --- |
| `createFormActiveSelector` | Create a reselect.js selector function to get the form active state. |
| `createFormCompleteSelector` | Create a reselect.js selector function to get the form complete state. |
| `createFormDataSelector` | Create a reselect.js selector function to get the form data. |
| `createFormDirtySelector` | Create a reselect.js selector function to get the form dirty state. |
| `createFormDisabledSelector` | Create a reselect.js selector function to get the form disabled state. |
| `createFormErrorSelector` | Create a reselect.js selector function to get the form error state. |
| `createFormLoadingSelector` | Create a reselect.js selector function to get the form loading state. |
| `createFormInputActiveSelector` | Create a reselect.js selector function to get the form input active state. |
| `createFormInputCompleteSelector` | Create a reselect.js selector function to get the form input complete state. |
| `createFormInputDirtySelector` | Create a reselect.js selector function to get the form input dirty state. |
| `createFormInputDisabledSelector` | Create a reselect.js selector function to get the form input disabled state. |
| `createFormInputErrorSelector` | Create a reselect.js selector function to get the form input error state. |
| `createFormInputFocusSelector` | Create a reselect.js selector function to get the form input focus state. |
| `createFormInputValueSelector` | Create a reselect.js selector function to get the form input value state. |

## Build

All build artifacts can be found inside the ```dist/lib``` and ```dist/example``` folders after running ```yarn build```.

## Linting

This library uses [@promotively/eslint-config](https://www.github.com/promotively/eslint-config) and [@promotively/eslint-config-react](https://www.github.com/promotively/eslint-config-react) for its ESLint configuration.

```
yarn lint
```

## Tests

This library has 100% unit test code coverage.

Code coverage is available inside the ```dist/coverage``` folder after running ```yarn test```.

Code coverage for the most recent release is also [available online](https://promotively-react-redux-form.s3-us-west-1.amazonaws.com/tests/index.html).

## Feedback

Feedback is more than welcome via [GitHub](https://www.github.com/promotively), [Twitter](https://www.twitter.com/promotively) or our [Website](https://www.promotively.com).

## License

MIT
