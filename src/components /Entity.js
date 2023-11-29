import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useChildrenByIdsSearch from '../hooks/queries/useChildrenByIdsSearch';
import capitaliseFirstLetters from '../helpers/capitaliseFirstLetters';
import EntityChildrenBox from './EntityChildrenBox';

const EntityContainer = styled.div`
  display: flex;
  font-size: 23px;
`;

const ThisEntityContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-direction: column;
  margin: 5px 15px 5px 15px;
  width: 100%
`;

const EntityInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 5px 10px 5px;
  padding: 10px;
`;

const Entity = ({
  entity,
  // setDisplayedEntity,
  paramsCustomObj,
  renderChosenEntity,
  // theme,
}) => {
  const {
    name,
    id,
    children,
    briefDescription,
  } = entity;
  const [returnedChildren, searchChildren] = useChildrenByIdsSearch();

  useEffect(() => {
    if (children) {
      searchChildren(children);
    }
  }, [entity]);

  return (
    entity
      && (
        <EntityContainer
          aria-label={`${name}`}
        >
          <ThisEntityContainer>
            <h1>{capitaliseFirstLetters(name)}</h1>
            <EntityInfoBox>
              <h3>
                Description:
              </h3>
              {/* {editDescription? */}
              {/* <input value={entity.briefDescription}/> */}
              {/* : */}
              <div>
                {briefDescription}
              </div>
              {/* } */}
            </EntityInfoBox>
          </ThisEntityContainer>
          {returnedChildren
          && (
          <EntityChildrenBox
            returnedChildren={returnedChildren}
            renderChosenEntity={renderChosenEntity}
            paramsCustomObj={paramsCustomObj}
            thisEntity={{ name, id }}
          />
          )}

        </EntityContainer>
      )
  );
};

Entity.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    leader: PropTypes.string,
    mainLinks: PropTypes.arrayOf(PropTypes.string),
    briefDescription: PropTypes.string,
    teamsResponsible: PropTypes.arrayOf(PropTypes.string),
    properties: PropTypes.shape({
      docs: PropTypes.arrayOf(PropTypes.string),
      tags: PropTypes.arrayOf(PropTypes.string),
      technologies: PropTypes.arrayOf(PropTypes.string),
    }),
    children: PropTypes.arrayOf(PropTypes.string),
    connections: PropTypes.shape({
      audienceFacing: PropTypes.bool,
      receivesDataFrom: PropTypes.arrayOf(PropTypes.string),
      givesDataTo: PropTypes.arrayOf(PropTypes.string),
    }),
    interactions: PropTypes.shape({
      isLinkUpToDate: PropTypes.bool,
      comments: PropTypes.arrayOf(PropTypes.shape(
        {
          timeStamp: PropTypes.string,
          userId: PropTypes.string,
          text: PropTypes.string,
        },
      )),
      requestedActions: PropTypes.arrayOf(PropTypes.shape(
        {
          timeStamp: PropTypes.string,
          typeOfAction: PropTypes.string,
          description: PropTypes.string,
          requestingUserId: PropTypes.string,
        },
      )),
    }),
  }),
  // setDisplayedEntity: PropTypes.func.isRequired,
  paramsCustomObj: PropTypes.shape({
    cPub: PropTypes.shape({
      id: PropTypes.string,
      index: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  renderChosenEntity: PropTypes.func.isRequired,
};

Entity.defaultProps = {
  entity: undefined,
  paramsCustomObj: {},
};

export default Entity;
