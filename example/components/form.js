/*
 * @promotively/react-redux-form
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-form}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import Alert from './alert';
import Meta from './meta';
import React from 'react';
import Wrapper from './wrapper';

const Form = (props) => (
  <div style={{ marginTop: '10px' }}>
    <Wrapper>
      <div style={{ paddingBottom: '10px' }}>The below boxes display all the possible properties available for you to use in your own form components.</div>
      <div style={{ display: 'flex' }}>
        <Meta name="Active" value={props.active} />
        <Meta name="Dirty" value={props.dirty} />
        <Meta name="Complete" value={props.complete} />
        <Meta name="Disabled" value={props.disabled} />
        <Meta name="Error" value={Boolean(props.error)} />
        <Meta name="Loading" value={props.loading} />
      </div>
    </Wrapper>
    <form id={props.id} onSubmit={props.onSubmit}>
      {props.children}
    </form>
    <div style={{ marginTop: '10px' }}>
      {props.loading ? <Alert type="info">The form is submitting, please wait.</Alert> : null}
      {!props.loading && props.error ? <Alert type="error">{props.error}</Alert> : null}
      {!props.loading && props.complete ? <Alert type="success">The form was successfully submitted.</Alert> : null}
    </div>
  </div>
);

export default Form;
