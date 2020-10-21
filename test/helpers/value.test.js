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

import { parseValue, stringifyValue } from 'helpers/value';

describe('helpers/value.js', () => {
  it('parse number strings to numbers.', () => {
    expect(parseValue('1')).toEqual(1);
  });

  it('parse boolean strings to boolean.', () => {
    expect(parseValue('false')).toEqual(false);
    expect(parseValue('true')).toEqual(true);
  });

  it('parse boolean values as boolean values.', () => {
    expect(parseValue(false)).toEqual(false);
    expect(parseValue(true)).toEqual(true);
  });

  it('parse empty strings as null values.', () => {
    expect(parseValue('')).toBeNull();
    expect(parseValue('')).toBeNull();
  });

  it('stringify boolean values.', () => {
    expect(stringifyValue(false)).toEqual('false');
    expect(stringifyValue(true)).toEqual('true');
  });

  it('stringify null values to empty strings.', () => {
    expect(stringifyValue(null)).toEqual('');
  });
});
