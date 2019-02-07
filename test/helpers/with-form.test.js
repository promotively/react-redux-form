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
  FORM_ERROR,
  FORM_REMOVE
} from 'actions/form';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import React from 'react';
import thunk from 'redux-thunk';
import withForm from 'helpers/with-form';

Enzyme.configure({ adapter: new Adapter() });

const formId = 'test-form';
const inputKey = `${formId}__test-form-input`;
const mockData = { test: true };
const mockEvent = { preventDefault: () => (true) };
const mockError = new Error('test-error');
const createMockStore = configureStore([ thunk ]);
const MockComponent = (props) => <form {...props} />;

describe('helpers/with-form.js', () => {
  it('should mapStateToProps and mapDispatchToProps.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const FormContainer = withForm(MockComponent);
    const mockOnSubmit = jest.fn();
    const container = Enzyme.shallow(<FormContainer id={formId} onSubmit={mockOnSubmit} />, {
      context: {
        store: mockStore
      }
    });

    const expectedPropKeys = [
      'id',
      'onSubmit',
      'active',
      'complete',
      'data',
      'dirty',
      'disabled',
      'error',
      'loading',
      'createForm',
      'errorWithForm',
      'removeForm',
      'submitForm'
    ];

    expect(Object.keys(container.props())).toEqual(expectedPropKeys);
  });

  it('should create form.', () => {
    const mockState = {
      form: {},
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const FormContainer = withForm(MockComponent);
    const container = Enzyme.shallow(<FormContainer id={formId} />, {
      context: {
        store: mockStore
      }
    });

    container.dive();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: formId,
      type: FORM_CREATE
    });
  });

  it('should remove form.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {}
    };
    const mockStore = createMockStore(mockState);
    const FormContainer = withForm(MockComponent);
    const container = Enzyme.shallow(<FormContainer id={formId} />, {
      context: {
        store: mockStore
      }
    });

    container.dive().unmount();

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      id: formId,
      type: FORM_REMOVE
    });
  });

  it('should pass props through to child component.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          dirty: false
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const FormContainer = withForm(MockComponent);
    const container = Enzyme.shallow(<FormContainer id={formId} className={inputKey} />, {
      context: {
        store: mockStore
      }
    });

    container.dive().find(MockComponent).exists(`.${inputKey}`);
  });

  it('should handle client side errors when submitting the form.', (callback) => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          dirty: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const FormContainer = withForm(MockComponent);
    const mockOnValidate = jest.fn(() => Promise.reject(mockError));
    const mockOnSubmit = jest.fn(() => Promise.resolve(mockData));
    const container = Enzyme.shallow(<FormContainer id={formId} onValidate={mockOnValidate} onSubmit={mockOnSubmit} />, {
      context: {
        store: mockStore
      }
    });

    container.dive().find(MockComponent).simulate('submit', mockEvent);

    setTimeout(() => {
      const actions = mockStore.getActions();

      expect(actions[1]).toEqual({
        error: mockError.message,
        id: formId,
        type: FORM_ERROR
      });
      callback();
    }, 1);
  });

  it('should handle server side errors when submitting the form.', (callback) => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          dirty: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const FormContainer = withForm(MockComponent);
    const mockOnSubmit = jest.fn(() => Promise.reject(mockError));
    const container = Enzyme.shallow(<FormContainer id={formId} onSubmit={mockOnSubmit} />, {
      context: {
        store: mockStore
      }
    });

    container.dive().find(MockComponent).simulate('submit', mockEvent);

    setTimeout(() => {
      const actions = mockStore.getActions();

      expect(actions[2]).toEqual({
        error: mockError.message,
        id: formId,
        type: FORM_ERROR
      });
      callback();
    }, 1);
  });

  it('should submit form when it has been changed and is not loading and or disabled and validation has passed.', (callback) => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          dirty: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const FormContainer = withForm(MockComponent);
    const mockOnSubmit = jest.fn(() => Promise.resolve());
    const container = Enzyme.shallow(<FormContainer id={formId} onSubmit={mockOnSubmit} />, {
      context: {
        store: mockStore
      }
    });

    container.dive().find(MockComponent).simulate('submit', mockEvent);

    setTimeout(() => {
      expect(mockOnSubmit).toBeCalled();
      callback();
    }, 1);
  });

  it('should not submit the form when it has not been changed.', () => {
    const mockState = {
      form: {
        [formId]: {}
      },
      formInput: {
        [inputKey]: {
          dirty: false
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const FormContainer = withForm(MockComponent);
    const mockOnSubmit = jest.fn(() => Promise.resolve());
    const container = Enzyme.shallow(<FormContainer id={formId} onSubmit={mockOnSubmit} />, {
      context: {
        store: mockStore
      }
    });

    container.dive().find(MockComponent).simulate('submit', mockEvent);

    expect(mockOnSubmit).not.toBeCalled();
  });

  it('should not submit the form when it is already submitting.', () => {
    const mockState = {
      form: {
        [formId]: {
          loading: true
        }
      },
      formInput: {
        [inputKey]: {
          dirty: true
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const FormContainer = withForm(MockComponent);
    const mockOnSubmit = jest.fn(() => Promise.resolve());
    const container = Enzyme.shallow(<FormContainer id={formId} onSubmit={mockOnSubmit} />, {
      context: {
        store: mockStore
      }
    });

    container.dive().find(MockComponent).simulate('submit', mockEvent);

    expect(mockOnSubmit).not.toBeCalled();
  });
});
