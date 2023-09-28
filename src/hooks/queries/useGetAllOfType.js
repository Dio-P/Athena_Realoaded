import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_ALL_OF_TYPE = gql`
  query($ofType: String!) {
    getAll(ofType: $ofType)
  }`;

const useGetAllOfType = (ofType, queryString) => {
  const [allOfType, setAllOfType] = useState(undefined);
  const [filteredResults, setFilteredResults] = useState(undefined);

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
    if (data) {
      console.log('data£$', data);
      setAllOfType(data.getAll);
    } if (error) {
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (allOfType) {
      console.log('inside all of type@@', allOfType);
      if (!queryString) {
        console.log('no query string ');
        setFilteredResults('');
      } else {
        setFilteredResults(allOfType.filter((type) => (
          type.includes(queryString)
        )));
      }
    }
  }, [queryString]);

  return [filteredResults];
};

export default useGetAllOfType;
