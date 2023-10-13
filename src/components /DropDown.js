import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import capitaliseFirstLetters from '../helpers/capitaliseFirstLetters';
import styleVariables from '../styleVariables';
import { SearchBar } from './specialElements';
// import { useSearchBar } from '../hooks/useAddNewConnectionBlock';
import MultiBtnComp from './MultiBtnComp';
import useParamsHelper from '../hooks/useParamsHelper';

const DropDownContainer = styled.div`
  display: flex;
`;

const DropDownUnitWrapper = styled.div`
  display: flex;
  border-radius: ${styleVariables.borderRadious.main};
  box-shadow: ${styleVariables.boxShadow.bigButton};
  flex-direction: column;
  align-content: center;
  background-color: ${styleVariables.colours.primaryLight};
  border: solid ${styleVariables.colours.secondaryOrange};
  padding: 6px 7px;
  overflow: hidden;
  height: 100%;
  width: 200px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  border-radius: ${styleVariables.borderRadious.main};
`;

const SingleDropDownElementWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 99%;
  height: 45px;
  background-color: ${(props) => (!props.isAddFolderBtn
    ? styleVariables.colours.tertiaryBlue
    : styleVariables.colours.tertiaryPink)};
  border-radius: ${(props) => (!props.isAddFolderBtn ? null : styleVariables.borderRadious.main)};
  color: black;
  margin: 1px;
  margin-top: ${(props) => props.isAddFolderBtn && '4px'};

  &:hover {
    background-color: ${(props) => (!props.isAddFolderBtn
    ? styleVariables.colours.secondaryBlue
    : styleVariables.colours.secondaryPink)};
  }
  cursor: pointer;
`;

const DropDownLabel = styled.div`
  margin: auto;
`;

const SingleDropdownElement = ({
  onClickOption,
  label,
  isAddFolderBtn,
}) => (
  <SingleDropDownElementWrapper
    onClick={onClickOption}
    isAddFolderBtn={isAddFolderBtn}
  >
    <DropDownLabel>{capitaliseFirstLetters(label)}</DropDownLabel>
  </SingleDropDownElementWrapper>
);

const DropDown = ({

}) => {
  const allData = useMemo(
    () => (freshlyAddedValue ? [...preexistingData, freshlyAddedValue] : preexistingData),
    [preexistingData, freshlyAddedValue],
  );

  const { search, searchingQuery, filteredData } = useSearchBar(allData);
  const {
    manageDdOpenParam,
    params: { isDdOpen },
  } = useParamsHelper();

  const optionsToRender = !searchingQuery ? allData : filteredData;

  return (
    <DropDownContainer>
      <GenericButtonIcon
        onClickFunction={manageDdOpenParam}
        type="dropDown"
        isMenuOpen={isDdOpen}
        freshlyAddedValue={freshlyAddedValue}
        chosenValue={chosenValue}
      />
      {isDropdownOpen
        && (
        <DropDownUnitWrapper>
          <SearchBar searchingQuery={searchingQuery} search={search} />
          <OptionsWrapper>
            {optionsToRender.map((folder, index) => (
              <SingleDropdownElement
                onClickOption={() => onClickOption(folder)}
                label={folder.name}
                key={index}
              />
            ))}
          </OptionsWrapper>
          {providingAdditionalOption
            && (
            <SingleDropdownElement
              onClickOption={onClickingAdditionalOption}
              label={dDBtnLabel}
              isAddFolderBtn
            />
            )}
        </DropDownUnitWrapper>
        )}
    </DropDownContainer>
  );
};

export default DropDown;

// rounded corners once arround the main box
// change this to a generic component that can be reused
