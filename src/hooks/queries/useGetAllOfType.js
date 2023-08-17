import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const GET_ALL_OF_TYPE = gql`
  query($ofType: String!) {
    getAll(ofType: $ofType)
  }`

const useGetAllOfType = () => {
  const [ofType, setOfType] = useState("");
  const [queryString, setQueryString] = useState("");
  const [allOfType, setAllOfType] = useState("");
  const [filteredResults, setFilteredResults] = useState("");

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_OF_TYPE
  );


  useEffect(() => {
    query({
      variables: { ofType },
    })
  }, [ofType]);

  useEffect(() => {
    if(data) {
      console.log("data£$", data);
      console.log("allOfType$", {...allOfType, [ofType]: data.getAll});
      setAllOfType({...allOfType, [ofType]: data.getAll});
    } if(error) {
      console.error(error)
    } if(loading) {
      console.log("loading");
    }
  }, [data, error, loading]);

  const filterOptions = (queryString) => {
    console.log('inside filterOptions queryString', queryString);
    console.log('inside filterOptions, allOfType:', allOfType);
    if(allOfType){
      console.log("allOfType@@@", allOfType);
     
      setFilteredResults(allOfType[ofType].filter((type) => (
        type.includes(queryString)
      )))
      
    }
  }

  const handleQuery = (queryString, ofType) => {
    console.log("inside handleQuery");
    if (!ofType) {
      console.error('please choose a type')
      return
    } else {
      setOfType(ofType);
    }
    
    if (!queryString) {
      setFilteredResults("");

    } else {
      filterOptions(queryString);

    }
    
  }

  return { results: { [ofType] : filteredResults }, handleQuery } 
}

export default useGetAllOfType
