import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import MultiBtnComp from './MultiBtnComp';
import PopUp from './PopUp';
import { addIcon } from '../helpers/svgIcons';

const EntityChildrenBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const EntityChildrenBoxContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
`;

const EntityChildrenBox = ({ returnedChildren, renderChosenEntity, paramsCustomObj }) => {
  const [isAddChildrenFormOpen, setIsAddChildrenFormOpen] = useState(false);
  return (
    <>
      <EntityChildrenBoxWrapper>
        <MultiBtnComp
          label="Add Child"
          type="add"
          icon={addIcon}
          onClickFunction={() => setIsAddChildrenFormOpen(!isAddChildrenFormOpen)}
        />
        <EntityChildrenBoxContainer>
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
      </EntityChildrenBoxWrapper>
      <PopUp />
    </>

  );
};
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
