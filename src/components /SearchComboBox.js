import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import style, { colours } from '../styleVariables';
import { deleteIcon } from '../helpers/svgIcons';
import { SearchInput } from './specialElements';
import capitaliseFirstLetters from '../helpers/capitaliseFirstLetters';
import useComboboxQueryManager from '../hooks/queries/useComboboxQueryManager';

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin-bottom: 3px;
  padding: 10px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  border-radius: ${style.variables.borderRadious.main};
`;

const SingleDropDownElementWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 99%;
  height: 45px;
  background-color: ${(props) => (!props.isAddFolderBtn
    ? colours.tertiaryBlue
    : colours.tertiaryPink)};
  border-radius: ${(props) => (!props.isAddFolderBtn ? null : style.variables.borderRadious.main)};
  color: black;
  margin: 1px;
  margin-top: ${(props) => props.isAddFolderBtn && '4px'};

  &:hover {
    background-color: ${(props) => (!props.isAddFolderBtn
    ? colours.secondaryBlue
    : colours.secondaryPink)};
  }
  cursor: pointer;
`;

const DropDownLabel = styled.div`
  margin: auto;
`;

const ChoicesWrapper = styled.div`
  display: flex;
`;

const ChosenEntityWrapper = styled.div`
  display: flex;
`;

const XBoxWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 25px;
  margin: 1px 2px 1px 2px;
`;

const AddOptionBtnWrapper = styled.div`
display: flex;
align-items: center;
width: 99%;
height: 45px;
background-color: ${(colours.tertiaryPink)};
border-radius: ${(style.variables.borderRadious.main)};
color: black;
margin: 1px;
margin-top: '4px';

&:hover {
  background-color: ${(colours.secondaryPink)};
}
cursor: pointer;
`;

const DropdownOption = ({
  onClickOption,
  label,
  isAddFolderBtn,
  ofType,
}) => (
  <SingleDropDownElementWrapper
    role="button"
    aria-label={`add ${ofType} ${label} to query`} // is this a good aria-label?
    onClick={onClickOption}
    isAddFolderBtn={isAddFolderBtn}
  >
    <DropDownLabel>{capitaliseFirstLetters(label)}</DropDownLabel>
  </SingleDropDownElementWrapper>
);

const ChosenEntity = ({
  // rename value?
  value,
  onClickRemove,
  ofType,
}) => (
  value && value?.length > 0
  && (
  <ChosenEntityWrapper>
    {capitaliseFirstLetters(value)}
    <XBoxWrapper
      onClick={onClickRemove}
      role="button"
      aria-label={`remove ${ofType} ${value} from query`}
    >
      {deleteIcon}
    </XBoxWrapper>
  </ChosenEntityWrapper>
  )
);

const SearchComboBox = ({
  ofType,
  chosenValues,
  onClickOption,
  hasAddOptionBtn,
  onClickAddOption,
  onDeletingChoice,
  addOptionLabel,
  exclude,
  shouldDisplayChosenValues,
}) => {
  const [queryString, setQueryString] = useState('');

  const [allOptions] = useComboboxQueryManager(ofType, queryString);

  return (
    <SearchBarContainer aria-label={`search for ${ofType}`}>

      <SearchInput
        type="text"
        ofType={ofType}
        name="dropDownSearch"
        placeholder={`${ofType}s`}
        onChange={(e) => setQueryString(e.target.value)}
      />

      <OptionsWrapper>
        {allOptions?.length > 0
          && allOptions
            .filter((option) => (
              exclude && !(exclude.includes(option))
            ))
            .map((option) => (
              <DropdownOption
                key={option.id || option}
                onClickOption={() => onClickOption(option, ofType)}
                ofType={ofType}
                label={option.name || option}
              />
            ))}
      </OptionsWrapper>

      {shouldDisplayChosenValues && chosenValues.length > 0(
        <ChoicesWrapper>
          {chosenValues.map((singleValue) => (
            <ChosenEntity
              key={singleValue}
              value={singleValue}
              onClickRemove={() => onDeletingChoice(singleValue, ofType)}
              ofType={ofType}
            />
          ))}
        </ChoicesWrapper>,
      )}
      {hasAddOptionBtn
        && (
        <AddOptionBtnWrapper>
          <DropdownOption
            onClickOption={onClickAddOption}
            label={addOptionLabel}
            isAddNewOptionBtn
          />
        </AddOptionBtnWrapper>
        )}
    </SearchBarContainer>
  );
};

DropdownOption.propTypes = {
  onClickOption: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isAddFolderBtn: PropTypes.bool,
  ofType: PropTypes.string.isRequired,
};

DropdownOption.defaultProps = {
  isAddFolderBtn: false,
};

ChosenEntity.propTypes = {
  value: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  ofType: PropTypes.string.isRequired,
};

SearchComboBox.propTypes = {
  ofType: PropTypes.string.isRequired,
  chosenValues: PropTypes.arrayOf(PropTypes.string),
  onClickOption: PropTypes.func.isRequired,
  hasAddOptionBtn: PropTypes.bool,
  onClickAddOption: PropTypes.func,
  addOptionLabel: PropTypes.string,
  exclude: PropTypes.arrayOf(PropTypes.string),
  shouldDisplayChosenValues: PropTypes.bool,
  onDeletingChoice: PropTypes.func,
};

SearchComboBox.defaultProps = {
  chosenValues: [],
  hasAddOptionBtn: false,
  onClickAddOption: () => {},
  addOptionLabel: undefined,
  exclude: undefined,
  shouldDisplayChosenValues: false,
  onDeletingChoice: () => {},
};

export default SearchComboBox;
