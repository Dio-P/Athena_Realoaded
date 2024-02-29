import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_ALL_TECHNOLOGIES = gql`
  query {
    getAllTechnologies {
      id,
      title,
      description 
    }
  }`;

const useGetAllTechnologies = () => {
  const [technologiesToRender, setTechnologiesToRender] = useState('');

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_TECHNOLOGIES,
  );

  useEffect(() => {
    console.log('query for all technologies');
    query();
  }, []);

  useEffect(() => {
    console.log('technologiesToRender', technologiesToRender);
  }, [technologiesToRender]);

  useEffect(() => {
    if (data?.getAllTechnologies) {
      console.log('data?.getAllTechnologies', data?.getAllTechnologies);
      setTechnologiesToRender(data?.getAllTechnologies);
    }
    if (error) {
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [data, error, loading]);

  const filterTechnologies = (queryString) => {
    const allTypesArray = data?.getAllTechnologies;
    console.log('in filterTechnologies', allTypesArray);
    if (allTypesArray?.length > 0) {
      if (queryString) {
        setTechnologiesToRender(allTypesArray.filter((type) => (
          type.title.includes(queryString)
          || type.description.includes(queryString)
        )));
      } else {
        console.log('no querry block', allTypesArray);
        setTechnologiesToRender(allTypesArray);
        // I want if now query string to display
      }
    } else {
      console.error('no values of the type were found');
    }
  };

  return [technologiesToRender, filterTechnologies];
};

export default useGetAllTechnologies;
