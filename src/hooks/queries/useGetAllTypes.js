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
  const [typesToRender, setTypesToRender] = useState('');

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_TYPES,
  );

  useEffect(() => {
    console.log('query for all links');
    query();
  }, []);

  useEffect(() => {
    console.log('typesToRender', typesToRender);
  }, [typesToRender]);

  useEffect(() => {
    if (data?.getAllTypes) {
      console.log('data?.getAllTypes', data?.getAllTypes);
      setTypesToRender(data?.getAllTypes);
    }
    if (error) {
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [data, error, loading]);

  const filterTypes = (queryString) => {
    const allTypesArray = data?.getAllTypes;
    console.log('in filterTypes', allTypesArray);
    if (allTypesArray?.length > 0) {
      if (queryString) {
        setTypesToRender(allTypesArray.filter((type) => (
          type.title.includes(queryString)
          || type.description.includes(queryString)
        )));
      } else {
        console.log('no querry block', allTypesArray);
        setTypesToRender(allTypesArray);
        // I want if now query string to display
      }
    } else {
      console.error('no values of the type were found');
    }
  };

  return [typesToRender, filterTypes];
};

export default useGetAllTypes;
