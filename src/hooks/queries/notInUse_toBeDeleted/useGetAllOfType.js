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
  const [advanceQuery, { loading: advanceLoading, error: advanceError, data: advanceData }] = useLazyQuery(
    GET_ALL_OF_TYPE,
  );

  const [generalQuery, {
    loading: generalLoading, error: generalError, data: generalData, refetch: generalRefetch,
  }] = useLazyQuery(
    FILTER_ENTITY_BY_QUERYSTRING_QUERY,
  );

  useEffect(() => {
    console.log('inside the query useEffect');
    if (ofType && !(ofType === 'entity')) {
      advanceQuery({
        variables: { ofType },
      });
    }
  }, [ofType]);

  useEffect(() => {
    if (advanceError || generalData) {
      console.error(advanceError || generalData);
    } if (advanceLoading || generalLoading) {
      console.log('loading');
    }
  }, [advanceError, generalData, advanceLoading]);

  const queryFilteredGeneralOptions = () => {
    if (!generalData) {
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
        default: return 
      }

    }

  };

  const filteredResults = useMemo(() => filterAdvanceOptions(), [queryString]);

  return [filteredResults];
};

export default useGetAllOfType;
