/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Form from 'components/form';

const mockFormId = 'test-form';

describe('components/form.js', () => {
  it('renders correctly with default form component.', () => {
    const renderer = ReactTestRenderer.create(<Form id={mockFormId} />);
    const container = renderer.root;
    const expectedPropKeys = ['id'];

    expect(Object.keys(container.findAllByType(Form)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom form component provided by the `component` prop.', () => {
    const renderer = ReactTestRenderer.create(<Form id={mockFormId} component={props => <form {...props} />} />);
    const container = renderer.root;
    const expectedPropKeys = ['id', 'component'];

    expect(Object.keys(container.findAllByType(Form)[0].props).join()).toEqual(expectedPropKeys.join());
  });

  it('renders correctly with custom form component provided by the render prop.', () => {
    const renderer = ReactTestRenderer.create(<Form id={mockFormId} render={props => <form {...props} />} />);
    const container = renderer.root;
    const expectedPropKeys = ['id', 'render'];

    expect(Object.keys(container.findAllByType(Form)[0].props).join()).toEqual(expectedPropKeys.join());
  });
});
