import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const FILTER_ENTITY_BY_QUERYSTRING_QUERY = gql`
  query ($queryString: String!) {
    filterEntityByQueryString(queryString: $queryString) {
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
  }`

const useFilterEntityByQueryString = () => {
  const [returnedEntities, setReturnedEntities] = useState("");

  const [query, { loading, error, data, refetch }] = useLazyQuery(
    FILTER_ENTITY_BY_QUERYSTRING_QUERY
  );

  useEffect(() => {
    if(data) {
      console.log("data", data);
      setReturnedEntities(data.filterEntityByQueryString);
    } if(error) {
      console.log("error:",  error);
      console.error(error)
    } if(loading) {
      console.log("loading");
    }
  }, [data, error, loading]);

  const filterEntities = (queryString) => {
    console.log("queryString is:", queryString, "of type:", typeof queryString);
    if(!returnedEntities){
      console.log("to query");
      query({
        variables: { queryString },
      })

    } if (queryString==="") {
      setReturnedEntities("");

    }else {
      refetch(
        {queryString}
      )
    }
  }

  return { returnedEntities, filterEntities }
}

export default useFilterEntityByQueryString;