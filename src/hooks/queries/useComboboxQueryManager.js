import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const FILTER_ENTITY_BY_QUERYSTRING_QUERY = gql`
  query ($queryString: String!) {
    filterEntityByQueryString(queryString: $queryString) {
      id
      name
      # type
      # mainLinks
      # briefDescription
      # teamsResponsible
      # properties {
      #   docs
      #   tags
      #   technologies
      # }
      # children
      # connections {
      #   audienceFacing
      #   receivesDataFrom
      #   givesDataTo
      # }
      # interactions {
      #   isLinkUpToDate
      #   comments {
      #     timeStamp
      #     userId
      #     text
      #   }
      #   requestedActions {
      #     timeStamp
      #     typeOfAction
      #     description
      #     requestingUserId
      #   }
      # }
    }
  }`;

export const GET_ALL_OF_TYPE = gql`
  query($ofType: String!) {
    getAll(ofType: $ofType)
  }`;

const useComboboxQueryManager = (ofType, queryString) => {
  const [options, setOptions] = useState();
  const [
    advanceQuery,
    { loading: advanceLoading, error: advanceError, data: advanceData }] = useLazyQuery(
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
    if (advanceError || generalError) {
      console.error(advanceError || generalError);
    } if (advanceLoading || generalLoading) {
      console.log('loading');
    }
  }, [advanceError, generalError, advanceLoading, generalLoading]);

  const queryFilteredGeneralOptions = async () => {
    if (!generalData?.filterEntityByQueryString) {
      const results = generalQuery({
        variables: { queryString },
      }).then((generalOptionsResults) => generalOptionsResults.data.filterEntityByQueryString);

      return results;
    } if (generalData?.filterEntityByQueryString) {
      const results = generalRefetch(
        { queryString },
      ).then(
        (generalOptionsResults) => generalOptionsResults.data.filterEntityByQueryString,
      );

      return results;
    }
    return [];
  };

  const filterAdvanceOptions = () => {
    if (advanceData?.getAll) {
      return advanceData.getAll.filter((type) => (
        type.toLowerCase().includes(queryString)
      ));
    }
    return undefined;
  };

  const getRightOptions = async () => {
    if (ofType) {
      if (!queryString) {
        return [];
      }
      switch (ofType) {
        case 'entity': return queryFilteredGeneralOptions();
        default: return filterAdvanceOptions();
      }
    }
    return undefined;
  };

  useEffect(() => {
    (async () => {
      setOptions(await getRightOptions());
    })();
  }, [queryString]);

  return [options];
};

export default useComboboxQueryManager;
// change to useQueryManager
