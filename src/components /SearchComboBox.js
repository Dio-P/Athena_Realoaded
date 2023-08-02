import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import styleVariables from "../styleVariables";
import { magnifyingGlassIcon } from "../helpers/svgIcons";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

const SearchBarContainer = styled.div`
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

const SingleDropdownElement = ({ onClickOption, label, isAddFolderBtn }) => {
  return (
    <SingleDropDownElementWrapper
      onClick={onClickOption}
      isAddFolderBtn={isAddFolderBtn}
    >
      <DropDownLabel>{capitaliseFirstLetters(label)}</DropDownLabel>
    </SingleDropDownElementWrapper>
  );
};

export const SearchComboBox = ({
  data,
  onClickOption,
  freshlyAddedValue,
  preexistingData,
  searchFunction,
  searchingFor,
  value,
  setValue
}) => {
  // const [searchingQuery, setSearchingQuery] = useState(undefined);

  // const allData = useMemo(
  //   () =>
  //     freshlyAddedValue
  //       ? [...preexistingData, freshlyAddedValue]
  //       : preexistingData,
  //   [preexistingData, freshlyAddedValue]
  // );
  // const filteredData = useMemo(
  //   () => allData.filter((folder) => folder.name.includes(searchingQuery)),
  //   [searchingQuery]
  // );

  // const optionsToRender = !searchingQuery ? allData : filteredData;
  console.log("data", data);
  const optionsToRender = data? data: [];

  return (
    <SearchBarContainer>
      <MagnifyingGlassIconWrapper>
        {searchingFor}{magnifyingGlassIcon}
      </MagnifyingGlassIconWrapper>
      <SearchInput
        type="text"
        name="dropDownSearch"
        placeholder={searchingFor}
        // value={value}
        onChange={(e) => setValue(e.target.value)}
        // onChange={(e) => searchFunction(e.target.value)}
        // onChange={(e) => setSearchingQuery(e.target.value)}
      />
      <OptionsWrapper>
        {optionsToRender.map((entity) => (
          <SingleDropdownElement
            // onClickOption={() => onClickOption(entity)}
            label={entity.name}
            key={entity.id}
                    // value={value}

          />
        ))}
      </OptionsWrapper>
    </SearchBarContainer>
  );
};

export default SearchComboBox;
