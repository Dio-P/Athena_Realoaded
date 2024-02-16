import React from 'react';
import styled from '@emotion/styled';
import PropTypes, {
  arrayOf, oneOf, string, bool, func,
  shape,
} from 'prop-types';

import style, { colours } from '../styleVariables';
import { deleteIcon, infoIcon } from '../helpers/svgIcons';
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
const DescriptionBtn = styled.div`
  display: flex;
  height: 100%;
  width: 25px;
  margin: 1px 2px 1px 2px;
`;

const DropdownOption = ({
  onClickOption,
  option,
  isAddFolderBtn,
  ariaLabel,
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
  options,
  chosenValues,
  onClickOption,
  hasAddOptionBtn,
  onClickAddOption,
  onDeletingChoice,
  addOptionLabel,
  exclude,
  shouldDisplayChosenValues,
  queryString,
  onChange,
  optionsAriaLabel,
}) => {
  console.log('options******', options);
  return (
    <SearchBarContainer aria-label={`search for ${ofType}`}>

      <SearchInput
        type="text"
        value={queryString}
        ofType={ofType}
        name="dropDownSearch"
        placeholder={`${ofType}s`}
        onChange={(e) => onChange(e.target.value)}
      />

      <OptionsWrapper>
        {options?.length > 0
          && options
            .filter((option) => (
              exclude && !(exclude.includes(option))
            )) // no clue what this is any more
            .map((option) => (
              <DropdownOption
                key={option.id || option}
                option={option}
                onClickOption={() => onClickOption(option, ofType)}
                ofType={ofType}
                ariaLabel={optionsAriaLabel}
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
  onClickOption: func.isRequired,
  isAddFolderBtn: bool,
  option: oneOf(string || shape({
    id: string,
    title: string,
    description: string,
  })).isRequired,
  ariaLabel: string,
};

DropdownOption.defaultProps = {
  isAddFolderBtn: false,
  ariaLabel: '',
};

ChosenEntity.propTypes = {
  value: string.isRequired,
  onClickRemove: func.isRequired,
  ofType: string.isRequired,
};

SearchComboBox.propTypes = {
  ofType: string.isRequired,
  options: oneOf(arrayOf(string) || arrayOf(PropTypes.objectOf(string))),
  chosenValues: arrayOf(string),
  onClickOption: func.isRequired,
  hasAddOptionBtn: bool,
  onClickAddOption: func,
  addOptionLabel: string,
  exclude: arrayOf(string),
  shouldDisplayChosenValues: bool,
  onDeletingChoice: func,
  queryString: string,
  onChange: func.isRequired,
  optionsAriaLabel: string,
};

SearchComboBox.defaultProps = {
  chosenValues: [],
  options: {},
  hasAddOptionBtn: false,
  onClickAddOption: () => {},
  addOptionLabel: undefined,
  exclude: undefined,
  shouldDisplayChosenValues: false,
  onDeletingChoice: () => {},
  queryString: '',
  optionsAriaLabel: '',
};

export default SearchComboBox;

// const [queryString, onChange] = useState('');
// const [allOptions] = useComboboxQueryManager(ofType, queryString);
