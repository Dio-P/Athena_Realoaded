import { renderHook, act } from '@testing-library/react';
import { useLazyQuery } from '@apollo/client';
import useGetAllOfType from './useGetAllOfType';

jest.mock('@apollo/client');
const query = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
  useLazyQuery.mockImplementationOnce(() => ([
    query,
    {
      error: undefined,
      data: {
        getAll: ['app', 'dataBase', 'client', 'bbc'],
      },
      refetch: jest.fn(),
    },
  ]));
});

describe('useGetAllOfType', () => {
  test('should return all the options if no query', async () => {
    const { result } = renderHook(() => useGetAllOfType('tags', ''));
    const filteredResults = result.current;

    let allOfType;
    await act(async () => {
      allOfType = await filteredResults();
    });
    expect(allOfType).toStrictEqual(['app', 'dataBase', 'client', 'bbc']);
  });
});
