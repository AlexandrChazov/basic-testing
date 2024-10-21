import { doStuffByTimeout, readFileAsynchronously, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';
import promises from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const delay = 1000;
    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, delay);

    expect(spy).toHaveBeenCalledWith(callback, delay);
    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 3000);
    // At this point in time, the callback should not have been called yet
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    const spy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(spy).toHaveBeenCalledWith(callback, interval);
    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);

    // Simulates the passage of 5 intervals
    jest.advanceTimersByTime(5000);

    expect(callback).toHaveBeenCalledTimes(5);
    spy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    const pathToFile = './Links/test.txt';

    await readFileAsynchronously(pathToFile);

    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './Not existed file.txt';

    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './Existed file.ts';
    const mockContent = 'Some file content';

    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(promises, 'readFile')
      .mockImplementation(() => Promise.resolve(mockContent));

    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(mockContent);
  });
});
