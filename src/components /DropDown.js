import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import MultiBtnComp from './MultiBtnComp';
import SearchComboBox from './SearchComboBox';

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropDown = ({
  chosenValue,
  freshlyAddedValue,
  onClickOption,
  title,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onClickAndClose = (optionId) => {
    onClickOption(optionId);
    setIsDropdownOpen(false);
  };

  return (
    <DropDownContainer>
      <MultiBtnComp
        onClickFunction={() => setIsDropdownOpen(!isDropdownOpen)}
        type="dropDown"
        isMenuOpen={isDropdownOpen}
        freshlyAddedValue={freshlyAddedValue}
        chosenValue={chosenValue}
        title={title}
      />
      {isDropdownOpen
        && (
        <SearchComboBox
          ofType="entity"
          onClickOption={onClickAndClose}
          chosenValues={chosenValue}
        />
        )}
    </DropDownContainer>
  );
};

DropDown.propTypes = {
  chosenValue: PropTypes.string,
  freshlyAddedValue: PropTypes.string,
  onClickOption: PropTypes.func,
  title: PropTypes.objectOf(PropTypes.string),
};

DropDown.defaultProps = {
  chosenValue: '',
  freshlyAddedValue: undefined,
  onClickOption: () => {},
  title: {
    withValue: '',
    withoutValue: '',
  },
};

export default DropDown;
