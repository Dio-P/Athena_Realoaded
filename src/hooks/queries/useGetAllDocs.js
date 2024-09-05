import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_ALL_UNITS_OF_TYPE_DOCUMENT = gql`
  query {
    getAllDocs {
      id
      name
      type {
        id
        title
        description
      }
      mainLinks
      briefDescription
      teamsResponsible
      properties {
        docs
        tags {
          id
          title
          description
        }
        technologies {
          id
          title
          description
        }
      }
      children
    }
  }`;

const useGetAllDocs = () => {
  const [docsToRender, setDocsToRender] = useState('');

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_UNITS_OF_TYPE_DOCUMENT,
  );

  useEffect(() => {
    query();
  }, []);

  useEffect(() => {
    if (data?.getAllDocs) {
      setDocsToRender(data?.getAllDocs);
      console.log('data?.getAllDocs', data?.getAllDocs);
    }
    if (error) {
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [data, error, loading]);

  const filterDocs = (queryString) => {
    const allDocsArray = data?.getAllDocs;
    if (allDocsArray?.length > 0) {
      if (queryString) {
        setDocsToRender(allDocsArray.filter((doc) => (
          doc.title.includes(queryString)
          || doc.description.includes(queryString)
        )));
      } else {
        setDocsToRender(allDocsArray);
        // I want if now query string to display
      }
    } else {
      console.error('no values of the doc were found');
    }
  };

  return [docsToRender, filterDocs];
};

export default useGetAllDocs;
