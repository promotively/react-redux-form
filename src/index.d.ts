/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2020, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-form}
 * @license MIT
 */

/**
 * @see {@link https://github.com/microsoft/typescript}
 */

// Type definitions for @promotively/react-redux-form

// form constants

export const FORM_COMPLETE: string;
export const FORM_CREATE: string;
export const FORM_ERROR: string;
export const FORM_LOADING: string;
export const FORM_REMOVE: string;

// form input constants

export const FORM_INPUT_BLUR: string;
export const FORM_INPUT_CHANGE: string;
export const FORM_INPUT_COMPLETE: string;
export const FORM_INPUT_CREATE: string;
export const FORM_INPUT_DISABLE: string;
export const FORM_INPUT_ENABLE: string;
export const FORM_INPUT_ERROR: string;
export const FORM_INPUT_FOCUS: string;
export const FORM_INPUT_REMOVE: string;

// form input actions

export interface iFormInputActionBlur {
  formId: string;
  inputId: string;
  type: string;
}

export interface iFormInputActionChange {
  formId: string;
  inputId: string;
  initialValue: string;
  newValue: string;
  type: string;
}

export interface iFormInputActionComplete {
  formId: string;
  inputId: string;
  type: string;
}

export interface iFormInputActionCreate {
  initialValue: string;
  formId: string;
  inputId: string;
  type: string;
}

export interface iFormInputActionDisable {
  formId: string;
  inputId: string;
  type: string;
}

export interface iFormInputActionEnable {
  formId: string;
  inputId: string;
  type: string;
}

export interface iFormInputActionError {
  formId: string;
  inputId: string;
  type: string;
}

export interface iFormInputActionFocus {
  formId: string;
  inputId: string;
  type: string;
}

export interface iFormInputActionRemove {
  formId: string;
  inputId: string;
  type: string;
}

export function blurFormInput(formId: string, inputId: string): iFormInputActionBlur;

export function changeFormInput(
  formId: string,
  inputId: string,
  initialValue: string,
  newValue: string
): iFormInputActionChange;

export function completeFormInput(formId: string, inputId: string): iFormInputActionComplete;

export function createFormInput(formId: string, inputId: string, initialValue: string): iFormInputActionCreate;

export function disableFormInput(formId: string, inputId: string): iFormInputActionDisable;

export function enableFormInput(formId: string, inputId: string): iFormInputActionEnable;

export function errorFormInput(formId: string, inputId: string, error: string): iFormInputActionError;

export function focusFormInput(formId: string, inputId: string): iFormInputActionFocus;

export function removeFormInput(formId: string, inputId: string): iFormInputActionRemove;

// form actions

export interface iFormActionCreate {
  id: string;
  type: string;
}

export interface iFormActionRemove {
  id: string;
  type: string;
}

export interface iFormActionError {
  id: string;
  type: string;
}

export interface iFormActionLoading {
  id: string;
  type: string;
}

export interface iFormActionComplete {
  id: string;
  type: string;
}

export function createForm(id: string): iFormActionCreate;

export function removeForm(id: string): iFormActionRemove;

export function errorForm(id: string, error: Error): iFormActionError;

export function loadingForm(id: string): iFormActionLoading;

export function completeForm(id: string, data: string): iFormActionComplete;

export function submitForm(id: string, data: Object, props: Object, action: Function): Function;

// form reducer

export function formReducer(state: Object, action: Object): Object;

// form input reducer

export function formInputReducer(state: Object, action: Object): Object;

// form selectors

export function createFormActiveSelector(id: string): Function;

export function createFormCompleteSelector(id: string): Function;

export function createFormDataSelector(id: string): Function;

export function createFormDirtySelector(id: string): Function;

export function createFormDisabledSelector(id: string): Function;

export function createFormErrorSelector(id: string): Function;

export function createFormLoadingSelector(id: string): Function;

// form input selectors

export function createFormInputActiveSelector(formId: string, inputId: string): Function;

export function createFormInputCompleteSelector(formId: string, inputId: string): Function;

export function createFormInputDirtySelector(formId: string, inputId: string): Function;

export function createFormInputDisabledSelector(formId: string, inputId: string): Function;

export function createFormInputErrorSelector(formId: string, inputId: string): Function;

export function createFormInputFocusSelector(formId: string, inputId: string): Function;

export function createFormInputValueSelector(formId: string, inputId: string): Function;

// form component

export interface iFormProps {
  autoComplete?: string;
  className?: string;
  children: React.ReactNode;
  component?: React.ComponentType;
  id: string;
  onSubmit?: Function;
  render?: React.ComponentType;
  style?: object;
  validate?: Function;
}

export function Form(props: iFormProps): React.ComponentType;

// form input component

export interface iFormInputProps {
  alt?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  checked?: boolean;
  className?: string;
  children?: React.ReactNode;
  component?: React.ComponentType;
  disabled?: boolean;
  id: string;
  list?: string;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  multiple?: number;
  onBlur?: Function;
  onChange?: Function;
  onFocus?: Function;
  placeholder?: string;
  readOnly?: boolean;
  render?: React.ComponentType;
  src?: string;
  step?: number;
  style?: object;
  type?: string;
  validate?: Function;
  value?: string;
}

export function FormInput(props: iFormInputProps): React.ComponentType;

// form helpers

export function FormContext(): object;

export interface iFormOptions {
  destroy?: boolean;
}

export function withForm(
  params?: iFormOptions
): <P extends object>(Component: React.ComponentType<P>) => React.ComponentClass<P & iFormProps>;

// form input helpers

export interface iFormInputOptions {
  destroy?: boolean;
}

export function withFormInput(
  params?: iFormInputOptions
): <P extends object>(Component: React.ComponentType<P>) => React.ComponentClass<P & iFormInputProps>;
