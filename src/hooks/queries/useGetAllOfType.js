import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const GET_ALL_OF_TYPE = gql`
  query($ofType: String!) {
    getAll(ofType: $ofType)
  }`

const useGetAllOfType = (ofType, queryString) => {
  // const [ofType, setOfType] = useState("");
  // const [queryString, setQueryString] = useState("");
  const [allOfType, setAllOfType] = useState("");
  const [filteredResults, setFilteredResults] = useState("");

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_OF_TYPE
  );


  useEffect(() => {
    if (ofType) {
      query({
        variables: { ofType },
      })
    }
  }, [ofType]);

  // this is slow on digit because it does not have all of type yet
  useEffect(() => {
    if(data) {
      console.log("data£$", data);
      setAllOfType(data.getAll);
    } if(error) {
      console.error(error)
    } if(loading) {
      console.log("loading");
    }
  }, [data, error, loading]);

  useEffect(() => {
    if(allOfType) {
      console.log('inside all of type');
      if (!queryString) {
        console.log('no query string ');
        setFilteredResults("");
      } else {
        setFilteredResults(allOfType.filter((type) => (
          type.includes(queryString)
        )))
      }
    }
  }, [queryString]);

  // const filterOptions = (queryString) => {
  //   console.log('inside filterOptions queryString', queryString);
  //   console.log('inside filterOptions, allOfType:', allOfType);
  //   if(allOfType){
  //     console.log("allOfType@@@", allOfType);
     
  //     setFilteredResults({...filteredResults, [ofType]: allOfType[ofType].filter((type) => (
  //       type.includes(queryString)
  //     ))}
  //     )
      
  //   }
  // }

  // const handleQuery = (queryString, ofType) => {
  //   console.log("inside handleQuery",queryString, ofType );
  //   if (ofType) {
  //     setOfType(ofType);
  //   }
  //   if (queryString) {
  //     filterOptions(queryString);

  //   } else {
  //     setFilteredResults("");


  //   }
    
  // }

  console.log("filteredResults $£$£$£$", filteredResults);
  return { filteredResults } 
}

export default useGetAllOfType
