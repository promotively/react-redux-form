/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import {
  completeForm,
  createForm,
  errorForm,
  loadingForm,
  FORM_COMPLETE,
  FORM_CREATE,
  FORM_ERROR,
  FORM_LOADING,
  FORM_REMOVE,
  removeForm,
  submitForm
} from 'actions/form';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureStore([ thunk ]);

const formId = 'test-form';
const mockData = { test: true };
const mockError = new Error('test-error');
const mockResponse = { error: false };

describe('actions/form.js', () => {
  it('should handle creating a form.', () => {
    expect(createForm(formId)).toEqual({
      id: formId,
      type: FORM_CREATE
    });
  });

  it('should handle setting the error state on a form.', () => {
    expect(errorForm(
      formId,
      mockError
    )).toEqual({
      error: mockError.message,
      id: formId,
      type: FORM_ERROR
    });
  });

  it('should handle setting the loading state on a form.', () => {
    expect(loadingForm(
      formId
    )).toEqual({
      id: formId,
      type: FORM_LOADING
    });
  });

  it('should handle setting the complete state on a form.', () => {
    expect(completeForm(
      formId,
      mockData
    )).toEqual({
      data: mockData,
      id: formId,
      type: FORM_COMPLETE
    });
  });

  it('should handle removing a form.', () => {
    expect(removeForm(
      formId
    )).toEqual({
      id: formId,
      type: FORM_REMOVE
    });
  });

  it('should handle submitting a form.', async () => {
    const mockStore = createMockStore();
    const formAction = () => (
      Promise.resolve()
    );

    await mockStore.dispatch(submitForm(
      formId,
      mockData,
      formAction
    ));

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: formId,
      type: FORM_LOADING
    });
  });

  it('should handle submitting a form when an error occurs.', async () => {
    const mockStore = createMockStore();
    const formAction = () => (
      Promise.reject(mockError)
    );

    try {
      await mockStore.dispatch(submitForm(
        formId,
        mockData,
        formAction
      ));
    } catch (error) {
      const actions = mockStore.getActions();

      expect(actions[1]).toEqual({
        error: mockError.message,
        id: formId,
        type: FORM_ERROR
      });
    }
  });

  it('should handle submitting a form successfully.', async () => {
    const mockStore = createMockStore();
    const formAction = () => (
      Promise.resolve(mockResponse)
    );

    await mockStore.dispatch(submitForm(
      formId,
      mockResponse,
      formAction
    ));

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      data: mockResponse,
      id: formId,
      type: FORM_COMPLETE
    });
  });

  it('should handle submitting a form and resolving a promise successfully.', async () => {
    const FORM_ACTION_TEST = '@@promotively/FORM_ACTION_TEST';
    const mockStore = createMockStore();
    const formAction = (data) => (
      new Promise((resolve) => {
        mockStore.dispatch({
          data,
          type: FORM_ACTION_TEST
        });

        resolve();
      })
    );

    await mockStore.dispatch(submitForm(
      formId,
      mockData,
      formAction
    ));

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      data: mockData,
      type: FORM_ACTION_TEST
    });
  });
});
