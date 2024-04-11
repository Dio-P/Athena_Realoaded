import { renderHook, act } from '@testing-library/react';
import { useLazyQuery } from '@apollo/client';
import useEntityByIdSearch from './useEntityByIdSearch';
import authoringEntity from '../../fixtures/authoringEntity.json';

jest.mock('@apollo/client');
const query = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
  useLazyQuery.mockImplementationOnce(() => ([
    query,
    {
      error: undefined,
      data: {
        getEntityById: authoringEntity,
      },
      refetch: jest.fn(),
    },
  ]));
});

describe('useEntityByIdSearch', () => {
  test('should be able to return an entities', () => {
    const { result } = renderHook(() => useEntityByIdSearch());
    const [returnedEntity, searchEntity] = result.current;

    act(() => {
      searchEntity('5');
    });
    expect(returnedEntity).toStrictEqual(authoringEntity);
  });
});
