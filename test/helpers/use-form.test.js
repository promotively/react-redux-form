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
import { useForm } from 'helpers/use-form';
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

jest.mock('helpers/platform', () => ({
  isNode: jest.fn()
}));

describe('helpers/use-form.js', () => {
  beforeEach(() => {
    isNode.mockImplementation(() => false);
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
      renderHook(() => useForm(), {
        wrapper: props => {
          const { children } = props;

          return <Provider store={mockStore}>{children}</Provider>;
        }
      });
    } catch (error) {
      expect(error.message).toEqual('No form identifier.');
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
    const mockOnSubmit = jest.fn();
    const renderer = renderHook(() => useForm(mockFormId, { handleSubmit: mockOnSubmit }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider>{children}</FormContext.Provider>
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
      'loading',
      'onSubmit',
      'touched',
      'values'
    ];

    expect(Object.keys(renderer.result.current).join()).toEqual(expectedPropKeys.join());
  });

  it('should create form using useEffect for browser environments.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    // jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: true });

    renderHook(() => useForm(mockFormId), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ id: mockFormId, type: FORM_CREATE });
  });

  it('should create form without using useEffect for server environments.', () => {
    const mockState = {
      form: {
        forms: {},
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    isNode.mockImplementation(() => true);

    renderHook(() => useForm(mockFormId), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ id: mockFormId, type: FORM_CREATE });
  });

  it('should not recreate form on rerender.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);

    const renderer = renderHook(() => useForm(mockFormId, { useRef: false }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.rerender();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(0);
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
    const renderer = renderHook(() => useForm(mockFormId, { destroy: true }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.unmount();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ id: mockFormId, type: FORM_DESTROY });
  });

  it('should not destroy form when destroy option is set to false.', () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {}
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = renderHook(() => useForm(mockFormId, { destroy: false }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    renderer.unmount();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(0);
  });

  it('should fail async validation when submitting the form.', async () => {
    const mockState = {
      form: {
        forms: {
          [mockFormId]: {}
        },
        inputs: {
          [mockInputKey]: {
            dirty: true
          }
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockValidator = createRejectedPromise(mockError);
    const mockOnSubmit = createResolvedPromise(mockData);
    const renderer = renderHook(
      () => useForm(mockFormId, { handleSubmit: mockOnSubmit, handleValidation: mockValidator }),
      {
        wrapper: props => {
          const { children } = props;

          return (
            <Provider store={mockStore}>
              <FormContext.Provider>{children}</FormContext.Provider>
            </Provider>
          );
        }
      }
    );

    try {
      await renderer.result.current.onSubmit(mockEvent);
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
    const renderer = renderHook(
      () => useForm(mockFormId, { handleSubmit: mockOnSubmit, handleValidation: mockValidator }),
      {
        wrapper: props => {
          const { children } = props;

          return (
            <Provider store={mockStore}>
              <FormContext.Provider>{children}</FormContext.Provider>
            </Provider>
          );
        }
      }
    );

    try {
      await renderer.result.current.onSubmit(mockEvent);
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
    const renderer = renderHook(
      () => useForm(mockFormId, { handleSubmit: mockOnSubmit, handleValidation: mockValidator }),
      {
        wrapper: props => {
          const { children } = props;

          return (
            <Provider store={mockStore}>
              <FormContext.Provider>{children}</FormContext.Provider>
            </Provider>
          );
        }
      }
    );

    try {
      await renderer.result.current.onSubmit(mockEvent);
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
    const renderer = renderHook(
      () => useForm(mockFormId, { handleSubmit: mockOnSubmit, handleValidation: mockValidator }),
      {
        wrapper: props => {
          const { children } = props;

          return (
            <Provider store={mockStore}>
              <FormContext.Provider>{children}</FormContext.Provider>
            </Provider>
          );
        }
      }
    );

    try {
      await renderer.result.current.onSubmit(mockEvent);
    } catch (error) {
      const actions = mockStore.getActions();

      expect(actions[0]).toEqual({ error: error.message, id: mockFormId, type: FORM_ERROR });
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
    const renderer = renderHook(() => useForm(mockFormId, { handleSubmit: mockOnSubmit }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    try {
      await renderer.result.current.onSubmit(mockEvent);
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
    const renderer = renderHook(() => useForm(mockFormId, { handleSubmit: mockOnSubmit }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    await renderer.result.current.onSubmit(mockEvent);

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
    const renderer = renderHook(() => useForm(mockFormId, { handleSubmit: mockOnSubmit }), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <FormContext.Provider>{children}</FormContext.Provider>
          </Provider>
        );
      }
    });

    await renderer.result.current.onSubmit(mockEvent);

    expect(mockOnSubmit).not.toBeCalled();
  });
});
