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

import React from 'react';
import { act, create } from 'react-test-renderer';
import { FormContext } from 'helpers/form-context';
import { withFormContext } from 'helpers/with-form-context';

const mockFormId = 'test-form';
const MockComponent = () => null;
const WrappedComponent = withFormContext(MockComponent);

it('should pass form id from context to child component as props.', () => {
  let renderer = null;
  act(() => {
    renderer = create(
      <FormContext.Provider value={{ id: mockFormId }}>
        <WrappedComponent />
      </FormContext.Provider>
    );
  });
  const container = renderer.root;

  expect(container.findAllByType(MockComponent)[0].props.formId).toEqual(mockFormId);
});
