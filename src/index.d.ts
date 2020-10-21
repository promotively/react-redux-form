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

/**
 * @see {@link https://github.com/microsoft/typescript}
 */

import { ParametricSelector } from 'reselect';

// Type definitions for @promotively/react-redux-form

// form constants

export const FORM_COMPLETE: string;
export const FORM_CREATE: string;
export const FORM_ERROR: string;
export const FORM_LOADING: string;
export const FORM_DESTROY: string;
export const FORM_RESET: string;

// form interfaces

export interface FormCompleteAction {
  id: string;
  type: string;
}

export interface FormCreateAction {
  id: string;
  type: string;
}

export interface FormDestroyAction {
  id: string;
  type: string;
}

export interface FormErrorAction {
  id: string;
  type: string;
}

export interface FormLoadingAction {
  id: string;
  type: string;
}

export interface FormResetAction {
  id: string;
  type: string;
}

// form action creators

export function completeForm(id: string, data: string): FormCompleteAction;

export function createForm(id: string): FormCreateAction;

export function destroyForm(id: string): FormDestroyAction;

export function errorForm(id: string, error: Error): FormErrorAction;

export function loadingForm(id: string): FormLoadingAction;

export function resetForm(id: string): FormResetAction;

export function submitForm(id: string, data: Object, props: Object, action: Function): Function;

// input constants

export const FORM_INPUT_BLUR: string;
export const FORM_INPUT_CHANGE: string;
export const FORM_INPUT_COMPLETE: string;
export const FORM_INPUT_CREATE: string;
export const FORM_INPUT_DISABLE: string;
export const FORM_INPUT_ENABLE: string;
export const FORM_INPUT_ERROR: string;
export const FORM_INPUT_FOCUS: string;
export const FORM_INPUT_DESTROY: string;

// input interfaces

export interface InputBlurAction {
  formId: string;
  inputId: string;
  type: string;
}

export interface InputChangeAction {
  formId: string;
  inputId: string;
  defaultValue: string;
  newValue: string;
  type: string;
}

export interface InputCompleteAction {
  formId: string;
  inputId: string;
  type: string;
}

export interface InputCreateAction {
  defaultValue: string;
  formId: string;
  inputId: string;
  type: string;
}

export interface InputDisableAction {
  formId: string;
  inputId: string;
  type: string;
}

export interface InputEnableAction {
  formId: string;
  inputId: string;
  type: string;
}

export interface InputErrorAction {
  formId: string;
  inputId: string;
  type: string;
}

export interface InputFocusAction {
  formId: string;
  inputId: string;
  type: string;
}

export interface InputDestroyAction {
  formId: string;
  inputId: string;
  type: string;
}

// input action creators

export function blurInput(formId: string, inputId: string): InputBlurAction;

export function changeInput(
  formId: string,
  inputId: string,
  defaultValue: string,
  newValue: string
): InputChangeAction;

export function completeInput(formId: string, inputId: string): InputCompleteAction;

export function createInput(formId: string, inputId: string, defaultValue: string): InputCreateAction;

export function disableInput(formId: string, inputId: string): InputDisableAction;

export function enableInput(formId: string, inputId: string): InputEnableAction;

export function errorInput(formId: string, inputId: string, error: string): InputErrorAction;

export function focusInput(formId: string, inputId: string): InputFocusAction;

export function destroyInput(formId: string, inputId: string): InputDestroyAction;

// form reducer

export function formReducer(state: Object, action: Object): Object;

// input reducer

export function inputReducer(state: Object, action: Object): Object;

// combined reducer
export function reducer(state: Object, action: Object): Object;

// form selectors

export function createFormCompleteSelector(id: string): ParametricSelector;

export function createFormDirtySelector(id: string): ParametricSelector;

export function createFormDisabledSelector(id: string): ParametricSelector;

export function createFormErrorSelector(id: string): ParametricSelector;

export function createFormFocusSelector(id: string): ParametricSelector;

export function createFormLoadingSelector(id: string): ParametricSelector;

export function createFormPayloadSelector(id: string): ParametricSelector;

export function createFormReadySelector(id: string): ParametricSelector;

export function createFormTouchedSelector(id: string): ParametricSelector;

export function createFormValuesSelector(id: string): ParametricSelector;

// input selectors

export function createInputCompleteSelector(formId: string, inputId: string): ParametricSelector;

export function createInputDirtySelector(formId: string, inputId: string): ParametricSelector;

export function createInputDisabledSelector(formId: string, inputId: string): ParametricSelector;

export function createInputErrorSelector(formId: string, inputId: string): ParametricSelector;

export function createInputFocusSelector(formId: string, inputId: string): ParametricSelector;

export function createInputReadySelector(formId: string, inputId: string): ParametricSelector;

export function createInpuRevalidateSelector(formId: string, inputId: string): ParametricSelector;

export function createInputTouchedSelector(formId: string, inputId: string): ParametricSelector;

export function createInputValueSelector(formId: string, inputId: string): ParametricSelector;

// form components

export interface FormProps {
  autoComplete?: string;
  className?: string;
  children: React.ReactNode;
  component?: React.ComponentType;
  id: string;
  onSubmit?: Function;
  render?: React.ComponentType;
  style?: object;
}

export interface FormExtendedProps extends FormProps {
  destroy?: boolean;
  validate?: Function;
}

export function FormComponent(props: FormProps): JSX.Element;

export function Form(props: FormExtendedProps): JSX.Element;

// input components

export interface InputProps {
  alt?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  checked?: boolean;
  className?: string;
  component?: React.ComponentType;
  disabled?: boolean;
  id: string;
  list?: string;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  multiple?: number;
  name?: string;
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
  value?: string;
}

export interface InputExtendedProps extends InputProps {
  destroy?: boolean;
  validate?: Function;
}

export function InputComponent(props: InputProps): JSX.Element;

export function Input(props: InputExtendedProps): JSX.Element;

// form helpers

export function FormContext(): object;

export function withForm<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentClass<P & FormExtendedProps>;

// input helpers

export function withInput<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentClass<P & InputExtendedProps>;
