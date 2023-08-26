import styled from "@emotion/styled";
import styleVariables from "../styleVariables";
import { magnifyingGlassIcon } from "../helpers/svgIcons";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

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
  background-color: ${(props) =>
    !props.isAddFolderBtn
      ? styleVariables.colours.tertiaryBlue
      : styleVariables.colours.tertiaryPink};
  border-radius: ${(props) =>
    !props.isAddFolderBtn ? null : styleVariables.borderRadious.main};
  color: black;
  margin: 1px;
  margin-top: ${(props) => props.isAddFolderBtn && "4px"};

  &:hover {
    background-color: ${(props) =>
      !props.isAddFolderBtn
        ? styleVariables.colours.secondaryBlue
        : styleVariables.colours.secondaryPink};
  }
  cursor: pointer;
`;

const DropDownLabel = styled.div`
  margin: auto;
`;

const SingleQueryResult = ({ onClickOption, label, isAddFolderBtn }) => {
  return (
    <SingleDropDownElementWrapper
      onClick={onClickOption}
      isAddFolderBtn={isAddFolderBtn}
    >
      <DropDownLabel>{capitaliseFirstLetters(label)}</DropDownLabel>
    </SingleDropDownElementWrapper>
  );
};

const AdvanceSearchResultsBox = ({
  advanceSearchResults,
  onClickOption,
}) => {
  
  return (
    <SearchBarContainer aria-label='Advance Search Results'>
      <MagnifyingGlassIconWrapper>
        {magnifyingGlassIcon}
      </MagnifyingGlassIconWrapper>

      <SearchInput
        name="advanceSearchDisplayBox"
        placeholder="advance"
        disabled
      />

      <OptionsWrapper>
        {advanceSearchResults &&
          advanceSearchResults.map(({id, name}) => (
              <SingleQueryResult
                onClickOption={() => onClickOption(id)}
                label={name}
                key={id}
              />
            ))
        }
      </OptionsWrapper>
    </SearchBarContainer>
  );
};

export default AdvanceSearchResultsBox;
