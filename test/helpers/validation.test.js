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

import { handleFormValidation, handleInputValidation } from 'helpers/validation';

const mockError = new Error('test-error');
const mockTestKey = 'test';
const mockTestValue = true;
const mockPayload = { [mockTestKey]: mockTestValue };

describe('helpers/validation.js', () => {
  it('should skip form validation.', async () => {
    const mockValidator = null;
    const validation = await handleFormValidation(mockValidator)(mockPayload);

    expect(validation).toBeUndefined();
  });

  it('should pass form validation.', async () => {
    const mockValidator = () => null;
    const validation = await handleFormValidation(mockValidator)(mockPayload);

    expect(validation).toEqual(null);
  });

  it('should fail form validation.', async () => {
    const mockValidator = () => mockError.message;

    try {
      await handleFormValidation(mockValidator)(mockPayload);
    } catch (error) {
      expect(error.message).toEqual(mockError.message);
    }
  });

  it('should pass async form validation.', async () => {
    const mockValidator = () => Promise.resolve();
    const validation = await handleFormValidation(mockValidator)(mockPayload);

    expect(validation).toBeUndefined();
  });

  it('should fail async form validation.', async () => {
    const mockValidator = () => Promise.reject(mockError.message);

    try {
      await handleFormValidation(mockValidator)(mockPayload);
    } catch (error) {
      expect(error).toEqual(mockError.message);
    }
  });

  it('should skip input validation.', async () => {
    const mockValidator = null;
    const validation = await handleInputValidation(mockValidator)(mockTestKey, mockTestValue);

    expect(validation).toBeUndefined();
  });

  it('should pass input validation.', async () => {
    const mockValidator = () => Promise.resolve();
    const validation = await handleInputValidation(mockValidator)(mockTestKey, mockTestValue);

    expect(validation).toBeUndefined();
  });

  it('should fail input validation.', async () => {
    const mockValidator = () => mockError.message;

    try {
      await handleInputValidation(mockValidator)(mockTestKey, mockTestValue);
    } catch (error) {
      expect(error.message).toEqual(mockError.message);
    }
  });

  it('should pass async input validation.', async () => {
    const mockValidator = () => Promise.resolve();
    const validation = await handleInputValidation(mockValidator)(mockTestKey, mockTestValue);

    expect(validation).toBeUndefined();
  });

  it('should fail async input validation.', async () => {
    const mockValidator = () => Promise.reject(mockError.message);

    try {
      await handleInputValidation(mockValidator)(mockTestKey, mockTestValue);
    } catch (error) {
      expect(error).toEqual(mockError.message);
    }
  });
});
