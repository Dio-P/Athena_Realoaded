import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_ALL_TAGS = gql`
  query {
    getAllTags {
      id,
      title,
      description 
    }
  }`;

const useGetAllTags = () => {
  const [tagsToRender, setTagsToRender] = useState('');

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_TAGS,
  );

  useEffect(() => {
    console.log('query for all tags');
    query();
  }, []);

  useEffect(() => {
    console.log('tagsToRender', tagsToRender);
  }, [tagsToRender]);

  useEffect(() => {
    if (data?.getAllTags) {
      console.log('data?.getAllTags', data?.getAllTags);
      setTagsToRender(data?.getAllTags);
    }
    if (error) {
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [data, error, loading]);

  const filterTags = (queryString) => {
    const allTypesArray = data?.getAllTags;
    console.log('in filterTags', allTypesArray);
    if (allTypesArray?.length > 0) {
      if (queryString) {
        setTagsToRender(allTypesArray.filter((type) => (
          type.title.includes(queryString)
          || type.description.includes(queryString)
        )));
      } else {
        console.log('no querry block', allTypesArray);
        setTagsToRender(allTypesArray);
        // I want if now query string to display
      }
    } else {
      console.error('no values of the type were found');
    }
  };

  return [tagsToRender, filterTags];
};

export default useGetAllTags;
