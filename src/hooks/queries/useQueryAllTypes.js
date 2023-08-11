import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const QUERY_ALL_TYPES = gql`
  query {
    getAllTypes
  }`

const useQueryAllTypes = (queryString) => {
  const [allTypes, setAllTypes] = useState("");
  const [filteredTypes, setFilteredTypes] = useState("");

  const [query, { loading, error, data }] = useLazyQuery(
    QUERY_ALL_TYPES
  );


  useEffect(() => {
    query()
  }, []);

  useEffect(() => {
    if(data) {
      setAllTypes(data.getAllTypes);
    } if(error) {
      console.error(error)
    } if(loading) {
      console.log("loading");
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (queryString) {
      filterTypes()
    }
  }, [queryString]);

  const filterTypes = (queryString) => {
    setFilteredTypes(allTypes.filter((type) => (
      type.includes(queryString)
    )))
  }

  return {filteredTypes, filterTypes } 
}

export default useQueryAllTypes