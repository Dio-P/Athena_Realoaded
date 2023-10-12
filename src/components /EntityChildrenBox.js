import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import MultiBtnComp from './MultiBtnComp';
import { addIcon } from '../helpers/svgIcons';

const EntityChildrenBoxContainer = styled.div`
  display: flex;
`;

const EntityChildrenBox = ({ returnedChildren, renderChosenEntity, paramsCustomObj }) => (

  <EntityChildrenBoxContainer>
    <MultiBtnComp
      label="Add Child"
      type="add"
      icon={addIcon}
    />
    {returnedChildren.map((childEntity) => (
      <MultiBtnComp
        aria={childEntity.name}
        label={childEntity.name}
        key={childEntity.name}
        onClickFunction={
              () => renderChosenEntity(childEntity.name, childEntity.id, paramsCustomObj)
            }
      />
    ))}
  </EntityChildrenBoxContainer>

);

EntityChildrenBox.propTypes = {
  returnedChildren: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    mainLinks: PropTypes.arrayOf(PropTypes.string),
    briefDescription: PropTypes.string,
    teamsResponsible: PropTypes.arrayOf(PropTypes.string),
    properties: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  })),
  renderChosenEntity: PropTypes.func,
  paramsCustomObj: PropTypes.shape({
    cPub: PropTypes.shape({
      id: PropTypes.string,
      index: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

EntityChildrenBox.defaultProps = {
  returnedChildren: {},
  renderChosenEntity: () => {},
  paramsCustomObj: {},
};

export default EntityChildrenBox;
