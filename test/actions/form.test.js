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

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  completeForm,
  createForm,
  errorForm,
  loadingForm,
  FORM_COMPLETE,
  FORM_CREATE,
  FORM_ERROR,
  FORM_LOADING,
  FORM_DESTROY,
  FORM_RESET,
  destroyForm,
  resetForm,
  submitForm
} from 'actions/form';

const createMockStore = configureStore([thunk]);

const formId = 'test-form';
const mockPayload = { test: true };
const mockResponse = { test: true };
const mockError = new Error('test-error');

describe('actions/form.js', () => {
  it('should handle creating a form.', () => {
    expect(createForm(formId)).toEqual({
      id: formId,
      type: FORM_CREATE
    });
  });

  it('should handle setting the error state on a form.', () => {
    expect(errorForm(formId, mockError)).toEqual({
      error: mockError.message,
      id: formId,
      type: FORM_ERROR
    });
  });

  it('should handle setting the loading state on a form.', () => {
    expect(loadingForm(formId)).toEqual({
      id: formId,
      type: FORM_LOADING
    });
  });

  it('should handle setting the complete state on a form.', () => {
    expect(completeForm(formId, mockPayload)).toEqual({
      id: formId,
      payload: mockPayload,
      type: FORM_COMPLETE
    });
  });

  it('should handle removing a form.', () => {
    expect(destroyForm(formId)).toEqual({
      id: formId,
      type: FORM_DESTROY
    });
  });

  it('should handle resetting a form.', () => {
    expect(resetForm(formId)).toEqual({
      id: formId,
      type: FORM_RESET
    });
  });

  it('should handle submitting a form with a custom action.', async () => {
    const mockStore = createMockStore();
    const formAction = () => Promise.resolve();

    await mockStore.dispatch(submitForm(formId, mockPayload, formAction));

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: formId,
      payload: mockPayload,
      type: FORM_LOADING
    });
  });

  it('should handle submitting a form without a custom action.', async () => {
    const mockStore = createMockStore();

    await mockStore.dispatch(submitForm(formId, mockPayload));

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: formId,
      payload: mockPayload,
      type: FORM_LOADING
    });
  });

  it('should handle submitting a form when an error occurs.', async () => {
    const mockStore = createMockStore();
    const formAction = () => Promise.reject(mockError);

    try {
      await mockStore.dispatch(submitForm(formId, mockPayload, formAction));
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
    const formAction = () => Promise.resolve(mockResponse);

    await mockStore.dispatch(submitForm(formId, mockPayload, formAction));

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      id: formId,
      payload: mockPayload,
      response: mockResponse,
      type: FORM_COMPLETE
    });
  });

  it('should handle submitting a form and resolving a promise successfully.', async () => {
    const FORM_ACTION_TEST = '@@promotively/FORM_ACTION_TEST';
    const mockStore = createMockStore();
    const formAction = data =>
      new Promise(resolve => {
        mockStore.dispatch({
          data,
          type: FORM_ACTION_TEST
        });

        resolve();
      });

    await mockStore.dispatch(submitForm(formId, mockPayload, formAction));

    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      data: mockResponse,
      type: FORM_ACTION_TEST
    });
  });
});
