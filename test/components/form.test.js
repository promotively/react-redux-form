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
import { FormComponent } from 'components/form';

const mockFormId = 'test-form';

describe('components/form.js', () => {
  it('renders correctly with default form component.', () => {
    let renderer = null;
    act(() => {
      renderer = create(<FormComponent id={mockFormId} />);
    });
    const container = renderer.root;
    const expectedPropKeys = ['id'];

    expect(Object.keys(container.findAllByType(FormComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom form component provided by the `component` prop.', () => {
    let renderer = null;
    act(() => {
      renderer = create(<FormComponent component={props => <form {...props} />} id={mockFormId} />);
    });
    const container = renderer.root;
    const expectedPropKeys = ['component', 'id'];

    expect(Object.keys(container.findAllByType(FormComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom form component provided by the render prop.', () => {
    let renderer = null;
    act(() => {
      renderer = create(<FormComponent id={mockFormId} render={props => <form {...props} />} />);
    });
    const container = renderer.root;
    const expectedPropKeys = ['id', 'render'];

    expect(Object.keys(container.findAllByType(FormComponent)[0].props).join()).toEqual(expectedPropKeys.join());
  });
});
