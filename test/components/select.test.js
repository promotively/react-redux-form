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
import { SelectComponent } from 'components/select';

const mockFormId = 'test-form';
const mockInputId = 'test-input';
const mockInputKey = `${mockFormId}__${mockInputId}`;
const mockInputValue = 'test';

describe('components/input.js', () => {
  it('renders correctly with default select component.', () => {
    const mockOnChange = jest.fn();
    let renderer = null;
    act(() => {
      renderer = create(
        <SelectComponent
          id={mockInputKey}
          onChange={mockOnChange}
          options={[{ label: 'Test', value: mockInputValue }]}
          value={mockInputValue}
        />
      );
    });
    const container = renderer.root;
    const expectedPropKeys = ['id', 'onChange', 'options', 'value'];

    expect(Object.keys(container.findAllByType(SelectComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom input component provided by the `component` prop.', () => {
    const mockOnChange = jest.fn();
    let renderer = null;
    act(() => {
      renderer = create(
        <SelectComponent
          component={props => <input {...props} />}
          id={mockInputKey}
          onChange={mockOnChange}
          options={[{ label: 'Test', value: mockInputValue }]}
          value={mockInputValue}
        />
      );
    });
    const container = renderer.root;
    const expectedPropKeys = ['component', 'id', 'onChange', 'options', 'value'];

    expect(Object.keys(container.findAllByType(SelectComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom input component provided by the `render` prop.', () => {
    const mockOnChange = jest.fn();
    const renderer = create(
      <SelectComponent
        id={mockInputKey}
        onChange={mockOnChange}
        options={[{ label: 'Test', value: mockInputValue }]}
        render={props => <input {...props} />}
        value={mockInputValue}
      />
    );
    const container = renderer.root;
    const expectedPropKeys = ['id', 'onChange', 'options', 'render', 'value'];

    expect(Object.keys(container.findAllByType(SelectComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });
});
