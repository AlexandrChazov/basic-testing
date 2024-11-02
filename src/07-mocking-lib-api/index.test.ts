import axios, { Axios } from 'axios';
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

// let axiosInstance: AxiosInstance;
// let createSpy: jest.SpyInstance;

describe('throttledGetDataFromApi', () => {
  let getMock: jest.Mock;
  let createMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn().mockResolvedValue({ data: [] });
    createMock = jest.fn(() => ({ get: getMock }));
    axios.create = createMock;
  });

  // beforeEach(() => {
  //   axiosInstance = {
  //     get: jest.fn().mockResolvedValue({ data: 'test' }),
  //   } as unknown as AxiosInstance;
  //   createSpy = jest.spyOn(axios, 'create').mockReturnValue(axiosInstance);
  // });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosGet = jest.spyOn(Axios.prototype, 'get');
    axiosGet.mockImplementation(async () => ({ data: { id: 1 } }));

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
