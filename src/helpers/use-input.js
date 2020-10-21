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
 * @module helpers
 *
 * @see {@link https://github.com/facebook/react}
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/react-redux}
 * @see {@link https://github.com/reduxjs/reselect}
 */

/* eslint-disable promise/prefer-await-to-then */

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { createInputRevalidateSelector } from 'selectors/input-revalidate';
import { parseValue, stringifyValue } from 'helpers/value';
import { useFormContext } from 'helpers/use-form-context';
import {
  blurInput,
  changeInput,
  completeInput,
  createInput,
  destroyInput,
  disableInput,
  errorInput,
  focusInput
} from 'actions/input';
import { isNode } from 'helpers/platform';
import { handleInputValidation } from 'helpers/validation';
import { createInputDirtySelector } from 'selectors/input-dirty';
import { createInputCompleteSelector } from 'selectors/input-complete';
import { createInputDisabledSelector } from 'selectors/input-disabled';
import { createInputErrorSelector } from 'selectors/input-error';
import { createInputFocusSelector } from 'selectors/input-focus';
import { createInputReadySelector } from 'selectors/input-ready';
import { createInputTouchedSelector } from 'selectors/input-touched';
import { createInputValueSelector } from 'selectors/input-value';

export const useInput = (id, options = {}) => {
  const inputId = id;
  const { defaultDisabled, handleValidation, handleBlur, handleChange, handleFocus, inputType, inputOptions } = options;
  const context = useFormContext();
  const { destroy, id: formId } = context;
  const dispatch = useDispatch();
  const dirty = useSelector(createInputDirtySelector(formId, inputId));
  const complete = useSelector(createInputCompleteSelector(formId, inputId));
  const disabled = useSelector(createInputDisabledSelector(formId, inputId));
  const error = useSelector(createInputErrorSelector(formId, inputId));
  const focus = useSelector(createInputFocusSelector(formId, inputId));
  const ready = useSelector(createInputReadySelector(formId, inputId));
  const revalidate = useSelector(createInputRevalidateSelector(formId, inputId));
  const touched = useSelector(createInputTouchedSelector(formId, inputId));
  const value = useSelector(createInputValueSelector(formId, inputId));

  let ref = true;
  if (typeof options.useRef !== 'undefined') {
    ref = options.useRef;
  }

  const firstUpdate = useRef(ref);

  let { defaultValue } = options;
  if (inputType === 'checkbox') {
    defaultValue = defaultValue || false;
  } else {
    defaultValue = parseValue(defaultValue);
  }

  if (typeof formId === 'undefined') {
    throw Error('No form identifier.');
  }

  if (typeof inputId === 'undefined') {
    throw Error('No input identifier.');
  }

  if (isNode()) {
    dispatch(createInput(formId, inputId, defaultValue));

    if (defaultDisabled) {
      dispatch(disableInput(formId, inputId));
    }
  }

  const onBlur = useCallback(
    event => {
      if (handleBlur) {
        handleBlur(event);
      }

      dispatch(blurInput(formId, inputId));
    },
    [dispatch, formId, handleBlur, inputId]
  );

  const onChange = useCallback(
    event => {
      const { checked, value } = event.target;

      if (handleChange) {
        handleChange(event);
      }

      let newValue = null;
      if (inputType === 'checkbox') {
        newValue = checked;
      } else {
        newValue = parseValue(value);
      }

      dispatch(changeInput(formId, inputId, newValue));

      return handleInputValidation(handleValidation)(inputId, newValue)
        .then(() => error && dispatch(completeInput(formId, inputId)))
        .catch(caughtError => caughtError !== error && dispatch(errorInput(formId, inputId, caughtError.message)));
    },
    [dispatch, error, formId, handleChange, handleValidation, inputId, inputType]
  );

  const onFocus = useCallback(
    event => {
      if (handleFocus) {
        handleFocus(event);
      }

      dispatch(focusInput(formId, inputId));
    },
    [dispatch, formId, handleFocus, inputId]
  );

  useEffect(() => {
    if (firstUpdate.current) {
      if (!ready) {
        dispatch(createInput(formId, inputId, defaultValue));

        if (defaultDisabled) {
          dispatch(disableInput(formId, inputId));
        }

        handleInputValidation(handleValidation)(inputId, defaultValue)
          .then(() => dispatch(completeInput(formId, inputId)))
          .catch(error => {
            dispatch(errorInput(formId, inputId, error.message));
          });
      }

      firstUpdate.current = false;
    }

    if (revalidate) {
      handleInputValidation(handleValidation)(inputId, value)
        .then(() => error && dispatch(completeInput(formId, inputId)))
        .catch(error => {
          dispatch(errorInput(formId, inputId, error.message));
        });
    }

    return () => {
      if (destroy) {
        dispatch(destroyInput(formId, inputId));
      }
    };
  }, [
    defaultDisabled,
    defaultValue,
    destroy,
    dispatch,
    error,
    formId,
    handleValidation,
    inputId,
    ready,
    revalidate,
    value
  ]);

  return {
    complete,
    dirty,
    disabled,
    error,
    focus,
    id: `${formId}__${inputId}`,
    onBlur,
    onChange,
    onFocus,
    touched,
    value: stringifyValue(value),
    ...(inputType === 'checkbox' ? { checked: value || false, value: true } : { checked: false }),
    ...(inputType === 'radio'
      ? {
          options: inputOptions.map((option, index) => ({
            ...option,
            checked: value === option.value,
            id: `${formId}__${id}_${index}`,
            name: `${formId}__${id}`
          }))
        }
      : { options: [] })
  };
};
