import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const QUERY_ADVANCED_CUSTOME_SEARCH = gql`
# if working change it to an array of strings
  query ($tags: [String], $name: [String], $type: [String], $leader: [String], $teamsResponsible: [String], $mainLink: [String]) {
    customEntitySearch(tags: $tags, name: $name, type: $type, leader: $leader, teamsResponsible: $teamsResponsible, mainLink: $mainLink) {
      id
      name
      type
      mainLink
      briefDescription
      teamsResponsible
      properties {
        tags
      }
    }
  }
`;

const useCustomSearchQuery = () => {
  // this needs to get the object with the choosenValues
  const [returnedEntities, setReturnedEntities] = useState("");

  const [query, { loading, error, data, refetch }] = useLazyQuery(
    QUERY_ADVANCED_CUSTOME_SEARCH
  );

  const trigerAdvancedSearch = ({tags, name ,type ,leader, teamsResponsible, mainLink}) => {
    console.log("inside trigerAdvancedSearch ");
    console.log("returnedEntities@", returnedEntities);
    console.log("all args", tags, name ,type ,leader, teamsResponsible, mainLink);
    if(returnedEntities.length === 0) {
      console.log("to query");
      query({
        variables: { tags, name ,type ,leader, teamsResponsible, mainLink },
      });
    } else {
      console.log("to refetch");
      refetch({ tags, name ,type ,leader, teamsResponsible, mainLink })
    }
  };

  useEffect(() => {
    // if (loading) {

    // }
    if (error) {
      console.error("error", error)
    }
    if (data?.customEntitySearch) {
      setReturnedEntities(data.customEntitySearch);
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

  return {returnedEntities, trigerAdvancedSearch};
};

export default useCustomSearchQuery;
