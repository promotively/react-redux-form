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

/**
 * @module reducers
 *
 * @see {@link https://github.com/reduxjs/redux}
 */

import { FORM_CREATE, FORM_DESTROY, FORM_LOADING, FORM_COMPLETE, FORM_ERROR } from 'actions/form';

/**
 * Initial state used for the first time the reducer function is called.
 *
 * @constant
 * @type {object}
 */
const initialState = {};

/**
 * The redux.js reducer function to handle any state mutations that are required for handling forms.
 *
 * @function
 * @param {object} state The current state inside the redux.js store.
 * @param {object} action The last redux.js action that was dispatched.
 * @returns {object} Deep clone of the existing state of the store with any mutations related to handling forms.
 */
export const formReducer = (state = initialState, action) => {
  const { error, id: formId, payload, type } = action;

  switch (type) {
    case FORM_CREATE: {
      return {
        ...Object.keys(state).reduce((result, key) => {
          result[key] = {
            ...state[key]
          };

          return result;
        }, {}),
        ...{
          [formId]: {
            complete: false,
            error: null,
            loading: false
          }
        }
      };
    }
    case FORM_DESTROY: {
      return Object.keys(state).reduce((result, key) => {
        if (formId !== key) {
          result[key] = {
            ...state[key]
          };
        }

        return result;
      }, {});
    }
    case FORM_LOADING: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(formId === key
            ? {
                complete: false,
                error: null,
                loading: true,
                values: payload
              }
            : null)
        };

        return result;
      }, {});
    }
    case FORM_COMPLETE: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(formId === key
            ? {
                complete: true,
                error: null,
                loading: false
              }
            : null)
        };

        return result;
      }, {});
    }
    case FORM_ERROR: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(formId === key
            ? {
                complete: false,
                error,
                loading: false
              }
            : null)
        };

        return result;
      }, {});
    }
    default:
      return state;
  }
};
