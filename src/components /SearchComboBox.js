import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes, {
  arrayOf, oneOf, string, bool, func,
  shape,
} from 'prop-types';

import style, { colours } from '../styleVariables';
import { deleteIcon, infoIcon, tickIcon } from '../helpers/svgIcons';
import { SearchInput } from './specialElements';
import capitaliseFirstLetters from '../helpers/capitaliseFirstLetters';
// import useComboboxQueryManager from '../hooks/queries/useComboboxQueryManager';

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

// const ChoicesWrapper = styled.div`
//   display: flex;
// `;

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
const DescriptionBtn = styled.div`
  display: flex;
  height: 100%;
  width: 25px;
  margin: 1px 2px 1px 2px;
`;

const TickBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 70%;
  max-width: 30px;
  margin: 8px;
  border-radius: ${style.variables.borderRadious.secondary};
  background-color: ${colours.primaryLight};
  min-width: 30px;
  max-width: 60px;
`;

const TickBox = styled.div`
  // background-color: ${colours.primaryLight};
  margin: auto;
  height: 80%;
  width: 80%;
`;

const DropdownOption = ({
  onClickOption,
  option,
  isAddFolderBtn,
  ariaLabel,
  hasBeenClicked,
  acceptsMultipleValues,
}) => {
  const label = option.name || option.title || option;
  console.log('option', option);
  return (
    // `add ${ofType} ${label} to query`
    <SingleDropDownElementWrapper
      role="button"
      aria-label={ariaLabel} // is this a good aria-label?
      onClick={onClickOption}
      isAddFolderBtn={isAddFolderBtn}
    >
      {acceptsMultipleValues
      && (
      <TickBoxWrapper>
        <TickBox>{hasBeenClicked && tickIcon}</TickBox>
      </TickBoxWrapper>
      )}
      <DropDownLabel>{capitaliseFirstLetters(label)}</DropDownLabel>
      <DescriptionBtn onClick={() => console.log('description btn clicked')}>{infoIcon}</DescriptionBtn>
    </SingleDropDownElementWrapper>
  );
};

const ChosenEntity = ({
  // rename value?
  value,
  onClickRemove,
  ofType,
}) => {
  console.log('value', value);
  return (
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
};

const SearchComboBox = ({
  ofType,
  options,
  chosenValues,
  onClickOption,
  hasAddOptionBtn,
  onClickAddOption,
  onDeletingChoice,
  addOptionLabel,
  // exclude,
  acceptsMultipleValues,
  // userInput,
  onChange,
  optionsAriaLabel,
}) => {
  const [userInput, setUserInput] = useState('');
  const [clickedOptions, setClickedOptions] = useState({});

  const handleClickOption = (option) => {
    console.log('option****************', option);
    const clickedOptionTitleOrId = option.id || option;
    // const allOptionsIds = options;
    console.log('chosenValues', chosenValues);
    const allOptionsIds = chosenValues.length > 0 ? chosenValues?.map((singleOption) => (
      singleOption.id
    )) : [];
    console.log('clickedOptionTitle', clickedOptionTitleOrId);
    console.log('allOptionsIds', allOptionsIds);
    console.log('acceptsMultipleValues', acceptsMultipleValues);
    if (acceptsMultipleValues && allOptionsIds?.includes(clickedOptionTitleOrId)) {
      console.log('inside accepts and is included');
      onDeletingChoice(clickedOptionTitleOrId);
    } else {
      console.log('inside does not accept or is not included');
      onClickOption(option);
    }
  };

  return (
    <SearchBarContainer aria-label={`search for ${ofType}`}>

      <SearchInput
        type="text"
        value={userInput}
        ofType={ofType}
        name="dropDownSearch"
        placeholder={`${ofType}s`}
        onChange={(e) => {
          setUserInput(e.target.value);
          onChange(e.target.value);
        }}
      />

      <OptionsWrapper>
        {options?.length > 0
          && options.map((option) => (
            <DropdownOption
              key={option.id || option}
              option={option}
              onClickOption={() => {
                handleClickOption(option, ofType);
                console.log('clicked Option is: ', option);
                console.log('clickedOptions are: ', clickedOptions);
                setClickedOptions(
                  { ...clickedOptions, [option.id]: !clickedOptions[option.id] },
                );
              }}
              ofType={ofType}
              ariaLabel={optionsAriaLabel}
              hasBeenClicked={clickedOptions[option.id]}
              acceptsMultipleValues={acceptsMultipleValues}
            />
          ))}
      </OptionsWrapper>

      {/* {
      acceptsMultipleValues && chosenValues?.length > 0
        && (
        <ChoicesWrapper>
          {chosenValues.map((singleValue) => (
            <ChosenEntity
              key={singleValue}
              value={singleValue.title || singleValue}
              onClickRemove={() => onDeletingChoice(singleValue)}
              ofType={ofType}
            />
          ))}
        </ChoicesWrapper>
        )
      } */}

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
  onClickOption: func.isRequired,
  isAddFolderBtn: bool,
  option: oneOf(string || shape({
    id: string,
    title: string,
    description: string,
  })).isRequired,
  ariaLabel: string,
  hasBeenClicked: bool,
  acceptsMultipleValues: bool,
};

DropdownOption.defaultProps = {
  isAddFolderBtn: false,
  ariaLabel: '',
  hasBeenClicked: false,
  acceptsMultipleValues: false,
};

ChosenEntity.propTypes = {
  value: string.isRequired,
  onClickRemove: func.isRequired,
  ofType: string.isRequired,
};

SearchComboBox.propTypes = {
  ofType: string.isRequired,
  options: oneOf([arrayOf(string), arrayOf(PropTypes.objectOf(string))]),
  chosenValues: oneOf([
    arrayOf(string),
    arrayOf(
      shape({
        id: string,
        title: string,
        description: string,
      }),
    )]),
  onClickOption: func.isRequired,
  hasAddOptionBtn: bool,
  onClickAddOption: func,
  addOptionLabel: string,
  // exclude: arrayOf(string),
  acceptsMultipleValues: bool,
  onDeletingChoice: func,
  // userInput: string,
  onChange: func.isRequired,
  optionsAriaLabel: string,
};

SearchComboBox.defaultProps = {
  chosenValues: [],
  options: [],
  hasAddOptionBtn: false,
  onClickAddOption: () => {},
  addOptionLabel: undefined,
  // exclude: undefined,
  acceptsMultipleValues: false,
  onDeletingChoice: () => {},
  // userInput: '',
  optionsAriaLabel: '',
};

export default SearchComboBox;

// const [userInput, onChange] = useState('');
// const [allOptions] = useComboboxQueryManager(ofType, userInput);
