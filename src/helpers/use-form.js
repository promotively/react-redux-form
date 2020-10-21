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
import { createFormValuesSelector } from 'selectors/form-values';
import { createForm, destroyForm, errorForm, submitForm } from 'actions/form';
import { isNode } from 'helpers/platform';
import { handleFormValidation } from 'helpers/validation';
import { createFormDirtySelector } from 'selectors/form-dirty';
import { createFormCompleteSelector } from 'selectors/form-complete';
import { createFormDisabledSelector } from 'selectors/form-disabled';
import { createFormErrorSelector } from 'selectors/form-error';
import { createFormFocusSelector } from 'selectors/form-focus';
import { createFormLoadingSelector } from 'selectors/form-loading';
import { createFormPayloadSelector } from 'selectors/form-payload';
import { createFormReadySelector } from 'selectors/form-ready';
import { createFormTouchedSelector } from 'selectors/form-touched';

/**
 *
 * sdf
 *
 * @function
 * @param {string} id id
 * @param {object} options options
 * @returns {object} sdf
 */
export const useForm = (id, options = {}) => {
  const { destroy, handleSubmit, handleValidation } = options;
  const dispatch = useDispatch();
  const touched = useSelector(createFormTouchedSelector(id));
  const complete = useSelector(createFormCompleteSelector(id));
  const dirty = useSelector(createFormDirtySelector(id));
  const disabled = useSelector(createFormDisabledSelector(id));
  const error = useSelector(createFormErrorSelector(id));
  const focus = useSelector(createFormFocusSelector(id));
  const loading = useSelector(createFormLoadingSelector(id));
  const payload = useSelector(createFormPayloadSelector(id));
  const ready = useSelector(createFormReadySelector(id));
  const values = useSelector(createFormValuesSelector(id));

  let ref = true;
  if (typeof options.useRef !== 'undefined') {
    ref = options.useRef;
  }

  const firstUpdate = useRef(ref);

  if (typeof id === 'undefined') {
    throw Error('No form identifier.');
  }

  if (isNode()) {
    dispatch(createForm(id));
  }

  const onSubmit = useCallback(
    event => {
      event.preventDefault();

      return new Promise((resolve, reject) => {
        if (!loading && !disabled) {
          handleFormValidation(handleValidation)(payload)
            .then(() => dispatch(submitForm(id, payload, handleSubmit)) && resolve())
            .catch(error => dispatch(errorForm(id, error)) && reject(error));
        } else {
          resolve();
        }
      });
    },
    [disabled, dispatch, handleSubmit, handleValidation, id, loading, payload]
  );

  useEffect(() => {
    if (firstUpdate.current) {
      if (!ready) {
        dispatch(createForm(id));
      }

      firstUpdate.current = false;
    }

    return () => {
      if (destroy) {
        dispatch(destroyForm(id));
      }
    };
  }, [destroy, dispatch, id, ready]);

  return { complete, dirty, disabled, error, focus, loading, onSubmit, touched, values };
};
