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
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropDownContainer>
      <MultiBtnComp
        onClickFunction={() => setIsDropdownOpen(!isDropdownOpen)}
        type="dropDown"
        isMenuOpen={isDropdownOpen}
        freshlyAddedValue={freshlyAddedValue}
        chosenValue={chosenValue}
      />
      {isDropdownOpen
        && (
        <SearchComboBox
          ofType="entity"
          onClickOption={onClickOption}
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
};

DropDown.defaultProps = {
  chosenValue: '',
  freshlyAddedValue: undefined,
  onClickOption: () => {},
};

export default DropDown;
