import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const SEARCH_ENTITY_BY_ID_QUERY = gql`
  query ($id: ID!) {
    getEntityById(id: $id) {
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

const useEntityByIdSearch = () => {
  const [returnedEntity, setReturnedEntity] = useState(undefined);

  const [query, { error, data, refetch }] = useLazyQuery(
    SEARCH_ENTITY_BY_ID_QUERY,
  );

  const searchEntity = (id) => {
    console.log('inside search entity ');
    if (!returnedEntity) {
      console.log('to query');
      query({
        variables: { id },
      });
    } if (returnedEntity) {
      console.log('to refetch');
      console.log('id', id);
      refetch({ id });
    }
  };

  useEffect(() => {
    // if (loading) {

    // }
    if (error) {
      console.error('error', error);
    }
    if (data?.getEntityById) {
      setReturnedEntity(data.getEntityById);
    }
  }, [data, error]);

  return [returnedEntity, searchEntity];
};

export default useEntityByIdSearch;
