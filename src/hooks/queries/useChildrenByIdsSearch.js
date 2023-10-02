import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const SEARCH_CHILDREN_BY_ID_QUERY = gql`
  query ($ids: [ID]!) {
    getChildrenById(ids: $ids) {
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
  }
`;

const useChildrenByIdsSearch = () => {
  const [returnedChildren, setReturnedChildren] = useState('');

  const [query, {
    error, data, refetch,
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
    // if (data?.getChildrenById) {
    //   console.log('error£$', error);
    //   setReturnedChildren(data.getChildrenById);
    // }
  }, [data, error]);

  // return [returnedChildren, searchChildren];
  // do the filtering in the function body
  return [data?.getChildrenById, searchChildren];
};

export default useChildrenByIdsSearch;
