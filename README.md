# @promotively/react-redux-form

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Version](https://badge.fury.io/js/%40promotively%2Freact-redux-form.svg)](https://badge.fury.io/js/%40promotively%2Freact-redux-form)
[![Coverage Status](https://coveralls.io/repos/github/promotively/react-redux-form/badge.svg)](https://coveralls.io/github/promotively/react-redux-form)
[![Build Status](https://codebuild.us-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiN3BRdWU4eHhaOU50VG9oZEhsaHJ4YmJxQWVXNmhyVUdpN21MQk0zVTNMRVQ4clFTOTA3TXdnNU5EUFFyaEUxTktnVzFkV0J4azNZZG03R3p3eFNhR0FNPSIsIml2UGFyYW1ldGVyU3BlYyI6Ikt4R0REVk5ZQlZwQnAyY3EiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)](https://aws.amazon.com/codebuild)
[![GitHub Issues](https://img.shields.io/github/issues/promotively/react-redux-form.svg)](https://github.com/promotively/react-redux-form/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/promotively/react-redux-form.svg)](https://GitHub.com/promotively/react-redux-form/pull/)

Universal/isomorphic react.js/redux.js javascript/typescript library for building forms.

## Why?

- You are using redux.js in your app.
- You are frustrated with using redux-form and the lack of alternative solutions.
- You need a form library that has dual API's for working with higher order components or hooks with react.js.
- You want an easy yet powerful and performant way to build forms that closely matches building normal html forms.
- You are building a new app and want to use redux.js to handle your form state.
- You plan on building complicated form flows that can be difficult to accomplish without redux.js.
- You have existing repetitive form related react.js/redux.js boilerplate that you want to refactor.
- You want a proper form state abstraction layer but don't have the time to build one.
- You want to be able to debug your forms through redux dev tools.
- You need a library that is compatible with server side rendering (server side state management).
- You want to use a library that has been extensively battle tested and built to handle all typical (and not so typical) form behaviours in modern web applications.
- You need to handle advanced A/B testing scenarios with your forms.
- You want to retain your form state even when a form is not rendered (ie: multi step forms)
- You need to integrate with external applications and/or tools and need an API that is not react.js based.
- You need to know if a form or input has been touched, changed or completed.
- You need client side async/sync validation on a form or input(s).

## Installation

With Yarn

`yarn add @promotively/react-redux-form`

With NPM

`npm install @promotively/react-redux-form`

## Example

Advanced examples using higher order components and hooks rendered with nodejs and web browsers are available inside the `/example` folder.

Once you have executed `yarn build` go to the `dist/example` folder and from there you can open the `index.html` file to run the example.

The example is also [available online](https://promotively-react-redux-form.s3-us-west-1.amazonaws.com/example/index.html).

## Documentation

The source code is documented using JSDoc syntax and documentation is generated using [jsdoc](https://github.com/jsdoc/jsdoc).

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

Use the provided form and input components to compose a form. (id is the only prop that is required)

```javascript
// components/login-form.js

import React from 'react';
import { Form, Input } from '@promotively/react-redux-form';

export const LoginForm = props => (
  <Form id={props.id}>
    <Input id="email" name="Email" type="email" />
    <Input id="password" name="Password" type="password" />
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

(Optional) Use custom form and input components.

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
// components/custom-input.js

import React from 'react';

export const CustomInput = props => (
  <label>
    <span>{props.name}</span>
    <input {...props} />
    {props.touched && props.error ? error : null}
  </label>
);
```

```javascript
// components/login-form.js

import React from 'react';
import { Form, Input } from '@promotively/react-redux-form';
import { CustomForm } from 'components/custom-form';
import { CustomInput } from 'components/custom-input';

export const LoginForm = props => (
  <Form id={props.id} component={CustomForm}>
    <Input id="email" name="Email" type="email" component={CustomInput} />
    <Input id="password" name="Password" type="password" render={props => <CustomInput {...props} />} />
    <button>Submit</button>
  </Form>
);
```

(Optional) Add a submission handler to the form.

```javascript
// components/login-form.js

import React from 'react';
import { Form, Input } from '@promotively/react-redux-form';

const handleFormSubmit = data => axios.post('http://localhost:3000/api/v1/login', data).then(response => response.data);

export const LoginForm = props => (
  <Form id={props.id} onSubmit={handleFormSubmit}>
    <Input id="email" name="Email" type="email" />
    <Input id="password" name="Password" type="password" />
    <button>Submit</button>
  </Form>
);
```

(Optional) Add validation (synchronous or asynchronous) to the form.

```javascript
// component/login-form.js

import React from 'react';
import { Form, Input } from '@promotively/react-redux-form';

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
    <Input id="email" name="Email" type="email" />
    <Input id="password" name="Password" type="password" />
    <button>Submit</button>
  </Form>
);
```

(Optional) Disable the form when there are no changes detected or validation errors are found.

```javascript
// components/login-form.js

import React from 'react';
import { Form, Input } from '@promotively/react-redux-form';

const handleFormSubmit = data => axios.post('http://localhost:3000/api/v1/login', data).then(response => response.data);

export const LoginForm = props => (
  <Form id={props.id} onSubmit={handleFormSubmit}>
    <Input id="email" name="Email" type="email" />
    <Input id="password" name="Password" type="password" />
    <button disabled={props.disabled}>Submit</button>
  </Form>
);
```

(Optional) Avoid destroying the form state when the component unmounts.

```javascript
// components/login-form.js

import React from 'react';
import { Form, Input } from '@promotively/react-redux-form';

const handleFormSubmit = data => axios.post('http://localhost:3000/api/v1/login', data).then(response => response.data);

export const LoginForm = props => (
  <Form id={props.id} onSubmit={handleFormSubmit} destroy={false}>
    <Input id="email" name="Email" type="email" />
    <Input id="password" name="Password" type="password" />
    <button>Submit</button>
  </Form>
);
```

(Optional) Add validation (synchronous or asynchronous) to the inputs.

```javascript
// component/login-form.js

import React from 'react';
import { Form, Input } from '@promotively/react-redux-form';

const handleInputEmailValidation = (id, value) => (
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

const handleInputPasswordValidation = (id, value) => (
  if (!value) {
    return 'password is required';
  }
);

export const LoginForm = props => (
  <Form id={props.id}>
    <Input id="email" name="Email" type="email" validate={handleInputEmailValidation} />
    <Input id="password" name="Password" type="password" validate={handleInputPasswordValidation} />
    <button>Submit</button>
  </Form>
);
```

(Optional) Add a default value to a input.

```javascript
// component/login-form.js

import React from 'react';
import { Form, Input } from '@promotively/react-redux-form';

export const LoginForm = props => (
  <Form id={props.id}>
    <Input id="email" name="Email" type="email" value="name@example.com" />
    <Input id="password" name="Password" type="password" />
    <button>Submit</button>
  </Form>
);
```

## API

### Redux Action Creators

| Function        | Arguments                                 | Description                       |
| --------------- | ----------------------------------------- | --------------------------------- |
| `completeForm`  | (formId)                                  | Completes a form.                 |
| `createForm`    | (formId)                                  | Create a form.                    |
| `errorForm`     | (formId, error)                           | Set the error state on a form.    |
| `loadingForm`   | (formId)                                  | Sets the loading state on a form. |
| `submitForm`    | (formId, data, action)                    | Submit a form.                    |
| `destroyForm`   | (formId)                                  | Destroy a form.                   |
| `resetForm`     | (formId)                                  | Reset all input values in a form. |
| `blurInput`     | (formId, inputId)                         | Blur a input.                     |
| `changeInput`   | (formId, inputId, defaultValue, newValue) | Change the value of a input.      |
| `completeInput` | (formId, inputId)                         | Complete the value of a input.    |
| `createInput`   | (formId, inputId, defaultValue)           | Create a input.                   |
| `disableInput`  | (formId, inputId)                         | Disable a input.                  |
| `enableInput`   | (formId, inputId)                         | Enable a input.                   |
| `errorInput`    | (formId, inputId, error)                  | Set the error on a input.         |
| `focusInput`    | (formId, inputId)                         | Focus a input.                    |
| `destroyInput`  | (formId, inputId)                         | Destroy a input.                  |
| `resetInput`    | (formId, inputId)                         | Reset an input value.             |

### React Components

| Function            | Arguments | Description                                                     | Props                                                                   |
| ------------------- | --------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `FormComponent`     | (props)   | React.js component to render forms.                             | { ...HTMLFormElementProps, ...HTMLElementProps, component, render }     |
| `InputComponent`    | (props)   | React.js component to render inputs.                            | { ...HTMLInputElementProps, ...HTMLElementProps, component, render }    |
| `SelectComponent`   | (props)   | React.js component to render selects.                           | { ...HTMLSelectElementProps, ...HTMLElementProps, component, render }   |
| `TextareaComponent` | (props)   | React.js component to render textareas.                         | { ...HTMLTextareaElementProps, ...HTMLElementProps, component, render } |
| `Form`              | (props)   | React.js container component to render forms with redux.js.     | { ...HTMLFormElementProps, ...HTMLElementProps, component, render }     |
| `Input`             | (props)   | React.js container component to render inputs with redux.js.    | { ...HTMLInputElementProps, ...HTMLElementProps, component, render }    |
| `Select`            | (props)   | React.js container component to render selects with redux.js.   | { ...HTMLInputElementProps, ...HTMLElementProps, component, render }    |
| `Textarea`          | (props)   | React.js container component to render textareas with redux.js. | { ...HTMLInputElementProps, ...HTMLElementProps, component, render }    |

### React Higher Order Components

| Function    | Arguments | Description                                 | Props                                                                                                                   |
| ----------- | --------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `withForm`  | (options) | An object containing configuration options. | { ...HTMLFormElementProps, ...HTMLElementProps, touched, complete, data, touched, error, errorForm, loading, validate } |
| `withInput` | (options) | An object containing configuration options. | { ...HTMLInputElementProps, ...HTMLElementProps, touched, complete, touched, error, focus, validate }                   |

### React Hooks

| Function    | Arguments | Description                                 | Props                                                                                                                      |
| ----------- | --------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `useForm`  | (id, options) | An object containing configuration options. | { ...HTMLFormElementProps, ...HTMLElementProps, touched, complete, data, touched, error, errorForm, loading, validate } |
| `useInput` | (id, options) | An object containing configuration options. | { ...HTMLInputElementProps, ...HTMLElementProps, touched, complete, touched, error, focus, validate }                   |

### Redux Reducers

| Function       | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| `reducer`      | A combined redux.js reducer to handle all state mutations for forms and inputs. |
| `formReducer`  | A redux.js reducer function to handle the state mutations for forms.            |
| `inputReducer` | A redux.js reducer function to handle the state mutations for inputs.           |

### React Redux Selectors

| Function                        | Description                                                                 |
| ------------------------------- | --------------------------------------------------------------------------- |
| `createFormCompleteSelector`    | Create a reselect.js selector function to get the form complete state.      |
| `createFormDirtySelector`       | Create a reselect.js selector function to get the form touched state.       |
| `createFormDisabledSelector`    | Create a reselect.js selector function to get the form disabled state.      |
| `createFormErrorSelector`       | Create a reselect.js selector function to get the form error state.         |
| `createFormLoadingSelector`     | Create a reselect.js selector function to get the form loading state.       |
| `createFormPayloadSelector`     | Create a reselect.js selector function to get the form payload.             |
| `createFormReadySelector`       | Create a reselect.js selector function to get the form ready state.         |
| `createFormTouchedSelector`     | Create a reselect.js selector function to get the form touched state.       |
| `createFormValuesSelector`      | Create a reselect.js selector function to get the last form payload.        |
| `createInputCompleteSelector`   | Create a reselect.js selector function to get the input complete state.     |
| `createInputDirtySelector`      | Create a reselect.js selector function to get the input touched state.      |
| `createInputDisabledSelector`   | Create a reselect.js selector function to get the input disabled state.     |
| `createInputErrorSelector`      | Create a reselect.js selector function to get the input error state.        |
| `createInputFocusSelector`      | Create a reselect.js selector function to get the input focus state.        |
| `createInputReadySelector`      | Create a reselect.js selector function to get the input ready state.        |
| `createInputRevalidateSelector` | Create a reselect.js selector function to get the input revalidation state. |
| `createInputTouchedSelector`    | Create a reselect.js selector function to get the input touched state.      |
| `createInputValueSelector`      | Create a reselect.js selector function to get the input value state.        |

## Build

All build artifacts can be found inside the `dist/lib` and `dist/example` folders after running `yarn build`.

## Linting

This library uses [@promotively/eslint-config](https://github.com/promotively/eslint-config) and [@promotively/eslint-config-react](https://github.com/promotively/eslint-config-react) for its ESLint configuration.

`yarn lint`

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
