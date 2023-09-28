import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const QUERY_ADVANCED_CUSTOME_SEARCH = gql`
# if working change it to an array of strings
  query ($tags: [String], $name: [String], $type: [String], $leader: [String], $teamsResponsible: [String], $mainLinks: [String]) {
    customEntitySearch(tags: $tags, name: $name, type: $type, leader: $leader, teamsResponsible: $teamsResponsible, mainLinks: $mainLinks) {
      id
      name
      type
      mainLinks
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
  const [returnedEntities, setReturnedEntities] = useState([]);

  const [query, { error, data, refetch }] = useLazyQuery(
    QUERY_ADVANCED_CUSTOME_SEARCH,
  );

  const trigerAdvancedSearch = ({
    tags, name, type, leader, teamsResponsible, mainLinks,
  }) => {
    if (returnedEntities.length === 0) {
      query({
        variables: {
          tags, name, type, leader, teamsResponsible, mainLinks,
        },
      });
    } else {
      refetch({
        tags, name, type, leader, teamsResponsible, mainLinks,
      });
    }
  };

  useEffect(() => {
    // if (loading) {

    // }
    if (error) {
      console.error('error', error);
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
  //     console.log('newApp$$$$', newApp);
  //     // check if you are indeed getting strings here
  //     setAppToDisplay({ ...newApp });
  //   }
  // }, [data]);

  return { returnedEntities, trigerAdvancedSearch };
};

export default useCustomSearchQuery;
