import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import styleVariables from '../styleVariables';
import { magnifyingGlassIcon } from '../helpers/svgIcons';
import capitaliseFirstLetters from '../helpers/capitaliseFirstLetters';

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin-bottom: 3px;
  padding: 10px;
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

const SingleOption = ({
  onClickOption,
  label,
  isAddFolderBtn,
}) => (
  <SingleDropDownElementWrapper
    onClick={onClickOption}
    isAddFolderBtn={isAddFolderBtn}
    aria-label={`choose ${label}`}
  >
    <DropDownLabel>{capitaliseFirstLetters(label)}</DropDownLabel>
  </SingleDropDownElementWrapper>
);

const AdvanceSearchResultsBox = ({
  advanceSearchResults,
  onClickOption,
}) => (
  <SearchBarContainer aria-label="Advance Search Results">
    <MagnifyingGlassIconWrapper>
      {magnifyingGlassIcon}
    </MagnifyingGlassIconWrapper>

    <SearchInput
      name="advanceSearchDisplayBox"
      placeholder="advance"
      disabled
    />

    <OptionsWrapper>
      {advanceSearchResults
          && advanceSearchResults.map(({ id, name }) => (
            <SingleOption
              onClickOption={() => onClickOption(id)}
              label={name}
              key={id}
            />
          ))}
    </OptionsWrapper>
  </SearchBarContainer>
);

SingleOption.propTypes = {
  onClickOption: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isAddFolderBtn: PropTypes.bool,
};

SingleOption.defaultProps = {
  isAddFolderBtn: false,
};

AdvanceSearchResultsBox.propTypes = {
  advanceSearchResults: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    mainLinks: PropTypes.arrayOf(PropTypes.string),
    briefDescription: PropTypes.string,
    teamsResponsible: PropTypes.arrayOf(PropTypes.string),
    properties: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  })),
  onClickOption: PropTypes.func.isRequired,
};

AdvanceSearchResultsBox.defaultProps = {
  advanceSearchResults: {},
};

export default AdvanceSearchResultsBox;
