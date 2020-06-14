[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Version](https://badge.fury.io/js/%40promotively%2Freact-redux-form.svg)](https://badge.fury.io/js/%40promotively%2Freact-redux-form)
[![Coverage Status](https://coveralls.io/repos/github/promotively/react-redux-form/badge.svg)](https://coveralls.io/github/promotively/react-redux-form)
[![Build Status](https://codebuild.us-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiN3BRdWU4eHhaOU50VG9oZEhsaHJ4YmJxQWVXNmhyVUdpN21MQk0zVTNMRVQ4clFTOTA3TXdnNU5EUFFyaEUxTktnVzFkV0J4azNZZG03R3p3eFNhR0FNPSIsIml2UGFyYW1ldGVyU3BlYyI6Ikt4R0REVk5ZQlZwQnAyY3EiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)](https://aws.amazon.com/codebuild)
[![GitHub Issues](https://img.shields.io/github/issues/promotively/react-redux-form.svg)](https://github.com/promotively/react-redux-form/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/promotively/react-redux-form.svg)](https://GitHub.com/promotively/react-redux-form/pull/)

# @promotively/react-redux-form

Universal/isomorphic react.js/redux.js library for building forms.

## Why?

- You are using redux.js in your app.
- You are frustrated with using redux-form.
- You want an easy yet powerful way to build forms.
- You are building a new app and want to use redux.js to handle your form state.
- You have existing repetitive form related react.js/redux.js boilerplate that you want to refactor.
- You want a proper form abstraction layer but don't have the time to build one.
- You want to be able to debug your forms through redux dev tools.
- You need a library that is compatible with server side rendering.
- You need to handle advanced A/B testing scenarios with your forms.
- You want to retain your form state even when a form is not rendered (ie: multi step forms)
- You need to integrate with external applications and/or tools.
- You need to know if a form or input has been touched, changed or completed.
- You need client side async/sync validation on a form or form input(s).

## Installation

With Yarn

`yarn add @promotively/react-redux-form`

With NPM

`npm install @promotively/react-redux-form`

## Example

A working example is available inside the `/example` folder.

Once you have executed `yarn build` go to the `dist/example` folder and from there you can open the `index.html` file to run the example.

The example is also [available online](https://promotively-react-redux-form.s3-us-west-1.amazonaws.com/example/index.html).

## Documentation

The source code is documented using JSDoc syntax and documentation is generated using [esdoc](https://github.com/esdoc/esdoc).

Once you have executed `yarn docs` documentation is available inside the `dist/docs` folder.

Documentation for the most recent release is also [available online](https://promotively-react-redux-form.s3-us-west-1.amazonaws.com/docs/index.html).

TypeScript definitions are also available in the `dist/lib` folder.

## Setup

Add `reducer` to your redux store and make sure that `redux-thunk` is also added to your store middleware.

```javascript
// store.js

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer } from '@promotively/react-redux-form';
import thunk from 'redux-thunk';

export const store = createStore({ form: reducer }, applyMiddleware(...[thunk]));
```

## Usage

Use the provided form and form input components to compose a form. (id is the only prop that is required)

```javascript
// components/login-form.js

import React from 'react';
import { Form, FormInput } from '@promotively/react-redux-form';

export const LoginForm = props => (
  <Form id={props.id}>
    <FormInput id="email" name="Email" type="email" />
    <FormInput id="password" name="Password" type="password" />
    <button>Submit</button>
  </Form>
);
```

```javascript
// app.js

import { render } from 'react-dom';
import { createReduxStore } from './store';
import { LoginForm } from 'components/login-form';

const store = createReduxStore();

const app = (
  <Provider store={store}>
    <LoginForm id="login-form-example" />
  </Provider>
);

render(app, document.getElementsByTagName('main')[0]);
```

(Optional) Use custom form and form input components.

```javascript
// components/custom-form.js

import React from 'react';

export const CustomForm = props => (
  <div>
    {props.error ? error : null}
    <form {...props} />
  </div>
);
```

```javascript
// components/custom-form-input.js

import React from 'react';

export const CustomFormInput = props => (
  <label>
    <span>{props.name}</span>
    <input {...props} />
    {props.active && props.error ? error : null}
  </label>
);
```

```javascript
// components/login-form.js

import React from 'react';
import { Form, FormInput } from '@promotively/react-redux-form';
import { CustomForm } from 'components/custom-form';
import { CustomFormInput } from 'components/custom-form-input';

export const LoginForm = props => (
  <Form id={props.id} component={CustomForm}>
    <FormInput id="email" name="Email" type="email" component={CustomFormInput} />
    <FormInput id="password" name="Password" type="password" render={props => <CustomFormInput {...props} />} />
    <button>Submit</button>
  </Form>
);
```

(Optional) Add a submission handler to the form.

```javascript
// components/login-form.js

import React from 'react';
import { Form, FormInput } from '@promotively/react-redux-form';

const handleFormSubmit = data => axios.post('http://localhost:3000/api/v1/login', data).then(response => response.data);

export const LoginForm = props => (
  <Form id={props.id} onSubmit={handleFormSubmit}>
    <FormInput id="email" name="Email" type="email" />
    <FormInput id="password" name="Password" type="password" />
    <button>Submit</button>
  </Form>
);
```

(Optional) Add validation (synchronous or asynchronous) to the form.

```javascript
// component/login-form.js

import React from 'react';
import { Form, FormInput } from '@promotively/react-redux-form';

const handleFormValidation = data => {
  if (data.email) {
    return new Promise((resolve, reject) => {
      if (!data.email.includes('@')) {
        reject(new Error('email is invalid'));
      } else {
        resolve();
      }
    });
  }

  if (!data.email) {
    return 'email is required';
  }

  if (!data.password) {
    return 'password is required';
  }
};

const handleFormSubmit = data => axios.post('http://localhost:3000/api/v1/login', data).then(response => response.data);

export const LoginForm = props => (
  <Form id={props.id} validate={handleFormValidation} onSubmit={handleFormSubmit}>
    <FormInput id="email" name="Email" type="email" />
    <FormInput id="password" name="Password" type="password" />
    <button>Submit</button>
  </Form>
);
```

(Optional) Disable the form when there are no changes detected or validation errors are found.

```javascript
// components/login-form.js

import React from 'react';
import { Form, FormInput } from '@promotively/react-redux-form';

const handleFormSubmit = data => axios.post('http://localhost:3000/api/v1/login', data).then(response => response.data);

export const LoginForm = props => (
  <Form id={props.id} onSubmit={handleFormSubmit}>
    <FormInput id="email" name="Email" type="email" />
    <FormInput id="password" name="Password" type="password" />
    <button disabled={props.disabled}>Submit</button>
  </Form>
);
```

(Optional) Avoid destroying the form state when the component unmounts.

```javascript
// components/login-form.js

import React from 'react';
import { Form, FormInput } from '@promotively/react-redux-form';

const handleFormSubmit = data => axios.post('http://localhost:3000/api/v1/login', data).then(response => response.data);

export const LoginForm = props => (
  <Form id={props.id} onSubmit={handleFormSubmit} destroy={false}>
    <FormInput id="email" name="Email" type="email" />
    <FormInput id="password" name="Password" type="password" />
    <button>Submit</button>
  </Form>
);
```

(Optional) Add validation (synchronous or asynchronous) to the form inputs.

```javascript
// component/login-form.js

import React from 'react';
import { Form, FormInput } from '@promotively/react-redux-form';

const handleFormInputEmailValidation = (id, value) => (
  new Promise((resolve, reject) => {
    if (!value) {
      reject(new Error('email is required'));
    else if (!value.includes('@')) {
      reject(new Error('email is invalid'));
    } else {
      resolve();
    }
  })
);

const handleFormInputPasswordValidation = (id, value) => (
  if (!value) {
    return 'password is required';
  }
);

export const LoginForm = props => (
  <Form id={props.id}>
    <FormInput id="email" name="Email" type="email" validate={handleFormInputEmailValidation} />
    <FormInput id="password" name="Password" type="password" validate={handleFormInputPasswordValidation} />
    <button>Submit</button>
  </Form>
);
```

(Optional) Add a default value to a form input.

```javascript
// component/login-form.js

import React from 'react';
import { Form, FormInput } from '@promotively/react-redux-form';

export const LoginForm = props => (
  <Form id={props.id}>
    <FormInput id="email" name="Email" type="email" value="name@example.com" />
    <FormInput id="password" name="Password" type="password" />
    <button>Submit</button>
  </Form>
);
```

## API

### Redux Action Creators

| Function            | Arguments                                 | Description                         |
| ------------------- | ----------------------------------------- | ----------------------------------- |
| `completeForm`      | (formId)                                  | Completes a form.                   |
| `createForm`        | (formId)                                  | Create a form.                      |
| `errorForm`         | (formId, error)                           | Set the error state on a form.      |
| `loadingForm`       | (formId)                                  | Sets the loading state on a form.   |
| `submitForm`        | (formId, data, action)                    | Submit a form.                      |
| `destroyForm`       | (formId)                                  | Destroy a form.                     |
| `blurFormInput`     | (formId, inputId)                         | Blur a form input.                  |
| `changeFormInput`   | (formId, inputId, initialValue, newValue) | Change the value of a form input.   |
| `completeFormInput` | (formId, inputId)                         | Complete the value of a form input. |
| `createFormInput`   | (formId, inputId, initialValue)           | Create a form input.                |
| `disableFormInput`  | (formId, inputId)                         | Disable a form input.               |
| `enableFormInput`   | (formId, inputId)                         | Enable a form input.                |
| `errorFormInput`    | (formId, inputId, error)                  | Set the error on a form input.      |
| `focusFormInput`    | (formId, inputId)                         | Focus a form input.                 |
| `destroyFormInput`  | (formId, inputId)                         | Destroy a form input.               |

### React Components

| Function           | Arguments | Description                                                       | Props                                                                |
| ------------------ | --------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| `WrappedForm`      | (props)   | React.js component to render forms.                               | { ...HTMLFormElementProps, ...HTMLElementProps, component, render }  |
| `WrappedFormInput` | (props)   | React.js component to render form inputs.                         | { ...HTMLInputElementProps, ...HTMLElementProps, component, render } |
| `Form`             | (props)   | React.js container component to render forms with redux.js.       | { ...HTMLFormElementProps, ...HTMLElementProps, component, render }  |
| `FormInput`        | (props)   | React.js container component to render form inputs with redux.js. | { ...HTMLInputElementProps, ...HTMLElementProps, component, render } |

### React Higher Order Components

| Function        | Arguments | Description                                 | Props                                                                                                                |
| --------------- | --------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `withForm`      | (options) | An object containing configuration options. | { ...HTMLFormElementProps, ...HTMLElementProps, active, complete, data, dirty, error, errorForm, loading, validate } |
| `withFormInput` | (options) | An object containing configuration options. | { ...HTMLInputElementProps, ...HTMLElementProps, active, complete, dirty, error, focus, validate }                   |

### Redux Reducers

| Function           | Description                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| `reducer`          | A combined redux.js reducer to handle all state mutations for forms and form inputs. |
| `formReducer`      | A redux.js reducer function to handle the state mutations for forms.                 |
| `formInputReducer` | A redux.js reducer function to handle the state mutations for form inputs.           |

### React Redux Selectors

| Function                          | Description                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `createFormActiveSelector`        | Create a reselect.js selector function to get the form active state.         |
| `createFormCompleteSelector`      | Create a reselect.js selector function to get the form complete state.       |
| `createFormDataSelector`          | Create a reselect.js selector function to get the form data.                 |
| `createFormDirtySelector`         | Create a reselect.js selector function to get the form dirty state.          |
| `createFormDisabledSelector`      | Create a reselect.js selector function to get the form disabled state.       |
| `createFormErrorSelector`         | Create a reselect.js selector function to get the form error state.          |
| `createFormLoadingSelector`       | Create a reselect.js selector function to get the form loading state.        |
| `createFormInputActiveSelector`   | Create a reselect.js selector function to get the form input active state.   |
| `createFormInputCompleteSelector` | Create a reselect.js selector function to get the form input complete state. |
| `createFormInputDirtySelector`    | Create a reselect.js selector function to get the form input dirty state.    |
| `createFormInputDisabledSelector` | Create a reselect.js selector function to get the form input disabled state. |
| `createFormInputErrorSelector`    | Create a reselect.js selector function to get the form input error state.    |
| `createFormInputFocusSelector`    | Create a reselect.js selector function to get the form input focus state.    |
| `createFormInputValueSelector`    | Create a reselect.js selector function to get the form input value state.    |

## Build

All build artifacts can be found inside the `dist/lib` and `dist/example` folders after running `yarn build`.

## Linting

This library uses [@promotively/eslint-config](https://github.com/promotively/eslint-config) and [@promotively/eslint-config-react](https://github.com/promotively/eslint-config-react) for its ESLint configuration.

```
yarn lint
```

## Tests

This library has 100% unit test code coverage.

Code coverage is available inside the `dist/coverage` folder after running `yarn test`.

Code coverage for the most recent release is also [available online](https://promotively-react-redux-form.s3-us-west-1.amazonaws.com/tests/index.html).

## Contact

Feel free to reach out using any of the below methods:

- [GitHub](https://github.com/promotively)
- [FaceBook](https://facebook.com/promotively)
- [Twitter](https://twitter.com/promotively)
- [LinkedIn](https://linkedin.com/company/promotively)
- [Website](https://promotively.com).
- [Email](mailto:hello@promotively.com)

## License

MIT
