/**
 * promotively/react-redux-form
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-form}
 */

/* eslint-disable promise/no-promise-in-callback */

import mockConsole from 'jest-mock-console';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { act, create } from 'react-test-renderer';
import thunk from 'redux-thunk';
import { Form } from 'containers/form';
import { FormComponent } from 'components/form';
import { FORM_CREATE, FORM_ERROR, FORM_DESTROY } from 'actions/form';

const mockFormId = 'test-form';
const mockInputKey = `${mockFormId}__test-input`;
const mockData = {
  test: true
};
const mockEvent = {
  preventDefault: () => true
};
const mockError = new Error('test-error');
const createMockStore = configureStore([thunk]);
const createResolvedPromise = data => () => Promise.resolve(data);
const createRejectedPromise = error => () => Promise.reject(error);

jest.useFakeTimers();

describe('helpers/with-form.js', () => {
  it('should throw an error when the form identifier is undefined.', () => {
    const restoreConsole = mockConsole();
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    try {
      act(() => {
        create(
          <Provider store={mockStore}>
            <Form />
          </Provider>
        );
      });
    } catch (error) {
      expect(error.message).toEqual('No form identifier.');
    }

    restoreConsole();
  });

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
    const mockOnSubmit = jest.fn();
    const renderer = create(
      <Provider store={mockStore}>
        <Form id={mockFormId} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;
    const expectedPropKeys = [
      'id',
      'onSubmit',
      'complete',
      'dirty',
      'disabled',
      'error',
      'focus',
      'loading',
      'touched',
      'values'
    ];

    jest.runAllTimers();

    expect(Object.keys(container.findAllByType(FormComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('should create form.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    create(
      <Provider store={mockStore}>
        <Form id={mockFormId} />
      </Provider>
    );

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ id: mockFormId, type: FORM_CREATE });
  });

  it('should destroy form.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = create(
      <Provider store={mockStore}>
        <Form id={mockFormId} />
      </Provider>
    );

    renderer.unmount();

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ id: mockFormId, type: FORM_DESTROY });
  });

  it('should not destroy form when destroy prop is set to false.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = create(
      <Provider store={mockStore}>
        <Form destroy={false} id={mockFormId} />
      </Provider>
    );

    renderer.unmount();

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(0);
  });

  it('should pass props through to child component.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            touched: false
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = create(
      <Provider store={mockStore}>
        <Form className={mockInputKey} id={mockFormId} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    expect(container.findAllByType(FormComponent)[0].props.className).toMatch(mockInputKey);
  });

  it('should fail async validation when submitting the form.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            touched: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = createRejectedPromise(mockError);
    const mockOnSubmit = createResolvedPromise(mockData);
    const renderer = create(
      <Provider store={mockStore}>
        <Form id={mockFormId} onSubmit={mockOnSubmit} validate={mockValidator} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    try {
      await container.findAllByType(FormComponent)[0].props.onSubmit(mockEvent);
    } catch (error) {
      const actions = mockStore.getActions();

      expect(actions[0]).toEqual({ error: error.message, id: mockFormId, type: FORM_ERROR });
    }
  });

  it('should pass async validation when submitting the form.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            touched: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = createResolvedPromise();
    const mockOnSubmit = createResolvedPromise(mockData);
    const renderer = create(
      <Provider store={mockStore}>
        <Form id={mockFormId} onSubmit={mockOnSubmit} validate={mockValidator} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    try {
      await container.findAllByType(FormComponent)[0].props.onSubmit(mockEvent);
    } catch (error) {
      const actions = mockStore.getActions();

      expect(actions[0]).toEqual({ error: error.message, id: mockFormId, type: FORM_ERROR });
    }
  });

  it('should fail validation when submitting the form.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            touched: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = () => mockError.message;
    const mockOnSubmit = createResolvedPromise(mockData);
    const renderer = create(
      <Provider store={mockStore}>
        <Form id={mockFormId} onSubmit={mockOnSubmit} validate={mockValidator} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    try {
      await container.findAllByType(FormComponent)[0].props.onSubmit(mockEvent);
    } catch (error) {
      const actions = mockStore.getActions();

      expect(actions[0]).toEqual({ error: error.message, id: mockFormId, type: FORM_ERROR });
    }
  });

  it('should pass validation when submitting the form.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            touched: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = () => null;
    const mockOnSubmit = createResolvedPromise(mockData);
    const renderer = create(
      <Provider store={mockStore}>
        <Form id={mockFormId} onSubmit={mockOnSubmit} validate={mockValidator} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    try {
      await container.findAllByType(FormComponent)[0].props.onSubmit(mockEvent);
    } catch (error) {
      const actions = mockStore.getActions();

      expect(actions[1]).toEqual({ error: error.message, id: mockFormId, type: FORM_ERROR });
    }
  });

  it('should handle server side errors when submitting the form.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            touched: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnSubmit = jest.fn(createRejectedPromise(mockError));
    const renderer = create(
      <Provider store={mockStore}>
        <Form id={mockFormId} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    try {
      await container.findAllByType(FormComponent)[0].props.onSubmit(mockEvent);
    } catch (error) {
      const actions = mockStore.getActions();

      expect(actions[2]).toEqual({ error: error.message, id: mockFormId, type: FORM_ERROR });
    }
  });

  it(`should submit form when it has been changed and is not loading and or
  disabled and validation has passed.`, async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            touched: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnSubmit = jest.fn(createResolvedPromise());
    const renderer = create(
      <Provider store={mockStore}>
        <Form id={mockFormId} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByType(FormComponent)[0].props.onSubmit(mockEvent);

    expect(mockOnSubmit).toBeCalled();
  });

  it('should not submit the form when it is already submitting.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {
            loading: true
          }
        },
        inputs: {
          [mockInputKey]: {
            touched: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnSubmit = jest.fn(() => Promise.resolve());
    const renderer = create(
      <Provider store={mockStore}>
        <Form id={mockFormId} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByType(FormComponent)[0].props.onSubmit(mockEvent);

    expect(mockOnSubmit).not.toBeCalled();
  });
});
