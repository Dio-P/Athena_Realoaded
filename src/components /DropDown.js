import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

// import useGetAllOfType from '../hooks/queries/useGetAllOfType';

import capitaliseFirstLetters from '../helpers/capitaliseFirstLetters';
import style from '../styleVariables';
import { SearchInput } from './specialElements';
// import { useSearchBar } from '../hooks/useAddNewConnectionBlock';
import MultiBtnComp from './MultiBtnComp';
import useCustomSearchQuery from '../hooks/queries/useCustomSearch';
// import useParamsHelper from '../hooks/useParamsHelper';

const DropDownContainer = styled.div`
  display: flex;
`;

const DropDownUnitWrapper = styled.div`
  display: flex;
  border-radius: ${style.variables.borderRadious.main};
  box-shadow: ${style.variables.boxShadow.large};
  flex-direction: column;
  align-content: center;
  background-color: ${style.variables.colours.primaryLight};
  border: solid ${style.variables.colours.secondaryOrange};
  padding: 6px 7px;
  overflow: hidden;
  height: 100%;
  width: 200px;
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
  background-color: ${(props) => (!props.isAddNewOptionBtn
    ? style.variables.colours.tertiaryBlue
    : style.variables.colours.tertiaryPink)};
  border-radius: ${(props) => (!props.isAddNewOptionBtn ? null : style.variables.borderRadious.main)};
  color: black;
  margin: 1px;
  margin-top: ${(props) => props.isAddNewOptionBtn && '4px'};

  &:hover {
    background-color: ${(props) => (!props.isAddNewOptionBtn
    ? style.variables.colours.secondaryBlue
    : style.variables.colours.secondaryPink)};
  }
  cursor: pointer;
`;

const DropDownLabel = styled.div`
  margin: auto;
`;

const SingleDropdownElement = ({
  onClickOption,
  label,
  isAddNewOptionBtn,
}) => (
  <SingleDropDownElementWrapper
    onClick={onClickOption}
    isAddNewOptionBtn={isAddNewOptionBtn}
  >
    <DropDownLabel>{capitaliseFirstLetters(label)}</DropDownLabel>
  </SingleDropDownElementWrapper>
);

const DropDown = ({
  chosenValue,
  freshlyAddedValue,
  searchingQuery,
  onClickOption,
  hasAddOptionBtn,
  addOptionLabel,
  onClickAddOption,
}) => {
  // const allData = useMemo(
  //   () => (freshlyAddedValue ? [...preexistingData, freshlyAddedValue] : preexistingData),
  //   [preexistingData, freshlyAddedValue],
  // );

  // const { search, searchingQuery, filteredData } = useSearchBar(allData);
  // const {
  //   manageDdOpenParam,
  //   params: { isDdOpen },
  // } = useParamsHelper();
  const [isDropdownOpen, useIsDropdownOpen] = useState();
  const { returnedEntities, trigerAdvancedSearch } = useCustomSearchQuery();

  const optionsToRender = returnedEntities;
  // const optionsToRender = !searchingQuery ? allData : filteredData;

  return (
    <DropDownContainer>
      <MultiBtnComp
        onClickFunction={useIsDropdownOpen}
        type="dropDown"
        isMenuOpen={isDropdownOpen}
        freshlyAddedValue={freshlyAddedValue}
        chosenValue={chosenValue}
      />
      {isDropdownOpen
        && (
        <DropDownUnitWrapper>
          <SearchInput
            searchingQuery={searchingQuery}
            onChange={(e) => trigerAdvancedSearch({ name: e.target.value })}
          />
          <OptionsWrapper>
            {optionsToRender.map((option) => (
              <SingleDropdownElement
                onClickOption={() => onClickOption(option)}
                label={option}
                key={option}
              />
            ))}
          </OptionsWrapper>
          {hasAddOptionBtn
            && (
            <SingleDropdownElement
              onClickOption={onClickAddOption}
              label={addOptionLabel}
              isAddNewOptionBtn
            />
            )}
        </DropDownUnitWrapper>
        )}
    </DropDownContainer>
  );
};

SingleDropdownElement.propTypes = {
  onClickOption: PropTypes.func,
  label: PropTypes.string,
  isAddNewOptionBtn: PropTypes.bool,
};

SingleDropdownElement.defaultProps = {
  onClickOption: () => {},
  label: undefined,
  isAddNewOptionBtn: false,
};

DropDown.propTypes = {
  chosenValue: PropTypes.string,
  freshlyAddedValue: PropTypes.string,
  searchingQuery: PropTypes.string,
  onClickOption: PropTypes.func,
  hasAddOptionBtn: PropTypes.bool,
  addOptionLabel: PropTypes.string,
  onClickAddOption: PropTypes.func,
};

DropDown.defaultProps = {
  chosenValue: '',
  freshlyAddedValue: undefined,
  searchingQuery: '',
  onClickOption: () => {},
  hasAddOptionBtn: false,
  addOptionLabel: undefined,
  onClickAddOption: () => {},
};

export default DropDown;

// rounded corners once arround the main box
// change this to a generic component that can be reused
