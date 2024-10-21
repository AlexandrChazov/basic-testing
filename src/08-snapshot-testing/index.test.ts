import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1, 2])).toStrictEqual({
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 2,
      },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([1, 2, 3, 4, 5]);
    expect(linkedList).toMatchSnapshot();
  });
});
