/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import {
  FORM_CREATE,
  FORM_ERROR
} from 'actions/form';
import configureStore from 'redux-mock-store';
import Form from 'components/form';
import { Provider } from 'react-redux';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import withForm from 'helpers/with-form';

const mockFormId = 'test-form';
const mockFormInputKey = `${mockFormId}__test-form-input`;
const mockData = { test: true };
const mockEvent = { preventDefault: () => (true) };
const mockError = new Error('test-error');
const createMockStore = configureStore([ thunk ]);
const createResolvedPromise = (data) => () => Promise.resolve(data);
const createRejectedPromise = (error) => () => Promise.reject(error); // eslint-disable-line promise/no-promise-in-callback
const FormContainer = withForm(Form);

describe('helpers/with-form.js', () => {
  it('should mapStateToProps and mapDispatchToProps.', () => {
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
    const expectedPropKeys = [
      'id',
      'onSubmit',
      'active',
      'complete',
      'dirty',
      'disabled',
      'error',
      'loading',
      'errorForm'
    ];

    expect(Object.keys(container.findAllByType(Form)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('should create form.', () => {
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

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: mockFormId,
      type: FORM_CREATE
    });
  });

  it('should pass props through to child component.', () => {
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

    expect(container.findAllByType(Form)[0].props.className).toMatch(mockFormInputKey);
  });

  it('should handle client side errors when submitting the form.', (callback) => {
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

    container.findAllByType(Form)[0].props.onSubmit(mockEvent);

    setTimeout(() => {
      const actions = mockStore.getActions();

      expect(actions[1]).toEqual({
        error: mockError.message,
        id: mockFormId,
        type: FORM_ERROR
      });
      callback();
    }, 1);
  });

  it('should handle server side errors when submitting the form.', (callback) => {
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

    container.findAllByType(Form)[0].props.onSubmit(mockEvent);

    setTimeout(() => {
      const actions = mockStore.getActions();

      expect(actions[2]).toEqual({
        error: mockError.message,
        id: mockFormId,
        type: FORM_ERROR
      });
      callback();
    }, 1);
  });

  it('should submit form when it has been changed and is not loading and or disabled and validation has passed.', (callback) => {
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

    container.findAllByType(Form)[0].props.onSubmit(mockEvent);

    setTimeout(() => {
      expect(mockOnSubmit).toBeCalled();
      callback();
    }, 1);
  });

  it('should not submit the form when it has not been changed.', () => {
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

    container.findAllByType(Form)[0].props.onSubmit(mockEvent);

    expect(mockOnSubmit).not.toBeCalled();
  });

  it('should not submit the form when it is already submitting.', () => {
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

    container.findAllByType(Form)[0].props.onSubmit(mockEvent);

    expect(mockOnSubmit).not.toBeCalled();
  });
});
