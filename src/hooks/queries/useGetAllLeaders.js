import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const GET_ALL_LEADERS = gql`
  query {
    getAllLeaders
  }`

const useGetAllLeaders = () => {
  const [allLeaders, setAllLeaders] = useState("");
  const [filteredLeaders, setFilteredLeaders] = useState("");

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_LEADERS
  );


  useEffect(() => {
    console.log('query for all Leaders');
    query()
  }, []);

  useEffect(() => {
    if(data) {
      console.log('I have data');
      setAllLeaders(data.getAllLeaders);
    } if(error) {
      console.error(error)
    } if(loading) {
      console.log("loading");
    }
  }, [data, error, loading]);

  const filterLeaders = (queryString) => {
    if(queryString){
      setFilteredLeaders(allLeaders.filter((leader) => (
        leader.includes(queryString)
      )))
    } else {
      setFilteredLeaders("");
    }
  }

  return { filteredLeaders, filterLeaders } 
}

export default useGetAllLeaders