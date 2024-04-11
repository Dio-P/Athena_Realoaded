import { renderHook, act } from '@testing-library/react';
import { useLazyQuery } from '@apollo/client';
import useChildrenByIdsSearch from './useChildrenByIdsSearch';
import authoringEntity from '../../fixtures/authoringEntity.json';
import curationEntity from '../../fixtures/curationEntity.json';

jest.mock('@apollo/client');
const query = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
});

describe('useChildrenByIdsSearch', () => {
  test('should return a list of children entities if single id', () => {
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
    const [returnedChildren, searchChildren] = result.current;

    act(() => {
      searchChildren(['5']);
    });
    expect(returnedChildren).toStrictEqual([authoringEntity]);
  });

  test('should return multiple list of children entities if multiple ids', () => {
    useLazyQuery.mockImplementationOnce(() => ([
      query,
      {
        error: undefined,
        data: {
          getChildrenById: [authoringEntity, curationEntity],
        },
        refetch: jest.fn(),
      },
    ]));
    const { result } = renderHook(() => useChildrenByIdsSearch());
    const [returnedChildren, searchChildren] = result.current;

    act(() => {
      searchChildren(['5', '6']);
    });
    expect(returnedChildren).toStrictEqual([authoringEntity, curationEntity]);
  });
});
