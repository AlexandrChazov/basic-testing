// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: (v: any) => v,
  };
});

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('');
    expect(spy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/users';
    const spy = jest.spyOn(axios, 'get');

    await throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(9000);

    expect(spy).toHaveBeenCalled();
    // await expect(throttledGetDataFromApi(relativePath)).resolves.toBe(1);
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
