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
import { TextareaComponent } from 'components/textarea';

const mockFormId = 'test-form';
const mockInputId = 'test-input';
const mockInputKey = `${mockFormId}__${mockInputId}`;
const mockInputValue = 'test';

describe('components/input.js', () => {
  it('renders correctly with default input component.', () => {
    const mockOnChange = jest.fn();
    let renderer = null;
    act(() => {
      renderer = create(<TextareaComponent id={mockInputKey} onChange={mockOnChange} value={mockInputValue} />);
    });
    const container = renderer.root;
    const expectedPropKeys = ['id', 'onChange', 'value'];

    expect(Object.keys(container.findAllByType(TextareaComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom textarea component provided by the `component` prop.', () => {
    const mockOnChange = jest.fn();
    let renderer = null;
    act(() => {
      renderer = create(
        <TextareaComponent
          component={props => <textarea {...props} />}
          id={mockInputKey}
          onChange={mockOnChange}
          value={mockInputValue}
        />
      );
    });
    const container = renderer.root;
    const expectedPropKeys = ['component', 'id', 'onChange', 'value'];

    expect(Object.keys(container.findAllByType(TextareaComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom input component provided by the `render` prop.', () => {
    const mockOnChange = jest.fn();
    const renderer = create(
      <TextareaComponent
        id={mockInputKey}
        onChange={mockOnChange}
        render={props => <textarea {...props} />}
        value={mockInputValue}
      />
    );
    const container = renderer.root;
    const expectedPropKeys = ['id', 'onChange', 'render', 'value'];

    expect(Object.keys(container.findAllByType(TextareaComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });
});
