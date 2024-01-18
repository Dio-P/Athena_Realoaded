import { useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const FILTER_ENTITY_BY_QUERYSTRING_QUERY = gql`
  query ($queryString: String!) {
    filterEntityByQueryString(queryString: $queryString) {
      id
      name
      type
      mainLinks
      briefDescription
      teamsResponsible
      properties {
        docs
        tags
        technologies
      }
      children
      connections {
        audienceFacing
        receivesDataFrom
        givesDataTo
      }
      interactions {
        isLinkUpToDate
        comments {
          timeStamp
          userId
          text
        }
        requestedActions {
          timeStamp
          typeOfAction
          description
          requestingUserId
        }
      }
    }
  }`;

export const GET_ALL_OF_TYPE = gql`
  query($ofType: String!) {
    getAll(ofType: $ofType)
  }`;

const useGetAllOfType = (ofType, queryString) => {
  const [query,
    {
      loading, error, data, refetch,
    }] = useLazyQuery(
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

  const queryFilteredGeneralOptions = () => {
    if (!data) {
      return query({
        variables: { queryString },
      });
    } if (data) {
      return refetch(
        { queryString },
      );
    }
    return undefined;
  };

  const filterAdvanceOptions = () => {
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

  const getRightOptions = () => {
    if (ofType) {
      if (!queryString) {
        return [];
      }
      switch (ofType) {
        case 'entity': return queryFilteredGeneralOptions();
        default:
      }
    }
    return undefined;
  };

  const filteredResults = useMemo(() => filterAdvanceOptions(), [queryString]);

  return [filteredResults, getRightOptions];
};

export default useGetAllOfType;
// I am not really sure if this is working
// had made changes and then fixed without testing.
