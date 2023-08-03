import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const QUERY_NAMES_BY_QUERYSTRING = gql`
  query ($queryString: String!) {
    filterNamesBySearchString(queryString: $queryString) {
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

const useQueryNames = () => {
  const [returnedNames, setReturnedNames] = useState("");

  const [query, { loading, error, data, refetch }] = useLazyQuery(
    QUERY_NAMES_BY_QUERYSTRING
  );


  useEffect(() => {
    if(data) {
      setReturnedNames(data.filterNamesBySearchString);
    } if(error) {
      console.error(error)
    } if(loading) {
      console.log("loading");
    }
  }, [data, error, loading]);

  const queryNames = (queryString) => {
    if(!returnedNames){
      console.log("to query");
      query({
        variables: { queryString },
      })

    } if (queryString==="") {
      setReturnedNames("");

    }else {
      refetch({queryString})
    }
  }

  return { returnedNames, queryNames }
}

export default useQueryNames