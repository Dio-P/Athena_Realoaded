import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const FILTER_ENTITY_BY_QUERYSTRING_QUERY = gql`
  query ($queryString: String!) {
    filterTagsBySearchString(queryString: $queryString) {
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
  }`

const useGetAllTags = () => {
  const [returnedTags, setReturnedTags] = useState("");

  const [query, { loading, error, data, refetch }] = useLazyQuery(
    FILTER_ENTITY_BY_QUERYSTRING_QUERY
  );


  useEffect(() => {
    if(data) {
      setReturnedTags(data.filterTagsBySearchString);
    } if(error) {
      console.error(error)
    } if(loading) {
      console.log("loading");
    }
  }, [data, error, loading]);

  const getTags = (queryString) => {
    if(!returnedTags){
      console.log("to query");
      query({
        variables: { queryString },
      })

    } if (queryString==="") {
      setReturnedTags("");

    }else {
      refetch({queryString})
    }
  }

  return { returnedTags, getTags }
}

export default useGetAllTags