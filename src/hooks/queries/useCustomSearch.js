import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const SEARCH_ENTITY_BY_ID_QUERY = gql`
  query ($id: ID!) {
    getEntityById(id: $id) {
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

const useCustomSearch = () => {
  const [returnedEntity, setReturnedEntity] = useState("");

  const [query, { loading, error, data, refetch }] = useLazyQuery(
    SEARCH_ENTITY_BY_ID_QUERY
  );

  const searchEntity = (id) => {
    console.log("inside search entity ");
    if(!returnedEntity) {
      console.log("to query");
      query({
        variables: { id },
      });
    } if (returnedEntity) {
      console.log("to refetch");
      console.log("id", id);
      refetch({ id })
    }
  };

  useEffect(() => {
    // if (loading) {

    // }
    if (error) {
      console.error("error", error)
    }
    if (data?.getEntityById) {
      setReturnedEntity(data.getEntityById);
    }
  }, [data, error]);

  // useEffect(() => {
  //   if (data && data.getAppById) {
  //     // const newApp = {
  //     //   ...data.getAppById,
  //     //   parts: data.getAppById.parts.map((part) => ({
  //     //     ...part,
  //     //     folderToBeDisplayedIn: Number(part.folderToBeDisplayedIn)
  //     //     }))
  //     const newApp = data.getAppById;
  //     console.log("newApp$$$$", newApp);
  //     // check if you are indeed getting strings here
  //     setAppToDisplay({ ...newApp });
  //   }
  // }, [data]);

  return [returnedEntity, searchEntity];
};

export default useCustomSearch;
