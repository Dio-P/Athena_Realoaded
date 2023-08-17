import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const GET_ALL_LINKS = gql`
  query {
    getAllLinks
  }`

const useGetAllLinks = (queryString) => {
  const [allLinks, setAllLinks] = useState("");
  const [filteredLinks, setFilteredLinks] = useState("");

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_LINKS
  );


  useEffect(() => {
    console.log('query for all links');
    query()
  }, []);

  useEffect(() => {
    if(data) {
      setAllLinks(data.getAllLinks);
    } if(error) {
      console.error(error)
    } if(loading) {
      console.log("loading");
    }
  }, [data, error, loading]);

  // useEffect(() => {
  //   if (queryString) {
  //     filterLinks()
  //   }
  // }, [queryString]);

  const filterLinks = (queryString) => {
    console.log('inside filterLinks');
    if(queryString){
      setFilteredLinks(allLinks.filter((type) => (
        type.includes(queryString)
      )))
    } else {
      setFilteredLinks("");
    }
  }

  return { filteredLinks, filterLinks } 
}

export default useGetAllLinks