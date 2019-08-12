/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

import Form from 'components/form';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFormId = 'test-form';

describe('components/form.js', () => {
  it('renders with correct props.', () => {
    const mockOnSubmit = jest.fn();
    const renderer = ReactTestRenderer.create(
      <Form
        id={mockFormId}
        onSubmit={mockOnSubmit}
        noValidate
      />
    );
    const container = renderer.root;
    const expectedPropKeys = [
      'id',
      'onSubmit',
      'noValidate'
    ];

    expect(Object.keys(container.findAllByType(Form)[0].props).join()).toEqual(expectedPropKeys.join());
  });
});
