// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import lodash from 'lodash';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('');
    expect(spy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    // spy.mockClear();
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/users';
    jest.mock('./index');
    jest.spyOn(lodash, 'throttle').mockImplementation((v: any) => v);
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(1));

    // await throttledGetDataFromApi(relativePath);

    // jest.advanceTimersByTime(9000);
    // jest.runOnlyPendingTimers();

    // expect(spy).toHaveBeenCalled();
    await expect(throttledGetDataFromApi(relativePath)).resolves.toBe(1);
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
