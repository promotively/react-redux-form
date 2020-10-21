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
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable promise/no-promise-in-callback */

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import thunk from 'redux-thunk';
import { FormContext } from 'helpers/form-context';
import { isNode } from 'helpers/platform';
import { useInput } from 'helpers/use-input';
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

jest.mock('helpers/platform', () => ({
  isNode: jest.fn()
}));

describe('helpers/use-input.js', () => {
  beforeEach(() => {
    isNode.mockImplementation(() => false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error when the form identifier is undefined.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    try {
      renderHook(() => useInput(mockInputId), {
        wrapper: props => {
          const { children } = props;

          return <Provider store={mockStore}>{children}</Provider>;
        }
      });
    } catch (error) {
      expect(error.message).toEqual('No form identifier.');
    }
  });

  it('should throw an error when the input identifier is undefined.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    try {
      renderHook(() => useInput(), {
        wrapper: props => {
          const { children } = props;

          return (
            <Provider store={mockStore}>
              <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
            </Provider>
          );
        }
      });
    } catch (error) {
      expect(error.message).toEqual('No input identifier.');
    }
  });

  it('should return the correct properties and methods.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = renderHook(() => useInput(mockInputId), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });
    const expectedPropKeys = [
      'complete',
      'dirty',
      'disabled',
      'error',
      'focus',
      'id',
      'onBlur',
      'onChange',
      'onFocus',
      'touched',
      'value',
      'checked',
      'options'
    ];

    expect(Object.keys(renderer.result.current).join()).toEqual(expectedPropKeys.join());
  });

  it('should create input using useEffect for browser environments.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    renderHook(() => useInput(mockInputId, { defaultValue }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      formId: mockFormId,
      inputId: mockInputId,
      type: FORM_INPUT_CREATE,
      value: defaultValue
    });
  });

  it('should create input using useEffect for browser environments and not trigger a validation error.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = jest.fn(() => null);

    const renderer = renderHook(() => useInput(mockInputId, { handleValidation: mockValidator }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.rerender();

    expect(mockValidator).toBeCalled();
  });

  it('should create input using useEffect for browser environments and trigger a validation error.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = jest.fn(() => mockError.message);

    renderHook(() => useInput(mockInputId, { handleValidation: mockValidator }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    expect(mockValidator).toBeCalled();
  });

  it('should create input without using useEffect for server environments.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    isNode.mockImplementation(() => true);

    renderHook(() => useInput(mockInputId, { defaultValue }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      formId: mockFormId,
      inputId: mockInputId,
      type: FORM_INPUT_CREATE,
      value: defaultValue
    });
  });

  it('should not recreate input on rerender.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {
          [mockInputId]: {}
        }
      }
    };
    const mockStore = createMockStore(mockState);

    const renderer = renderHook(() => useInput(mockInputId, { useRef: false }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.rerender();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(0);
  });

  it('should create input in disabled state in browser environments.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    renderHook(() => useInput(mockInputId, { defaultDisabled: true }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_DISABLE });
  });

  it('should create input in disabled state in server environments.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    isNode.mockImplementation(() => true);

    renderHook(() => useInput(mockInputId, { defaultDisabled: true }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_DISABLE });
  });

  it('should create input checkbox in checked state.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    renderHook(() => useInput(mockInputId, { defaultValue: true, inputType: 'checkbox' }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_CREATE, value: true });
  });

  it('should create input checkbox in unchecked state.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    renderHook(() => useInput(mockInputId, { defaultValue: false, inputType: 'checkbox' }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_CREATE, value: false });
  });

  it('should create input radio.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    renderHook(
      () =>
        useInput(mockInputId, {
          defaultValue,
          inputOptions: [{ label: 'Test', value: defaultValue }],
          inputType: 'radio'
        }),
      {
        wrapper: props => {
          const { children } = props;

          return (
            <Provider store={mockStore}>
              <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
            </Provider>
          );
        }
      }
    );

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ destroy: true, id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.unmount();

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_DESTROY });
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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ destroy: false, id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.unmount();

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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.result.current.onBlur(mockEvent);

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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue, handleBlur: mockOnBlur }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.result.current.onBlur(mockEvent);

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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.result.current.onFocus(mockEvent);

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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue, handleFocus: mockOnFocus }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.result.current.onFocus(mockEvent);

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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.result.current.onChange(mockEvent);

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
    const renderer = renderHook(() => useInput(mockInputId, { inputType: 'checkbox' }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.result.current.onChange({
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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue, handleChange: mockOnChange }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.result.current.onChange(mockEvent);

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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue, handleValidation: mockValidator }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    await renderer.result.current.onChange(mockEvent);

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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue, handleValidation: mockValidator }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    await renderer.result.current.onChange(mockEvent);

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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue, handleValidation: mockValidator }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    await renderer.result.current.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
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
    const renderer = renderHook(() => useInput(mockInputId, { defaultValue, handleValidation: mockValidator }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    await renderer.result.current.onChange(mockEvent);

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ formId: mockFormId, inputId: mockInputId, type: FORM_INPUT_COMPLETE });
  });

  it('should revalidate input value and not trigger a new validation error.', () => {
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
    const mockValidator = jest.fn(() => null);

    renderHook(() => useInput(mockInputId, { defaultValue: newValue, handleValidation: mockValidator }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    expect(mockValidator).toBeCalled();
  });

  it('should revalidate input value and trigger a new validation error.', () => {
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
    const mockValidator = jest.fn(() => mockError.message);

    renderHook(() => useInput(mockInputId, { defaultValue: newValue, handleValidation: mockValidator }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider value={{ id: mockFormId }}>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    expect(mockValidator).toBeCalled();
  });
});
