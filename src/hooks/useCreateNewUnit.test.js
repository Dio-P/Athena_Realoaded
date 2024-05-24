import { renderHook } from '@testing-library/react';
import { useLazyQuery } from '@apollo/client';
import useCreateNewUnit from './useCreateNewUnit';

jest.mock('@apollo/client');
const useGetAllDocs = jest.fn();
const useAddNewEntities = jest.fn();
// const [allUnitsOfTypeDoc] = useGetAllDocs();
// const [addEntities] = useAddNewEntities();
beforeEach(() => {
  jest.clearAllMocks();
  useGetAllDocs.mockImplementation(() => [
    // to add examples of doc entities
  ]);
  useAddNewEntities.mockImplementation(() => [
    // to return what the funtion should return ?
  ]);
});

describe('useCreateNewUnit', () => {
  describe('allDocsEntityIdsArray', () => {
    test('', () => {

    });
  });
  // test('should return all the options if no query', async () => {
  //   const { result } = renderHook(() => useCreateNewUnit('tags', ''));
  //   const [filteredResults] = result.current;

  //   // let allOfType;
  //   // await act(async () => {
  //   //   allOfType = await filteredResults();
  //   // });

  //   expect(filteredResults).toStrictEqual(['app', 'dataBase', 'client', 'bbc']);
  // });
});
