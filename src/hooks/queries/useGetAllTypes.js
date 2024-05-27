import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_ALL_TYPES = gql`
  query {
    getAllTypes {
      id,
      title,
      description 
    }
  }`;

const useGetAllTypes = () => {
  const [allTypes, setAllTypes] = useState('');

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_TYPES,
  );

  useEffect(() => {
    query();
  }, []);

  useEffect(() => {
    if (data?.getAllTypes) {
      setAllTypes(data?.getAllTypes);
    }
    if (error) {
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [data, error, loading]);

  const filterTypes = (queryString) => {
    const allTypesArray = data?.getAllTypes;
    if (allTypesArray?.length > 0) {
      if (queryString) {
        setAllTypes(allTypesArray.filter((type) => (
          type.title.includes(queryString)
          || type.description.includes(queryString)
        )));
      } else {
        setAllTypes(allTypesArray);
        // I want if now query string to display
      }
    } else {
      console.error('no values of the type were found');
    }
  };

  return [allTypes, filterTypes];
};

export default useGetAllTypes;
