import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

export const ADD_NEW_ENTITIES = gql`
  mutation ($newEntities: [EntityInput]!) {
    addNewEntities(newEntities: $newEntities) 
    # {
    #   id
    #   name
    #   type {
    #     id
    #     title
    #     description
    #   }
    #   mainLinks
    #   briefDescription
    #   teamsResponsible
    #   properties {
    #     docs
    #     tags {
    #       id
    #       title
    #       description
    #     }
    #     technologies {
    #       id
    #       title
    #       description
    #     }
    #   }
    #   children
    #   connections {
    #     audienceFacing
    #     receivesDataFrom
    #     givesDataTo
    #   }
    #   interactions {
    #     isLinkUpToDate
    #     comments {
    #       timeStamp
    #       userId
    #       text
    #     }
    #     requestedActions {
    #       timeStamp
    #       typeOfAction
    #       description
    #       requestingUserId
    #     }
    #   }
    # }
  }
`;

const useAddNewEntities = () => {
  const [query, {
    error, data,
  }] = useMutation(
    ADD_NEW_ENTITIES,
  );

  const addEntities = (newEntities) => {
    console.log('about to call the db addEntities query');
    if (newEntities) {
      console.log('there are new entities and next line calls');
      const freshlyCreatedIds = query({
        variables: { newEntities },
      }).then(
        (additionOfEntitiesResults) => additionOfEntitiesResults.data.addNewEntities,
      );
      return freshlyCreatedIds;
    }
    return undefined;
  };

  useEffect(() => {
    // if (loading) {

    // }
    if (error) {
      console.error('error', error);
    }
    // if (data?.addNewEntities) {
    //   console.log('error£$', error);
    //   setReturnedChildren(data.addNewEntities);
    // }
  }, [data, error]);

  // return [returnedChildren, addEntities];
  // do the filtering in the function body
  return [addEntities];
};

export default useAddNewEntities;
