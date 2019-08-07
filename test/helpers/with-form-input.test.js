/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import {
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_CREATE,
  FORM_INPUT_ERROR,
  FORM_INPUT_FOCUS
} from 'actions/form-input';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import withForm from 'helpers/with-form';
import withFormInput from 'helpers/with-form-input';

const formId = 'test-form';
const inputId = 'test-form-input';
const inputKey = `${formId}__${inputId}`;
const defaultValue = 'test-value';
const newValue = 'test-value-new';
const mockError = new Error('test-error');
const mockEvent = {
  preventDefault: () => (true),
  target: {
    value: newValue
  }
};
const createMockStore = configureStore([ thunk ]);
const MockFormComponent = (props) => <form {...props} />;
const MockFormInputComponent = (props) => <input {...props} />;
const FormContainer = withForm(MockFormComponent);
const FormInputContainer = withFormInput(MockFormInputComponent);

describe('helpers/with-form-input.js', () => {
  it('should mapStateToProps and mapDispatchToProps.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={formId}>
          <FormInputContainer id={inputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;
    const expectedPropKeys = [
      'id',
      'defaultValue',
      'formId',
      'active',
      'complete',
      'dirty',
      'disabled',
      'error',
      'focus',
      'value',
      'blurFormInput',
      'changeFormInput',
      'completeFormInput',
      'errorFormInput',
      'focusFormInput',
      'onBlur',
      'onChange',
      'onFocus'
    ];

    expect(Object.keys(container.findAllByProps({ formId })[2].props).join()).toEqual(expectedPropKeys.join());
  });

  it('should create form input.', () => {
    const mockState = {
      form: {},
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const FormInputContainer = withFormInput(MockFormInputComponent);

    ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={formId}>
          <FormInputContainer id={inputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      defaultValue,
      formId,
      inputId,
      type: FORM_INPUT_CREATE
    });
  });

  it('should not render without a form id.', () => {
    const mockState = {
      form: {},
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer>
          <FormInputContainer id={inputId} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    expect(container.findAllByProps({ id: formId })).toHaveLength(0);
  });

  it('should blur form input.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          focus: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={formId}>
          <FormInputContainer id={inputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId })[2].props.onBlur(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_BLUR
    });
  });

  it('should focus form input.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          focus: false
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={formId}>
          <FormInputContainer id={inputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId })[2].props.onFocus(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_FOCUS
    });
  });

  it('should change form input value.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          value: defaultValue
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={formId}>
          <FormInputContainer id={inputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({
      defaultValue,
      formId,
      inputId,
      newValue,
      type: FORM_INPUT_CHANGE
    });
  });

  it('should change value on a form input with a validator and throw an error.', async () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          error: null,
          value: defaultValue
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnValidate = () => {
      throw Error(mockError.message);
    };
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={formId}>
          <FormInputContainer id={inputId} defaultValue={defaultValue} onValidate={mockOnValidate} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    await new Promise((resolve) => setTimeout(() => {
      expect(actions[3]).toEqual({
        error: mockError.message,
        formId,
        inputId,
        type: FORM_INPUT_ERROR
      });
      resolve();
    }, 1));
  });

  it('should change value on a form input with a validator and not throw an error.', async () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          error: mockError.message,
          value: defaultValue
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnValidate = () => Promise.resolve();
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={formId}>
          <FormInputContainer id={inputId} defaultValue={defaultValue} onValidate={mockOnValidate} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    await new Promise((resolve) => setTimeout(() => {
      expect(actions[3]).toEqual({
        formId,
        inputId,
        type: FORM_INPUT_COMPLETE
      });
      resolve();
    }, 1));
  });
});
