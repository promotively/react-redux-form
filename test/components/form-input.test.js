/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import FormInput from 'components/form-input';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFormId = 'test-form';
const mockFormInputId = 'test-form-input';
const mockFormInputKey = `${mockFormId}__${mockFormInputId}`;
const mockFormInputValue = 'test';

describe('components/form-input.js', () => {
  it('renders with correct props.', () => {
    const mockOnChange = jest.fn();
    const renderer = ReactTestRenderer.create(
      <FormInput
        id={mockFormInputKey}
        onChange={mockOnChange}
        value={mockFormInputValue}
      />
    );
    const container = renderer.root;
    const expectedPropKeys = [
      'id',
      'onChange',
      'value'
    ];

    expect(Object.keys(container.findAllByType(FormInput)[0].props).join()).toEqual(expectedPropKeys.join());
  });
});
