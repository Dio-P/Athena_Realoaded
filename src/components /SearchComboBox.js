import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import styleVariables from "../styleVariables";
import { deleteIcon, magnifyingGlassIcon } from "../helpers/svgIcons";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import useGetAllOfType from "../hooks/queries/useGetAllOfType";

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

const ChosenEntity = ({ value, onClickRemove }) => {
  return (
    <ChosenEntityWrapper>
      {capitaliseFirstLetters(value)}
      <XBoxWrapper onClick={onClickRemove}>{deleteIcon}</XBoxWrapper>
    </ChosenEntityWrapper>
  );
};

export const SearchComboBox = ({
  data,
  // onClickOption,
  // freshlyAddedValue,
  // preexistingData,
  searchFunction,
  ofType,
  value, //rename this chosenValues
  setValue, //rename this setChosenValues
}) => {
  
  const [queryString, setQueryString] = useState("")
  const { filteredResults } = useGetAllOfType(ofType, queryString );
  
  const optionsToRender = filteredResults || [];
  console.log("optionsToRender@@@", optionsToRender);

  // const clickingOption = (entity) => {
  //   console.log("option has been clicked: ", entity);
  //   setValue({ ...value, [ofType]: [...value[ofType], entity || entity] });
  //   // setValue([...value, entity || entity])
  // };

  const removeChoice = (choiceToRemove) => {
    console.log();
    const updatedValues = value[ofType].filter(
      (choice) => choice !== choiceToRemove
    );
// this would probably need to change

    // const updatedValues = value?.id ?
    //   value.filter(({id}) => (id !== valueToRemove.id))
    //   :
    //   value.filter((singleValue) => (singleValue !== valueToRemove))
    setValue({...value, [ofType]: updatedValues});
  };

  return (
    <SearchBarContainer>
      <MagnifyingGlassIconWrapper>
        {magnifyingGlassIcon}
        {/* Search for {ofType}s */}
      </MagnifyingGlassIconWrapper>

      <SearchInput
        type="text"
        name="dropDownSearch"
        placeholder={`${ofType}s`}
        // value={e.target.value}
        onChange={(e) => setQueryString(e.target.value)}
        // onChange={(e) => searchFunction(e.target.value, ofType)}
        // onChange={(e) => searchFunction(e.target.value)}
        // onChange={(e) => setSearchingQuery(e.target.value)}
      />

      <OptionsWrapper>
        {optionsToRender.map((entity) => {
          return (
            <SingleDropdownElement
              onClickOption={() => 
                setValue(
                  { 
                  ...value, 
                  [ofType]: value[ofType]? [...value[ofType], entity] : [entity] 
                })}
              
              label={entity} //remove completely the entity when done with changing all
              key={entity.id}
              // value={value}
            />
          );
        })}
      </OptionsWrapper>

      {value[ofType]?.length > 0 && (
        <ChoicesWrapper>
          {value[ofType].map((singleValue) => (
            <ChosenEntity
              key={singleValue.id}
              value={singleValue}
              onClickRemove={() => removeChoice(singleValue)}
            />
          ))}
        </ChoicesWrapper>
      )}
    </SearchBarContainer>
  );
};

export default SearchComboBox;
