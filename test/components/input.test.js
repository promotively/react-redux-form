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
import { InputComponent } from 'components/input';

const mockFormId = 'test-form';
const mockInputId = 'test-input';
const mockInputKey = `${mockFormId}__${mockInputId}`;
const mockInputValue = 'test';

describe('components/input.js', () => {
  it('renders correctly with default input component.', () => {
    const mockOnChange = jest.fn();
    let renderer = null;
    act(() => {
      renderer = create(<InputComponent id={mockInputKey} onChange={mockOnChange} value={mockInputValue} />);
    });
    const container = renderer.root;
    const expectedPropKeys = ['id', 'onChange', 'value', 'checked', 'options'];

    expect(Object.keys(container.findAllByType(InputComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders a checkbox correctly with default input component.', () => {
    const mockOnChange = jest.fn();
    let renderer = null;
    act(() => {
      renderer = create(
        <InputComponent id={mockInputKey} onChange={mockOnChange} type="checkbox" value={mockInputValue} />
      );
    });
    const container = renderer.root;
    const expectedPropKeys = ['id', 'onChange', 'type', 'value', 'checked', 'options'];

    expect(Object.keys(container.findAllByType(InputComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders radio buttons correctly with default input component.', () => {
    const mockOnChange = jest.fn();
    let renderer = null;
    act(() => {
      renderer = create(
        <InputComponent
          id={mockInputKey}
          onChange={mockOnChange}
          options={[{ label: 'Test', value: mockInputValue }]}
          type="radio"
          value={mockInputValue}
        />
      );
    });
    const container = renderer.root;
    const expectedPropKeys = ['id', 'onChange', 'options', 'type', 'value', 'checked'];

    expect(Object.keys(container.findAllByType(InputComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom input component provided by the `component` prop.', () => {
    const mockOnChange = jest.fn();
    let renderer = null;
    act(() => {
      renderer = create(
        <InputComponent
          component={props => <input {...props} />}
          id={mockInputKey}
          onChange={mockOnChange}
          value={mockInputValue}
        />
      );
    });
    const container = renderer.root;
    const expectedPropKeys = ['component', 'id', 'onChange', 'value', 'checked', 'options'];

    expect(Object.keys(container.findAllByType(InputComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom input component provided by the `render` prop.', () => {
    const mockOnChange = jest.fn();
    const renderer = create(
      <InputComponent
        id={mockInputKey}
        onChange={mockOnChange}
        render={props => <input {...props} />}
        value={mockInputValue}
      />
    );
    const container = renderer.root;
    const expectedPropKeys = ['id', 'onChange', 'render', 'value', 'checked', 'options'];

    expect(Object.keys(container.findAllByType(InputComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });
});
