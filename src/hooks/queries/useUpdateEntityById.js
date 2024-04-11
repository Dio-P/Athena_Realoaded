import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useEntityByIdSearch from './useEntityByIdSearch';

export const UPDATE_ENTITY_BY_ID_QUERY = gql`
  query ($id: ID!, $entity: EntityInput!) {
    updateEntityById(id: $id, entity: $entity) {
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

const useUpdateEntityById = () => {
  const [entity, searchEntity] = useEntityByIdSearch();

  useEffect(() => {
    console.log('entity', entity);
  }, [entity]);

  const [updateDbEntity, { error }] = useLazyQuery(
    UPDATE_ENTITY_BY_ID_QUERY,
  );

  useEffect(() => {
    if (error) {
      console.log('error');
    }
  }, [error]);

  const updateEntity = (entityToBeUpdated, newChildren) => ({
    ...entityToBeUpdated,
    children: {
      ...entityToBeUpdated.children,
      ...newChildren,
    },
  });
  const triggerUpdateEntityById = async (id, newChildren) => {
    console.log('id, changesToBeApplied', id, newChildren);
    const entityToBeUpdated = await searchEntity(id);
    console.log('entityToBeUpdated', entityToBeUpdated);
    console.log('newChildren', newChildren);
    const updatedEntity = updateEntity(entityToBeUpdated, newChildren);
    updateDbEntity(id, updatedEntity);
  };

  return [triggerUpdateEntityById];
};

export default useUpdateEntityById;
