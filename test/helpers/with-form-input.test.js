/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import { FormInput } from 'containers/form-input';
import { Form } from 'containers/form';
import {
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_CREATE,
  FORM_INPUT_ERROR,
  FORM_INPUT_FOCUS,
  FORM_INPUT_DESTROY
} from 'actions/form-input';

const mockFormId = 'test-form';
const mockFormInputId = 'test-form-input';
const mockFormInputKey = `${mockFormId}__${mockFormInputId}`;
const initialValue = 'test-value';
const newValue = 'test-value-new';
const mockError = new Error('test-error');
const mockEvent = {
  preventDefault: () => true,
  target: {
    value: newValue
  }
};
const createMockStore = configureStore([thunk]);
const createResolvedPromise = data => () => Promise.resolve(data);
// eslint-disable-next-line promise/no-promise-in-callback
const createRejectedPromise = error => () => Promise.reject(error);

jest.useFakeTimers();

describe('helpers/with-form-input.js', () => {
  it('should mapStateToProps and mapDispatchToProps.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} />
        </Form>
      </Provider>
    );
    const container = renderer.root;
    const expectedPropKeys = [
      'id',
      'value',
      'formId',
      'active',
      'complete',
      'dirty',
      'disabled',
      'error',
      'focus',
      'onBlur',
      'onChange',
      'onFocus'
    ];

    expect(Object.keys(container.findAllByProps({ formId: mockFormId })[2].props).join()).toEqual(
      expectedPropKeys.join()
    );
  });

  it('should create form input.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} />
        </Form>
      </Provider>
    );

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ formId: mockFormId, initialValue, inputId: mockFormInputId, type: FORM_INPUT_CREATE });
  });

  it('should not render without a form id.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form>
          <FormInput id={mockFormInputId} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    expect(container.findAllByProps({ id: mockFormId })).toHaveLength(0);
  });

  it('should destroy form input.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} />
        </Form>
      </Provider>
    );

    renderer.unmount();

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[3]).toEqual({ formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_DESTROY });
  });

  it('should not destroy form input when destroy prop is set to false.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form destroy={false} id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} />
        </Form>
      </Provider>
    );

    renderer.unmount();

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(2);
  });

  it('should blur form input.', callback => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            focus: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ formId: mockFormId })[2].props.onBlur(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({ formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_BLUR });

    callback();
  });

  it('should call custom event handler when the form input has lost focus.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            value: initialValue
          }
        }
      }
    };
    const mockOnBlur = jest.fn();
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} onBlur={mockOnBlur} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ formId: mockFormId })[2].props.onBlur(mockEvent);

    expect(mockOnBlur.mock.calls.length).toBe(1);
  });

  it('should focus form input.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            focus: false
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ formId: mockFormId })[2].props.onFocus(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({ formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_FOCUS });
  });

  it('should call custom event handler when the form input has focus.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            value: initialValue
          }
        }
      }
    };
    const mockOnFocus = jest.fn();
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} onFocus={mockOnFocus} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ formId: mockFormId })[2].props.onFocus(mockEvent);

    expect(mockOnFocus.mock.calls.length).toBe(1);
  });

  it('should change form input value.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            value: initialValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ formId: mockFormId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({
      formId: mockFormId,
      initialValue,
      inputId: mockFormInputId,
      newValue,
      type: FORM_INPUT_CHANGE
    });
  });

  it('should call custom event handler when the form input value changes.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            value: initialValue
          }
        }
      }
    };
    const mockOnChange = jest.fn();
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} onChange={mockOnChange} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ formId: mockFormId })[2].props.onChange(mockEvent);

    expect(mockOnChange.mock.calls.length).toBe(1);
  });

  it('should fail async validation when the value of a form input changes.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            error: null,
            value: initialValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = createRejectedPromise(mockError);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} validate={mockValidator} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByProps({ formId: mockFormId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[3]).toEqual({
      error: mockError.message,
      formId: mockFormId,
      inputId: mockFormInputId,
      type: FORM_INPUT_ERROR
    });
  });

  it('should pass async validation when the value of a form input changes.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            error: mockError.message,
            value: initialValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = createResolvedPromise();
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} validate={mockValidator} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByProps({ formId: mockFormId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[3]).toEqual({ formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_COMPLETE });
  });

  it('should fail validation when the value of a form input changes.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            error: null,
            value: initialValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = () => mockError.message;
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} validate={mockValidator} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByProps({ formId: mockFormId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[4]).toEqual({
      error: mockError.message,
      formId: mockFormId,
      inputId: mockFormInputId,
      type: FORM_INPUT_ERROR
    });
  });

  it('should pass validation when the value of a form input changes.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockFormInputKey]: {
            error: mockError.message,
            value: initialValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = () => null;
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <Form id={mockFormId}>
          <FormInput id={mockFormInputId} value={initialValue} validate={mockValidator} />
        </Form>
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByProps({ formId: mockFormId })[2].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[3]).toEqual({ formId: mockFormId, inputId: mockFormInputId, type: FORM_INPUT_COMPLETE });
  });
});
