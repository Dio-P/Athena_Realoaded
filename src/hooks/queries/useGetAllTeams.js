import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_ALL_UNITS_OF_TYPE_TEAM = gql`
  query {
    getAllTeams {
      id
      name
      type {
        id
        title
        description
      }
      mainLinks
      briefDescription
      teamsResponsible
      properties {
        docs
        tags {
          id
          title
          description
        }
        technologies {
          id
          title
          description
        }
      }
      children
    }
  }`;

const useGetAllTeams = () => {
  const [teamsToRender, setTeamsToRender] = useState('');

  const [query, { loading, error, data }] = useLazyQuery(
    GET_ALL_UNITS_OF_TYPE_TEAM,
  );

  useEffect(() => {
    query();
  }, []);

  useEffect(() => {
    if (data?.getAllTeams) {
      setTeamsToRender(data?.getAllTeams);
      console.log('data?.getAllTeams', data?.getAllTeams);
    }
    if (error) {
      console.error(error);
    } if (loading) {
      console.log('loading');
    }
  }, [data, error, loading]);

  const filterTeams = (queryString) => {
    const allTeamsArray = data?.getAllTeams;
    if (allTeamsArray?.length > 0) {
      if (queryString) {
        setTeamsToRender(allTeamsArray.filter((team) => (
          team.title.includes(queryString)
          || team.description.includes(queryString)
        )));
      } else {
        setTeamsToRender(allTeamsArray);
        // I want if now query string to display
      }
    } else {
      console.error('no values of the team were found');
    }
  };

  return [teamsToRender, filterTeams];
};

export default useGetAllTeams;
