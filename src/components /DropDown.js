import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  arrayOf,
  bool,
  func,
  shape,
  string,
} from 'prop-types';
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
  shouldDisplayChosenValues,
  ofType,
  options,
  onChange,
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
          ofType={ofType}
          onClickOption={onClickAndClose}
          chosenValues={chosenValue}
          shouldDisplayChosenValues={shouldDisplayChosenValues}
          options={options}
          onChange={onChange}
        />
        )}
    </DropDownContainer>
  );
};

DropDown.propTypes = {
  chosenValue: string,
  freshlyAddedValue: string,
  onClickOption: func,
  title: shape({
    withValue: string,
    withoutValue: string,
  }),
  shouldDisplayChosenValues: bool,
  ofType: string.isRequired,
  options: arrayOf(string),
  onChange: func.isRequired,
};

DropDown.defaultProps = {
  chosenValue: '',
  freshlyAddedValue: undefined,
  onClickOption: () => {},
  title: {
    withValue: '',
    withoutValue: '',
  },
  shouldDisplayChosenValues: false,
  options: [],
};

export default DropDown;
