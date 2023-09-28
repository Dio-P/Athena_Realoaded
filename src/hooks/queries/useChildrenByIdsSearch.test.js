import { renderHook, act } from '@testing-library/react';
import { useLazyQuery } from '@apollo/client';
import useChildrenByIdsSearch from './useChildrenByIdsSearch';
import authoringEntity from '../../fixtures/authoringEntity.json';

jest.mock('@apollo/client');
const query = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
  // useLazyQuery.mockImplementationOnce(() => ([
  //   query,
  //   {
  //     error: undefined,
  //     data: {
  //       getChildrenById: [authoringEntity],
  //     },
  //     refetch: jest.fn(),
  //   },
  // ]));
});

describe('useChildrenByIdsSearch', () => {
  test('should return a list of children entities', () => {
    useLazyQuery.mockImplementationOnce(() => ([
      query,
      {
        error: undefined,
        data: {
          getChildrenById: [authoringEntity],
        },
        refetch: jest.fn(),
      },
    ]));
    const { result } = renderHook(() => useChildrenByIdsSearch());
    console.log('*', result);
    // const [returnedChildren, searchChildren] = result.current;

    // act(() => {
    //   searchChildren(['5']);
    // });
    // expect(returnedChildren).toStrictEqual(authoringEntity);
  });
});
