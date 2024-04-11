import { useEffect } from 'react';
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

const useFilterEntityByQueryString = async (ofType, queryString) => {
  // const [returnedEntities, setReturnedEntities] = useState('');

  const [query, {
    loading, error, data, refetch,
  }] = useLazyQuery(
    FILTER_ENTITY_BY_QUERYSTRING_QUERY,
  );

  useEffect(() => {
    // if (data) {
    //   console.log('data', data);
    //   setReturnedEntities(data.filterEntityByQueryString);
    // }
    if (error) {
      console.log('error:', error);
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [error, loading]);

  const getFilteredOptions = () => {
    console.log('getFilteredOptions out');
    if (ofType === 'entity') {
      console.log('getFilteredOptions in');

      if (!data) {
        return query({
          variables: { queryString },
        });
      } if (data) {
        return refetch(
          { queryString },
        );
      }
      return '';
    }
    return [];
  };

  const filterEntities = () => {
    console.log('ofType', ofType);
    if (ofType === 'entity') {
      const isQuery = !(queryString === '');
      const options = isQuery ? getFilteredOptions(queryString) : '';

      return options;
    }
    console.log('filterEntities to be undefined');
    return undefined;
  };

  return { returnedEntities: await filterEntities() };
};

export default useFilterEntityByQueryString;
