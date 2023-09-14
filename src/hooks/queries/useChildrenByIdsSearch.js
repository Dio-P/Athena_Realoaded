import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const SEARCH_CHILDREN_BY_ID_QUERY = gql`
  query ($ids: [ID]!) {
    getChildrenById(ids: $ids) {
      id
      name
      type
      mainLink
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
  }
`;

const useChildrenByIdsSearch = () => {
  const [returnedChildren, setReturnedChildren] = useState('');

  const [query, {
    loading, error, data, refetch,
  }] = useLazyQuery(
    SEARCH_CHILDREN_BY_ID_QUERY,
  );

  const searchChildren = (ids) => {
    if (ids) {
      if (!data) {
        query({
          variables: { ids },
        });
      }
      if (data) {
        refetch({ ids });
      }
    }
  };

  useEffect(() => {
    // if (loading) {

    // }
    if (error) {
      console.error('error', error);
    }
    if (data?.getChildrenById) {
      setReturnedChildren(data.getChildrenById);
    }
  }, [data, error]);

  return [returnedChildren, searchChildren];
};

export default useChildrenByIdsSearch;
