import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import styleVariables from "../styleVariables";
import { deleteIcon, magnifyingGlassIcon } from "../helpers/svgIcons";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import useGetAllOfType from "../hooks/queries/useGetAllOfType";
// import useEntityByIdSearch from "../hooks/queries/useEntityByIdSearch";

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
  // const [returnedEntity, searchEntity] = useEntityByIdSearch()
  const [queryString, setQueryString] = useState("")
  // const { filteredResults } = useGetAllOfType(ofType, queryString );
  
  // const optionsToRender = filteredResults || [];
  console.log("optionsToRender@@@", advanceSearchResults);

  return (
    <SearchBarContainer>
      <MagnifyingGlassIconWrapper>
        {magnifyingGlassIcon}
      </MagnifyingGlassIconWrapper>

      <SearchInput
        // type="text"
        name="advanceSearchDisplayBox"
        // placeholder={`${ofType}s`}
        // onChange={(e) => setQueryString(e.target.value)}
        disabled
      />

      <OptionsWrapper>
        {advanceSearchResults.map((entity) => (
          // what do I want this to display ?
            <SingleQueryResult
              onClickOption={() => onClickOption(entity.id)}
              label={entity.name}
              key={entity.id}
            />
          ))
        }
      </OptionsWrapper>
    </SearchBarContainer>
  );
};

export default AdvanceSearchResultsBox;
