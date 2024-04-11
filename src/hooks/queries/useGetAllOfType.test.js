import { renderHook } from '@testing-library/react';
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
    const [filteredResults] = result.current;

    // let allOfType;
    // await act(async () => {
    //   allOfType = await filteredResults();
    // });

    expect(filteredResults).toStrictEqual(['app', 'dataBase', 'client', 'bbc']);
  });

  test('should return filtered results if query', async () => {
    const { result } = renderHook(() => useGetAllOfType('tags', 'data'));
    const [filteredResults] = result.current;

    expect(filteredResults).toStrictEqual(['dataBase']);
  });
});
