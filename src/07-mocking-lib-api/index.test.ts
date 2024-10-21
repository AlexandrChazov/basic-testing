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

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  let getMock: jest.Mock;
  let createMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn().mockResolvedValue({ data: [] });
    createMock = jest.fn(() => ({ get: getMock }));
    axios.create = createMock;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/users';
    await throttledGetDataFromApi(relativePath);
    expect(getMock).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    await expect(throttledGetDataFromApi('')).resolves.toEqual([]);
  });
});
