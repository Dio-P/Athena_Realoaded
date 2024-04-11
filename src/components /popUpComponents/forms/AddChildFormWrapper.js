import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import DropDown from '../../DropDown';
import SearchComboBox from '../../SearchComboBox';
import NewChildForm from './NewChildForm';
import MultiBtnComp from '../../MultiBtnComp';

const BodyContainer = styled.div`
  display: flex;
  border-color: red solid;
  flex-direction: column;
`;
const ExistingChildOrNotBtnContainer = styled.div`
  display: flex;

`;
const AddChildFormWrapper = ({ onClickFunctions, values }) => {
  const [one] = useState('This is the AddChildFormWrapper');
  const [isExistingChild, setIsExistingChild] = useState(false);
  const [radioValue, setRadioValue] = useState('');

  const radioLabels = ['New Child', 'Existing Child'];

  useEffect(() => {
    if (radioValue === 'Existing Child') {
      setIsExistingChild(true);
    }
    if (radioValue === 'New Child') {
      setIsExistingChild(false);
    }
  }, [radioValue]);

  return (
    <>
      {one}
      {/* parent entity */}
      {/* same component as to add from root with lock function to warn when trying to unlock */}
      <DropDown
        onClickOption={onClickFunctions?.setNewParent}
        chosenValue={values.parent}
        title={values.parent ? `Parent: ${values.parent}` : 'Please choose a parent'}
        ofType="entity"
      />
      <ExistingChildOrNotBtnContainer>
        <MultiBtnComp
          type="radio"
          chosenValue={radioValue}
          onClickFunction={setRadioValue}
          label={radioLabels}
        />
      </ExistingChildOrNotBtnContainer>
      <BodyContainer>
        { isExistingChild
          ? (
            <SearchComboBox
              ofType="entity"
            />
          )
          : (
            <NewChildForm
              onClickFunctions={onClickFunctions}
            />
          )}
      </BodyContainer>
      <button
        type="button"
        onClick={() => onClickFunctions.saveNewChildren()}
      >
        update
      </button>
    </>
  );
};

AddChildFormWrapper.propTypes = {
  onClickFunctions: PropTypes.objectOf(PropTypes.func),
  values: PropTypes.objectOf(PropTypes.string),
};
AddChildFormWrapper.defaultProps = {
  onClickFunctions: {},
  values: {
    parent: '',
  },
};
export default AddChildFormWrapper;
