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

const DropdownOption = ({ onClickOption, label, isAddFolderBtn }) => {
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

const SearchComboBox = ({
  ofType,
  chosenValues,
  onClickOption,
}) => {
  
  const [queryString, setQueryString] = useState("")
  const [allOptionsOfType] = useGetAllOfType(ofType, queryString );
  
  // const optionsToRender = allOptionsOfType || [];

  const removeChoice = (choiceToRemove) => {
    const {[ofType]: ofThisType, ...typesWithoutThis } = chosenValues;

    const updateChoicesInField = () => ofThisType.filter(
      (choice) => choice !== choiceToRemove
    );

    const updatedFields = (ofThisType.length === 1) ? 
    {...typesWithoutThis} 
    : 
    {...typesWithoutThis, ofThisType: updateChoicesInField()};

    onClickOption(updatedFields);
  };

  return (
    <SearchBarContainer>
      <MagnifyingGlassIconWrapper>
        {magnifyingGlassIcon}
      </MagnifyingGlassIconWrapper>

      <SearchInput
        type="text"
        name="dropDownSearch"
        placeholder={`${ofType}s`}
        onChange={(e) => setQueryString(e.target.value)}

      />

      <OptionsWrapper>
        {allOptionsOfType &&
          allOptionsOfType.map((entity) => (
              <DropdownOption
                onClickOption={() => 
                  onClickOption(
                    { 
                    ...chosenValues, 
                    [ofType]: chosenValues[ofType]? [...chosenValues[ofType], entity] : [entity] 
                  })}
                
                label={entity}
                key={entity.id}
              />
            ))
        }
      </OptionsWrapper>

      {chosenValues[ofType]?.length > 0 && (
        <ChoicesWrapper>
          {chosenValues[ofType].map((singleValue) => (
            <ChosenEntity
              key={singleValue}
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
