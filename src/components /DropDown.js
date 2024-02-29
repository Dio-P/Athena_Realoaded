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
  acceptsMultipleValues,
  onDeletingChoice,
  ofType,
  options,
  onChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOnClickOption = (optionId) => {
    if (!acceptsMultipleValues) {
      onClickOption(optionId);
      setIsDropdownOpen(false);
    } else {
      onClickOption(optionId);
    }
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
          onClickOption={handleOnClickOption}
          chosenValues={chosenValue}
          acceptsMultipleValues={acceptsMultipleValues}
          onDeletingChoice={onDeletingChoice}
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
  acceptsMultipleValues: bool,
  ofType: string.isRequired,
  options: arrayOf(string),
  onChange: func.isRequired,
  onDeletingChoice: func,
};

DropDown.defaultProps = {
  chosenValue: '',
  freshlyAddedValue: undefined,
  onClickOption: () => {},
  title: {
    withValue: '',
    withoutValue: '',
  },
  acceptsMultipleValues: false,
  options: [],
  onDeletingChoice: () => {},
};

export default DropDown;
