import { useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_ALL_OF_TYPE = gql`
  query($ofType: String!) {
    getAll(ofType: $ofType)
  }`;

const useGetAllOfType = (ofType, queryString) => {
  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_OF_TYPE,
  );

  useEffect(() => {
    console.log('inside the query useEffect');
    if (ofType && !(ofType === 'entity')) {
      query({
        variables: { ofType },
      });
    }
  }, [ofType]);

  useEffect(() => {
    if (error) {
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [error, loading]);

  const filterResults = () => {
    if (data?.getAll) {
      if (!queryString) {
        return '';
      }
      return data.getAll.filter((type) => (
        type.toLowerCase().includes(queryString)
      ));
    }
    return undefined;
  };

  const filteredResults = useMemo(() => filterResults(), [queryString]);

  return [filteredResults];
};

export default useGetAllOfType;
