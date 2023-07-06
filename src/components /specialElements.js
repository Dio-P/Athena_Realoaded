import { useState, useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import { warningIcon, magnifyingGlassIcon } from "../helpers/svgIcons";
import styleVariables from "../styleVariables";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

// WarningElement element styles \/

const WarningElementWrapper = styled.div`
  color: red;
  margin: 5px 20px 8px;
  display: flex;
  flex-flow: row wrap;
`;

const WarningHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WarningIconContainer = styled.div`
  height: 20px;
  width: 20px;
`;

// useSearchBar element styles \/

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  margin-bottom: 3px;
`;

const MagnifyingGlassIconWrapper = styled.div`
  width: 23px;
  height: 23px;
  padding: 3px;
`;

const SearchInput = styled.input`
  width: 100%;
  margin-right: 3px;
  border-radius: ${styleVariables.borderRadious.main};
`;

export const WarningElement = ({ info }) => {
  return (
    <WarningElementWrapper>
      <WarningHeaderContainer>
        <WarningIconContainer>
          {warningIcon}
        </WarningIconContainer>
        <strong>Warning: </strong>  
      </WarningHeaderContainer>
      {` ${info}`}
    </WarningElementWrapper>
  ) 
};

export const SearchBar = ({searchingQuery, search}) => (
  <SearchBarWrapper>
  <MagnifyingGlassIconWrapper>{magnifyingGlassIcon}</MagnifyingGlassIconWrapper>
  <SearchInput
    type="text"
    name="dropDownSearch"
    value={searchingQuery}
    onChange={search}
  />
</SearchBarWrapper>
); 