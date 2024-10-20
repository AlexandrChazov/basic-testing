import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

// jest.mock('./index', () => {
//   const originalModule =
//     jest.requireActual<typeof import('./index')>('./index');
//   originalModule.mockOne();
//   originalModule.mockTwo();
//   originalModule.mockThree();
// });

describe('partial mocking', () => {
  // beforeAll(() => {})
  // afterAll(() => {
  //   jest.unmock('./index');
  // });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {
      // does nothing
    });
    mockOne();
    mockTwo();
    mockThree();
    expect(spy).toHaveBeenCalledTimes(3);
    spy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const spy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
