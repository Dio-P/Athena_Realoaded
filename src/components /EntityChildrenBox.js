import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import MultiBtnComp from './MultiBtnComp';
import PopUp from './PopUp';
import AddChildForm from './popUpComponents/Forms/AddChildForm';
import { addIcon } from '../helpers/svgIcons';
import useUpdateEntityById from '../hooks/queries/useUpdateEntityById';

const EntityChildrenBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const EntityChildrenBoxContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
`;

const EntityChildrenBox = ({
  returnedChildren,
  renderChosenEntity,
  paramsCustomObj,
  thisEntity,
}) => {
  const [triggerUpdateEntityById] = useUpdateEntityById();
  const [isAddChildrenFormOpen, setIsAddChildrenFormOpen] = useState(false);
  const [parent, setParent] = useState(thisEntity);
  const [newChild, setNewChild] = useState(undefined); // this should be an array

  const updateParentWithNewChild = () => {
    console.log(`this ${parent} should be updated when I connect this function to update parent by id`);
    console.log(`this ${newChild} should now display in the parent when I connect this function`);
  };

  const saveNewChild = () => {
    console.log('save new entity has been clicked ');
    updateParentWithNewChild();
    triggerUpdateEntityById(parent);
  };

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
      <PopUp
        ComponentToDisplay={AddChildForm}
        isPopUpOpen={isAddChildrenFormOpen}
        setIsPopUpOpen={setIsAddChildrenFormOpen}
        onClickFunctions={{
          setParent: () => setParent,
          setNewChild: () => setNewChild,
          saveNewChild: () => saveNewChild,
        }}
      />
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
  thisEntity: PropTypes.objectOf({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

EntityChildrenBox.defaultProps = {
  returnedChildren: {},
  renderChosenEntity: () => {},
  paramsCustomObj: {},
};

export default EntityChildrenBox;
