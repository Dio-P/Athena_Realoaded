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

const useFilterEntityByQueryString = (queryString, ofType) => {
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
    if (ofType === 'entity') {
      if (!data) {
        return query({
          variables: { queryString },
        });
      } if (data) {
        return refetch(
          { queryString },
        );
      }
    }
    return [];
  };

  const filterEntities = () => {
    const isQuery = !(queryString === '');
    const options = isQuery ? getFilteredOptions(queryString) : '';

    return options;
  };

  return { returnedEntities: filterEntities() };
};

export default useFilterEntityByQueryString;
