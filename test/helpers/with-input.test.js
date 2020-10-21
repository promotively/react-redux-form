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

/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable promise/no-promise-in-callback */

import mockConsole from 'jest-mock-console';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { act, create } from 'react-test-renderer';
import thunk from 'redux-thunk';
import { Input } from 'containers/input';
import { Form } from 'containers/form';
import {
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_CREATE,
  FORM_INPUT_DISABLE,
  FORM_INPUT_ERROR,
  FORM_INPUT_FOCUS,
  FORM_INPUT_DESTROY
} from 'actions/input';

const mockFormId = 'test-form';
const mockInputId = 'test-input';
const mockInputKey = `${mockFormId}__${mockInputId}`;
const defaultValue = 'test-value';
const newValue = 'test-value-new';
const mockError = new Error('test-error');
const mockEvent = {
  preventDefault: () => true,
  target: {
    checked: false,
    value: newValue
  }
};
const createMockStore = configureStore([thunk]);
const createResolvedPromise = data => () => Promise.resolve(data);
const createRejectedPromise = error => () => Promise.reject(error);

jest.useFakeTimers();

describe('helpers/with-input.js', () => {
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
            <Input id={mockInputId} />
          </Provider>
        );
      });
    } catch (error) {
      expect(error.message).toEqual('No form identifier.');
    }

    restoreConsole();
  });

  it('should throw an error when the input identifier is undefined.', () => {
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
            <Form id={mockFormId}>
              <Input />
            </Form>
          </Provider>
        );
      });
    } catch (error) {
      expect(error.message).toEqual('No input identifier.');
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
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} value={defaultValue} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;
    const expectedPropKeys = [
      'id',
      'value',
      'complete',
      'dirty',
      'disabled',
      'error',
      'focus',
      'ready',
      'touched',
      'checked',
      'onBlur',
      'onChange',
      'onFocus'
    ];

    expect(Object.keys(container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props).join()).toEqual(
      expectedPropKeys.join()
    );
  });

  it('should create input.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    act(() => {
      create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} value={defaultValue} />
          </Form>
        </Provider>
      );
    });

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      formId: mockFormId,
      inputId: mockInputId,
      type: FORM_INPUT_CREATE,
      value: defaultValue
    });
  });

  it('should create input in disabled state.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    act(() => {
      create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input disabled id={mockInputId} />
          </Form>
        </Provider>
      );
    });

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_DISABLE });
  });

  it('should create input checkbox in checked state.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            value: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} type="checkbox" value />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    expect(container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.checked).toEqual(true);
  });

  it('should create input checkbox in unchecked state.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            value: false
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} type="checkbox" />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    expect(container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.checked).toEqual(false);
  });

  it('should create input radio.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    act(() => {
      create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input
              id={mockInputId}
              options={[{ label: 'Test', value: defaultValue }]}
              type="radio"
              value={defaultValue}
            />
          </Form>
        </Provider>
      );
    });

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      formId: mockFormId,
      inputId: mockInputId,
      type: FORM_INPUT_CREATE,
      value: defaultValue
    });
  });

  it('should destroy input.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} value={defaultValue} />
          </Form>
        </Provider>
      );
    });

    renderer.unmount();

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_DESTROY });
  });

  it('should not destroy input when destroy prop is set to false.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form destroy={false} id={mockFormId}>
            <Input id={mockInputId} value={defaultValue} />
          </Form>
        </Provider>
      );
    });

    renderer.unmount();

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(1);
  });

  it('should blur input.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            focus: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} value={defaultValue} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onBlur(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_BLUR });
  });

  it('should call custom event handler when the input has lost focus.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            value: defaultValue
          }
        }
      }
    };
    const mockOnBlur = jest.fn();
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} onBlur={mockOnBlur} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onBlur(mockEvent);

    expect(mockOnBlur.mock.calls.length).toBe(1);
  });

  it('should focus input.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            focus: false
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} value={defaultValue} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onFocus(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_FOCUS });
  });

  it('should call custom event handler when the input has focus.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            value: defaultValue
          }
        }
      }
    };
    const mockOnFocus = jest.fn();
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} onFocus={mockOnFocus} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onFocus(mockEvent);

    expect(mockOnFocus.mock.calls.length).toBe(1);
  });

  it('should change input value.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            value: defaultValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} value={defaultValue} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      formId: mockFormId,
      inputId: mockInputId,
      type: FORM_INPUT_CHANGE,
      value: newValue
    });
  });

  it('should change input checkbox value.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            value: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} type="checkbox" value />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onChange({
      ...mockEvent,
      checked: false,
      value: true
    });

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      formId: mockFormId,
      inputId: mockInputId,
      type: FORM_INPUT_CHANGE,
      value: false
    });
  });

  it('should call custom event handler when the input value changes.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            value: defaultValue
          }
        }
      }
    };
    const mockOnChange = jest.fn();
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} onChange={mockOnChange} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onChange(mockEvent);

    expect(mockOnChange.mock.calls.length).toBe(1);
  });

  it('should fail async validation when the value of a input changes.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            error: null,
            value: defaultValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = createRejectedPromise(mockError);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={defaultValue} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      error: mockError.message,
      formId: mockFormId,
      inputId: mockInputId,
      type: FORM_INPUT_ERROR
    });
  });

  it('should pass async validation when the value of a input changes.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            error: mockError.message,
            value: defaultValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = createResolvedPromise();
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={defaultValue} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_COMPLETE });
  });

  it('should fail validation when the value of a input changes.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            error: null,
            value: defaultValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = () => mockError.message;
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={defaultValue} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[2]).toEqual({
      error: mockError.message,
      formId: mockFormId,
      inputId: mockInputId,
      type: FORM_INPUT_ERROR
    });
  });

  it('should pass validation when the value of a input changes.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            error: mockError.message,
            value: defaultValue
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = () => null;
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={defaultValue} />
          </Form>
        </Provider>
      );
    });
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByProps({ id: `${mockFormId}__${mockInputId}` })[1].props.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_COMPLETE });
  });

  it('should revalidate input value and not trigger a new validation error.', () => {
    const mockValidator = jest.fn(() => null);

    let renderer = null;
    act(() => {
      const mockState = {
        form: {
          forms: {
            [mockFormId]: {}
          },
          inputs: {
            [mockInputKey]: {
              error: mockError.message,
              revalidate: false,
              value: defaultValue
            }
          }
        }
      };
      const mockStore = createMockStore(mockState);

      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={defaultValue} />
          </Form>
        </Provider>
      );
    });

    act(() => {
      const mockState = {
        form: {
          forms: {
            [mockFormId]: {}
          },
          inputs: {
            [mockInputKey]: {
              error: mockError.message,
              revalidate: true,
              value: defaultValue
            }
          }
        }
      };
      const mockStore = createMockStore(mockState);

      renderer.update(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={newValue} />
          </Form>
        </Provider>
      );
    });

    jest.runAllTimers();

    expect(mockValidator.mock.calls.length).toEqual(2);
  });

  it('should revalidate input value and trigger a new validation error.', () => {
    const mockValidator = jest.fn(() => mockError.message);

    let renderer = null;
    act(() => {
      const mockState = {
        form: {
          forms: {
            [mockFormId]: {}
          },
          inputs: {
            [mockInputKey]: {
              error: null,
              revalidate: false,
              value: defaultValue
            }
          }
        }
      };
      const mockStore = createMockStore(mockState);

      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={defaultValue} />
          </Form>
        </Provider>
      );
    });

    act(() => {
      const mockState = {
        form: {
          forms: {
            [mockFormId]: {}
          },
          inputs: {
            [mockInputKey]: {
              error: null,
              revalidate: true,
              value: defaultValue
            }
          }
        }
      };
      const mockStore = createMockStore(mockState);

      renderer.update(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={newValue} />
          </Form>
        </Provider>
      );
    });

    jest.runAllTimers();

    expect(mockValidator.mock.calls.length).toEqual(2);
  });

  it('should not revalidate input value.', () => {
    const mockValidator = jest.fn(() => mockError.message);

    let renderer = null;
    act(() => {
      const mockState = {
        form: {
          forms: {
            [mockFormId]: {}
          },
          inputs: {
            [mockInputKey]: {
              error: null,
              revalidate: false,
              value: defaultValue
            }
          }
        }
      };
      const mockStore = createMockStore(mockState);

      renderer = create(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={defaultValue} />
          </Form>
        </Provider>
      );
    });

    act(() => {
      const mockState = {
        form: {
          forms: {
            [mockFormId]: {}
          },
          inputs: {
            [mockInputKey]: {
              error: null,
              revalidate: false,
              value: defaultValue
            }
          }
        }
      };
      const mockStore = createMockStore(mockState);

      renderer.update(
        <Provider store={mockStore}>
          <Form id={mockFormId}>
            <Input id={mockInputId} validate={mockValidator} value={defaultValue} />
          </Form>
        </Provider>
      );
    });

    jest.runAllTimers();

    expect(mockValidator.mock.calls.length).toEqual(1);
  });
});
