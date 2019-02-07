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
  FORM_INPUT_FOCUS,
  FORM_INPUT_REMOVE
} from 'actions/form-input';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import React from 'react';
import thunk from 'redux-thunk';
import withFormInput from 'helpers/with-form-input';

Enzyme.configure({ adapter: new Adapter() });

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
const MockComponent = (props) => <input {...props} />;

describe('helpers/with-form-input.js', () => {
  it('should mapStateToProps and mapDispatchToProps.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const FormInputContainer = withFormInput(MockComponent);
    const consumer = Enzyme.shallow(<FormInputContainer formId={formId} id={inputId} defaultValue={defaultValue} />, {
      context: {
        store: mockStore
      }
    });
    const container = Enzyme.shallow(consumer.props().children({ id: formId }), {
      context: {
        store: mockStore
      }
    });

    const expectedPropKeys = [
      'formId',
      'id',
      'defaultValue',
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
      'createFormInput',
      'errorWithFormInput',
      'focusFormInput',
      'removeFormInput'
    ];

    expect(Object.keys(container.props())).toEqual(expectedPropKeys);
  });

  it('should create form input.', () => {
    const mockState = {
      form: {},
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const FormInputContainer = withFormInput(MockComponent);
    const consumer = Enzyme.shallow(<FormInputContainer formId={formId} id={inputId} defaultValue={defaultValue} />, {
      context: {
        store: mockStore
      }
    });
    const container = Enzyme.shallow(consumer.props().children({ id: formId }), {
      context: {
        store: mockStore
      }
    });

    container.dive();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
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
    const FormInputContainer = withFormInput(MockComponent);
    const consumer = Enzyme.shallow(<FormInputContainer formId={formId} id={inputId} defaultValue={defaultValue} />, {
      context: {
        store: mockStore
      }
    });

    expect(consumer.props().children()).toEqual(null);
  });

  it('should remove form input.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const FormInputContainer = withFormInput(MockComponent);
    const consumer = Enzyme.shallow(<FormInputContainer formId={formId} id={inputId} defaultValue={defaultValue} />, {
      context: {
        store: mockStore
      }
    });
    const container = Enzyme.shallow(consumer.props().children({ id: formId }), {
      context: {
        store: mockStore
      }
    });

    container.dive().unmount();

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      formId,
      inputId,
      type: FORM_INPUT_REMOVE
    });
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
    const FormInputContainer = withFormInput(MockComponent);
    const consumer = Enzyme.shallow(<FormInputContainer formId={formId} id={inputId} defaultValue={defaultValue} />, {
      context: {
        store: mockStore
      }
    });
    const container = Enzyme.shallow(consumer.props().children({ id: formId }), {
      context: {
        store: mockStore
      }
    });

    container.dive().simulate('blur');

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
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
    const FormInputContainer = withFormInput(MockComponent);
    const consumer = Enzyme.shallow(<FormInputContainer formId={formId} id={inputId} defaultValue={defaultValue} />, {
      context: {
        store: mockStore
      }
    });
    const container = Enzyme.shallow(consumer.props().children({ id: formId }), {
      context: {
        store: mockStore
      }
    });

    container.dive().simulate('focus');

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
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
    const FormInputContainer = withFormInput(MockComponent);
    const consumer = Enzyme.shallow(<FormInputContainer formId={formId} id={inputId} defaultValue={defaultValue} />, {
      context: {
        store: mockStore
      }
    });
    const container = Enzyme.shallow(consumer.props().children({ id: formId }), {
      context: {
        store: mockStore
      }
    });

    container.dive().simulate('change', mockEvent);

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      defaultValue,
      formId,
      inputId,
      newValue,
      type: FORM_INPUT_CHANGE
    });
  });

  it('should change value on a form input with a validator logic and throw an error.', async () => {
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
    const FormInputContainer = withFormInput(MockComponent);
    const consumer = Enzyme.shallow(<FormInputContainer formId={formId} id={inputId} defaultValue={defaultValue} onValidate={mockOnValidate} />, {
      context: {
        store: mockStore
      }
    });
    const container = Enzyme.shallow(consumer.props().children({ id: formId }), {
      context: {
        store: mockStore
      }
    });

    container.dive().simulate('change', mockEvent);

    const actions = mockStore.getActions();

    await new Promise((resolve) => setTimeout(() => {
      expect(actions[2]).toEqual({
        error: mockError.message,
        formId,
        inputId,
        type: FORM_INPUT_ERROR
      });
      resolve();
    }, 1));
  });

  it('should change value on a form input with a validator logic and not throw an error.', async () => {
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
    const FormInputContainer = withFormInput(MockComponent);
    const consumer = Enzyme.shallow(<FormInputContainer formId={formId} id={inputId} defaultValue={defaultValue} onValidate={mockOnValidate} />, {
      context: {
        store: mockStore
      }
    });
    const container = Enzyme.shallow(consumer.props().children({ id: formId }), {
      context: {
        store: mockStore
      }
    });

    container.dive().simulate('change', mockEvent);

    const actions = mockStore.getActions();

    await new Promise((resolve) => setTimeout(() => {
      expect(actions[2]).toEqual({
        formId,
        inputId,
        type: FORM_INPUT_COMPLETE
      });
      resolve();
    }, 1));
  });
});
