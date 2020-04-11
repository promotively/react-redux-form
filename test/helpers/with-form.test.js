/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import Form from 'components/form';
import { FORM_CREATE, FORM_ERROR, FORM_REMOVE } from 'actions/form';
import withForm from 'helpers/with-form';

const mockFormId = 'test-form';
const mockFormInputKey = `${mockFormId}__test-form-input`;
const mockData = {
  test: true
};
const mockEvent = {
  preventDefault: () => true
};
const mockError = new Error('test-error');
const createMockStore = configureStore([thunk]);
const createResolvedPromise = data => () => Promise.resolve(data);
// eslint-disable-next-line promise/no-promise-in-callback
const createRejectedPromise = error => () => Promise.reject(error);

jest.useFakeTimers();

describe('helpers/with-form.js', () => {
  it('should mapStateToProps and mapDispatchToProps.', () => {
    const FormContainer = withForm()(Form);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const mockOnSubmit = jest.fn();
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;
    const expectedPropKeys = ['id', 'onSubmit', 'active', 'complete', 'dirty', 'disabled', 'error', 'loading'];

    jest.runAllTimers();

    expect(Object.keys(container.findAllByType(Form)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('should create form.', () => {
    const FormContainer = withForm()(Form);
    const mockState = {
      form: {},
      formInput: {}
    };
    const mockStore = createMockStore(mockState);

    ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} />
      </Provider>
    );

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ id: mockFormId, type: FORM_CREATE });
  });

  it('should remove form.', () => {
    const FormContainer = withForm()(Form);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} />
      </Provider>
    );

    renderer.unmount();

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ id: mockFormId, type: FORM_REMOVE });
  });

  it('should not remove form when options.destroy is set to false.', () => {
    const FormContainer = withForm({ destroy: false })(Form);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} />
      </Provider>
    );

    renderer.unmount();

    jest.runAllTimers();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(1);
  });

  it('should pass props through to child component.', () => {
    const FormContainer = withForm()(Form);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
          dirty: false
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} className={mockFormInputKey} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    expect(container.findAllByType(Form)[0].props.className).toMatch(mockFormInputKey);
  });

  it('should handle client side errors when submitting the form.', async () => {
    const FormContainer = withForm()(Form);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
          dirty: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnValidate = jest.fn(createRejectedPromise(mockError));
    const mockOnSubmit = jest.fn(createResolvedPromise(mockData));
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} onValidate={mockOnValidate} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    try {
      await container.findAllByType(Form)[0].props.onSubmit(mockEvent);
    } catch (error) {
      const actions = mockStore.getActions();

      expect(actions[1]).toEqual({ error: error.message, id: mockFormId, type: FORM_ERROR });
    }
  });

  it('should handle server side errors when submitting the form.', async () => {
    const FormContainer = withForm()(Form);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
          dirty: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnSubmit = jest.fn(createRejectedPromise(mockError));
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    try {
      await container.findAllByType(Form)[0].props.onSubmit(mockEvent);
    } catch (error) {
      const actions = mockStore.getActions();

      expect(actions[2]).toEqual({ error: error.message, id: mockFormId, type: FORM_ERROR });
    }
  });

  it(`should submit form when it has been changed and is not loading and or
  disabled and validation has passed.`, async () => {
    const FormContainer = withForm()(Form);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
          dirty: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnSubmit = jest.fn(createResolvedPromise());
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByType(Form)[0].props.onSubmit(mockEvent);

    expect(mockOnSubmit).toBeCalled();
  });

  it('should not submit the form when it has not been changed.', async () => {
    const FormContainer = withForm()(Form);
    const mockState = {
      form: {
        [mockFormId]: {}
      },
      formInput: {
        [mockFormInputKey]: {
          dirty: false
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnSubmit = jest.fn(() => Promise.resolve());
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByType(Form)[0].props.onSubmit(mockEvent);

    expect(mockOnSubmit).not.toBeCalled();
  });

  it('should not submit the form when it is already submitting.', async () => {
    const FormContainer = withForm()(Form);
    const mockState = {
      form: {
        [mockFormId]: {
          loading: true
        }
      },
      formInput: {
        [mockFormInputKey]: {
          dirty: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const mockOnSubmit = jest.fn(() => Promise.resolve());
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <FormContainer id={mockFormId} onSubmit={mockOnSubmit} />
      </Provider>
    );
    const container = renderer.root;

    jest.runAllTimers();

    await container.findAllByType(Form)[0].props.onSubmit(mockEvent);

    expect(mockOnSubmit).not.toBeCalled();
  });
});
