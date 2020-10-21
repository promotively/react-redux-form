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

import { FORM_RESET } from 'actions/form';
import {
  FORM_INPUT_BLUR,
  FORM_INPUT_CHANGE,
  FORM_INPUT_CREATE,
  FORM_INPUT_DISABLE,
  FORM_INPUT_ENABLE,
  FORM_INPUT_FOCUS,
  FORM_INPUT_DESTROY,
  FORM_INPUT_COMPLETE,
  FORM_INPUT_ERROR,
  FORM_INPUT_RESET
} from 'actions/input';

/**
 * Initial state used for the first time the redux.js reducer function is called.
 *
 * @constant
 * @type {object}
 */
const initialState = {};

/**
 * The redux.js reducer function to handle any state mutations that are required for handling inputs.
 *
 * @function
 * @param {object} state The current state inside the redux.js store.
 * @param {object} action The last redux.js action that was dispatched.
 * @returns {object} Deep clone of the existing state of the store with any mutations related to handling inputs.
 */
export const inputReducer = (state = initialState, action) => {
  const { error, formId, inputId, type, value } = action;

  switch (type) {
    case FORM_INPUT_CREATE: {
      return {
        ...Object.keys(state).reduce((result, key) => {
          result[key] = {
            ...state[key]
          };

          return result;
        }, {}),
        ...{
          [`${formId}__${inputId}`]: {
            default: value,
            disabled: false,
            error: null,
            focus: false,
            revalidate: true,
            touched: false,
            value
          }
        }
      };
    }
    case FORM_INPUT_DESTROY: {
      return Object.keys(state).reduce((result, key) => {
        if (`${formId}__${inputId}` !== key) {
          result[key] = {
            ...state[key]
          };
        }

        return result;
      }, {});
    }
    case FORM_INPUT_FOCUS: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(`${formId}__${inputId}` === key ? { focus: true } : null)
        };

        return result;
      }, {});
    }
    case FORM_INPUT_BLUR: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(`${formId}__${inputId}` === key
            ? {
                focus: false,
                touched: true
              }
            : null)
        };

        return result;
      }, {});
    }
    case FORM_INPUT_CHANGE: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(`${formId}__${inputId}` === key ? { value } : null)
        };

        return result;
      }, {});
    }
    case FORM_INPUT_ERROR: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(`${formId}__${inputId}` === key
            ? {
                error,
                revalidate: false
              }
            : null)
        };

        return result;
      }, {});
    }
    case FORM_INPUT_COMPLETE: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(`${formId}__${inputId}` === key
            ? {
                error: null,
                revalidate: false
              }
            : null)
        };

        return result;
      }, {});
    }
    case FORM_INPUT_DISABLE: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(`${formId}__${inputId}` === key ? { disabled: true } : null)
        };

        return result;
      }, {});
    }
    case FORM_INPUT_ENABLE: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(`${formId}__${inputId}` === key ? { disabled: false } : null)
        };

        return result;
      }, {});
    }
    case FORM_INPUT_RESET: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(`${formId}__${inputId}` === key
            ? {
                error: null,
                revalidate: true,
                value: state[key].default
              }
            : null)
        };

        return result;
      }, {});
    }
    case FORM_RESET: {
      return Object.keys(state).reduce((result, key) => {
        result[key] = {
          ...state[key],
          ...(state[key].value !== state[key].default
            ? {
                error: null,
                revalidate: true,
                value: state[key].default
              }
            : {
                revalidate: false
              })
        };

        return result;
      }, {});
    }
    default:
      return state;
  }
};
