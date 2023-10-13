import { useEffect } from 'react';
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
    if (ofType) {
      console.log('ofType@', ofType);
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
        return data.getAll;
      }
      return data.getAll.filter((type) => (
        type.includes(queryString)
      ));
    }
    return undefined;
  };

  return [filterResults];
};

export default useGetAllOfType;
