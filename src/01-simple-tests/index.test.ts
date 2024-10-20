// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 1, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Multiply })).toBe(6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(27);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: "Go" })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: "3", b: 3, action: Action.Exponentiate })).toBeNull();
    expect(simpleCalculator({ a: 3, b: "3", action: Action.Exponentiate })).toBeNull();
  });
});
