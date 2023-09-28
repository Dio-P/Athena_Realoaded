import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_ALL_BRIEF_DESCRIPTIONS = gql`
  query {
    getAllBriefDescriptions
  }`;

const useGetAllBriefDescriptions = () => {
  const [allBriefDescriptions, setAllBriefDescriptions] = useState('');
  const [filteredBriefDescriptions, setFilteredBriefDescriptions] = useState('');

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_BRIEF_DESCRIPTIONS,
  );

  useEffect(() => {
    console.log('query for all BriefDescriptions');
    query();
  }, []);

  useEffect(() => {
    if (data) {
      setAllBriefDescriptions(data.getAllBriefDescriptions);
    } if (error) {
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [data, error, loading]);

  const filterBriefDescriptions = (queryString) => {
    console.log('inside filterBriefDescriptions');
    if (queryString) {
      setFilteredBriefDescriptions(allBriefDescriptions.filter((type) => (
        type.includes(queryString)
      )));
    } else {
      setFilteredBriefDescriptions('');
    }
  };

  return { filteredBriefDescriptions, filterBriefDescriptions };
};

export default useGetAllBriefDescriptions;
