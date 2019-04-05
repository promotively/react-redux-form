# @promotively/react-redux-form

Universal react.js/redux.js library for building forms.

## Why?

* You are using redux.js in your app.
* You are frustrated with using redux-form.
* You want an easy yet powerful way to build forms.
* You are building a new app and want to use redux.js to handle your form state.
* You have a bunch of repetitive form related react.js/redux.js boilerplate you wish didn't exist.
* You want a proper form abstraction layer but don't have the time to build one.
* You want to be able to debug your forms through redux dev tools.
* You need a library that is compatible with server side rendering.
* You need to handle advanced A/B testing scenarios with your forms.
* You need to integrate with external applications and/or tools.
* You need to know if a form or input has been touched, changed or completed.
* You need client side error validation on a form or form input(s).

## Installation

With Yarn

`yarn add @promotively/react-redux-form`

With NPM

`npm install @promotively/react-redux-form`

## Example

A working example is available inside the ```/example``` folder.

Once you have performed ```yarn build``` go to the ```dist/example``` folder and from there you can open the ```index.html``` file to run the example.

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

Wrap your form component using the ```withForm``` higher order component.

```javascript
// components/form.js

import React from 'react';

const Form = (props) => (
  <form {...props}>
);

export default Form;
```

```javascript
// containers/form.js

import axios from 'axios';
import Form from '../components/form';
import { withForm } from '@promotively/react-redux-form';

const FormContainer = withForm(Form);

export default FormContainer;
```

Wrap your form input component(s) using the ```withFormInput``` higher order component.

```javascript
// components/form-input.js

import React from 'react';

const FormInput = (props) => (
  <label>
    <span>{props.name}</span>
    <input {...props} />
  </label>
);

export default Form;
```

```javascript
// containers/form-input.js

import axios from 'axios';
import FormInput from '../components/form-input';
import { withForm } from '@promotively/react-redux-form';

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

Add an onSubmit handler to the form.

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
| `createForm` | (formId) | Create a form. |
| `errorWithForm` | (formId, error) | Set the error on a form. |
| `submitForm` | (formId, data, action) | Submit a form asynchronously. |
| `removeForm` | (formId) | Remove a form. |
| `blurFormInput` | (formId, inputId) | Blur a form input. |
| `changeFormInput` | (formId, inputId, defaultValue, newValue) | Change the value of a form input. |
| `completeFormInput` | (formId, inputId) | Complete the value a form input. |
| `createFormInput` | (formId, inputId, defaultValue) | Create a form input. |
| `disableFormInput` | (formId, inputId) | Disable a form input. |
| `enableFormInput` | (formId, inputId) | Enable a form input. |
| `errorWithFormInput` | (formId, inputId, error) | Set the error on a form input. |
| `focusFormInput` | (formId, inputId) | Focus a form input. |
| `removeFormInput` | (formId, inputId) | Remove a form input. |

### React Higher Order Components

| Function | Arguments | Description | Props
| --- | --- | --- | --- |
| `withForm` | (Component) | Higher order component that handles forms. | { active, complete, data, dirty, error, errorWithForm, loading, onValidate, HTMLFormElementProps, HTMLElementProps}
| `withFormInput` | (Component) | Higher order component that handles form inputs. | { active, blurFormInput, changeFormInput, complete, completeFormInput, defaultValue, dirty, error, errorWithFormInput, focus, focusFormInput, onValidate, HTMLInputElementProps, HTMLElementProps}

### Redux Reducers

| Function | Description |
| --- | --- 
| `formReducer` | Redux reducer to handle the state mutations for forms. |
| `formInputReducer` | Redux reducer to handle the state mutations for form inputs. |

### React Redux Selectors

| Function | Description |
| --- | --- |
| `createFormActiveSelector` | Get the form active state. |
| `createFormCompleteSelector` | Get the form complete state. |
| `createFormDataSelector` | Get the form data. |
| `createFormDirtySelector` | Get the form dirty state. |
| `createFormDisabledSelector` | Get the form disabled state. |
| `createFormErrorSelector` | Get the form error state. |
| `createFormLoadingSelector` | Get the form loading state. |
| `createFormInputActiveSelector` | Get the form input active state. |
| `createFormInputCompleteSelector` | Get the form input complete state. |
| `createFormInputDirtySelector` | Get the form input dirty state. |
| `createFormInputDisabledSelector` | Get the form input disabled state. |
| `createFormInputErrorSelector` | Get the form input error state. |
| `createFormInputFocusSelector` | Get the form input focus state. |
| `createFormInputValueSelector` | Get the form input value state. |

## Build

All build artifacts can be found inside the ```/dist/lib``` and ```/dist/example``` folders.

```
yarn build
```

## Tests

This library has 100% unit test code coverage.

Code coverage is available inside the ```dist/coverage``` folder.

## Documentation

The source code is documented using JSDoc syntax.

Documentation is generated using [esdoc](https://github.com/esdoc/esdoc) and is available inside the ```dist/docs``` folder.

```
yarn docs
```

## Linting

This library uses [@promotively/eslint-config](https://www.github.com/promotively/eslint-config) and [@promotively/eslint-config-react](https://www.github.com/promotively/eslint-config-react) for its eslint configuration.

```
yarn lint
```

## Feedback
Feedback is more than welcome via [GitHub](https://www.github.com/promotively) or [Twitter](https://www.twitter.com/promotively).

## License
MIT

