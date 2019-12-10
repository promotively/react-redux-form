/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import {
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_CREATE,
  FORM_INPUT_ERROR,
  FORM_INPUT_FOCUS,
  FORM_INPUT_REMOVE
} from 'actions/form-input';
import configureStore from 'redux-mock-store';
import Form from 'components/form';
import FormInput from 'components/form-input';
import { Provider } from 'react-redux';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import withForm from 'helpers/with-form';
import withFormInput from 'helpers/with-form-input';

const mockFormId = 'test-form';
const mockFormInputId = 'test-form-input';
const mockFormInputKey = `${mockFormId}__${mockFormInputId}`;
const defaultValue = 'test-value';
const newValue = 'test-value-new';
const mockError = new Error('test-error');
const mockEvent = {
  preventDefault: () => true,
  target: {
    value: newValue
  }
};
const createMockStore = configureStore([thunk]);

describe('helpers/with-form-input.js', () => {
  it('should mapStateToProps and mapDispatchToProps.', () => {
    const FormContainer = withForm()(Form);
    const FormInputContainer = withFormInput()(FormInput);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId}>
          <FormInputContainer id={mockFormInputId} defaultValue={defaultValue} />
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
      'onBlur',
      'onChange',
      'onFocus'
    ];

    expect(Object.keys(container.findAllByProps({ formId: mockFormId })[2].props).join()).toEqual(
      expectedPropKeys.join()
    );
  });

  it('should create form input.', () => {
    const FormContainer = withForm()(Form);
    const FormInputContainer = withFormInput()(FormInput);
    const mockState = {
      form: {},
      formInput: {}
    };
    const mockStore = createMockStore(mockState);

    ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId}>
          <FormInputContainer id={mockFormInputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ defaultValue, formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_CREATE });
  });

  it('should not render without a form id.', () => {
    const FormContainer = withForm()(Form);
    const FormInputContainer = withFormInput()(FormInput);
    const mockState = {
      form: {},
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer>
          <FormInputContainer id={mockFormInputId} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    expect(container.findAllByProps({ id: mockFormId })).toHaveLength(0);
  });

  it('should remove form input.', () => {
    const FormContainer = withForm()(Form);
    const FormInputContainer = withFormInput()(FormInput);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId}>
          <FormInputContainer id={mockFormInputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );

    renderer.unmount();

    const actions = mockStore.getActions();

    expect(actions[3]).toEqual({ formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_REMOVE });
  });

  it('should not remove form input when options.destroy is set to false.', () => {
    const FormContainer = withForm({ destroy: false })(Form);
    const FormInputContainer = withFormInput({ destroy: false })(FormInput);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId}>
          <FormInputContainer id={mockFormInputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );

    renderer.unmount();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(2);
  });

  it('should blur form input.', () => {
    const FormContainer = withForm()(Form);
    const FormInputContainer = withFormInput()(FormInput);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
          focus: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId}>
          <FormInputContainer id={mockFormInputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId: mockFormId })[2].props.onBlur(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({ formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_BLUR });
  });

  it('should focus form input.', () => {
    const FormContainer = withForm()(Form);
    const FormInputContainer = withFormInput()(FormInput);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
          focus: false
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId}>
          <FormInputContainer id={mockFormInputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId: mockFormId })[2].props.onFocus(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({ formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_FOCUS });
  });

  it('should change form input value.', () => {
    const FormContainer = withForm()(Form);
    const FormInputContainer = withFormInput()(FormInput);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
          value: defaultValue
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId}>
          <FormInputContainer id={mockFormInputId} defaultValue={defaultValue} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId: mockFormId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({
      defaultValue,
      formId: mockFormId,
      inputId: mockFormInputId,
      newValue,
      type: FORM_INPUT_CHANGE
    });
  });

  it('should change value on a form input with a validator and throw an error.', async () => {
    const FormContainer = withForm()(Form);
    const FormInputContainer = withFormInput()(FormInput);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
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
        <FormContainer id={mockFormId}>
          <FormInputContainer id={mockFormInputId} defaultValue={defaultValue} onValidate={mockOnValidate} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId: mockFormId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    await new Promise(resolve =>
      setTimeout(() => {
        expect(actions[3]).toEqual({
          error: mockError.message,
          formId: mockFormId,
          inputId: mockFormInputId,
          type: FORM_INPUT_ERROR
        });
        resolve();
      }, 1)
    );
  });

  it('should change value on a form input with a validator and not throw an error.', async () => {
    const FormContainer = withForm()(Form);
    const FormInputContainer = withFormInput()(FormInput);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
          error: mockError.message,
          value: defaultValue
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnValidate = () => Promise.resolve();
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId}>
          <FormInputContainer id={mockFormInputId} defaultValue={defaultValue} onValidate={mockOnValidate} />
        </FormContainer>
      </Provider>
    );
    const container = renderer.root;

    container.findAllByProps({ formId: mockFormId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    await new Promise(resolve =>
      setTimeout(() => {
        expect(actions[3]).toEqual({ formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_COMPLETE });
        resolve();
      }, 1)
    );
  });
});
