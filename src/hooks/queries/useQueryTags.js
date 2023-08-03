import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const QUERY_TAGS_BY_QUERYSTRING = gql`
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

const useQueryTags = () => {
  const [returnedTags, setReturnedTags] = useState("");

  const [query, { loading, error, data, refetch }] = useLazyQuery(
    QUERY_TAGS_BY_QUERYSTRING
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

  const queryTags = (queryString) => {
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

  return { returnedTags, queryTags }
}

export default useQueryTags