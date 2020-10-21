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

/* eslint-disable no-console */

export const handleFormValidation = data =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
        reject(new Error('Must contain a valid email address'));
      } else {
        resolve();
      }
    }, 100)
  );

export const handleTextInputValidation = (id, value) => {
  if (value === null) {
    return 'Cannot be left empty';
  }

  return null;
};

export const handleFormSubmit = data =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        console.log(`Form Submitted With Payload: ${JSON.stringify(data)}`);
        resolve();
      } else {
        const error = new Error('This is a randomly generated form submission error.');

        console.error(`Form Error: ${error.message}`);
        reject(error);
      }
    }, 500);
  });
