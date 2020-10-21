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

import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { FormContext } from 'helpers/form-context';
import { useFormContext } from 'helpers/use-form-context';

const mockFormId = 'test-form';

describe('helpers/use-form-context.js', () => {
  it('retrieves the correct form id from the context.', () => {
    let formContext = null;

    renderHook(
      () => {
        formContext = useFormContext();
      },
      {
        wrapper: props => {
          const { children } = props;

          return <FormContext.Provider value={{ formId: mockFormId }}>{children}</FormContext.Provider>;
        }
      }
    );

    expect(formContext).toEqual({ formId: mockFormId });
  });
});
