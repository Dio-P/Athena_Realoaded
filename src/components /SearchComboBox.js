import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import style, { colours } from '../styleVariables';
import { deleteIcon } from '../helpers/svgIcons';
import { SearchInput } from './specialElements';
import capitaliseFirstLetters from '../helpers/capitaliseFirstLetters';
import useGetAllOfType from '../hooks/queries/useGetAllOfType';
// import useFilterEntityByQueryString from '../hooks/queries/useFilterEntityByQueryString';
import useSearchComboBoxHelper from '../hooks/useSearchComboBoxHelper';

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

const DropdownOption = ({
  onClickOption,
  label,
  isAddFolderBtn,
  ofType,
}) => (
  <SingleDropDownElementWrapper
    role="button"
    aria-label={`add ${ofType} ${label} to query`} // is this a good aria-label?
    onClick={onClickOption}
    isAddFolderBtn={isAddFolderBtn}
  >
    <DropDownLabel>{capitaliseFirstLetters(label)}</DropDownLabel>
  </SingleDropDownElementWrapper>
);

const ChosenEntity = ({
  // rename value?
  value,
  onClickRemove,
  ofType,
}) => (
  <ChosenEntityWrapper>
    {capitaliseFirstLetters(value)}
    <XBoxWrapper
      onClick={onClickRemove}
      role="button"
      aria-label={`remove ${ofType} ${value} from query`} // is this all right?
    >
      {deleteIcon}
    </XBoxWrapper>
  </ChosenEntityWrapper>
);

const SearchComboBox = ({
  ofType,
  chosenValues,
  onClickOption,
}) => {
  const [queryString, setQueryString] = useState('');
  const [allOptions, setAllOptions] = useState(undefined);

  const [allOptionsOfType] = useGetAllOfType(ofType, queryString);
  // const { returnedEntities } = useFilterEntityByQueryString(queryString, ofType);
  const [createUpdatePayload] = useSearchComboBoxHelper();

  useEffect(() => {
    setAllOptions(allOptionsOfType);
  }, [allOptionsOfType]);

  const removeChoice = (choiceToRemove) => {
    const { [ofType]: ofThisType, ...typesWithoutThis } = chosenValues;

    const updateChoicesInField = () => ofThisType.filter(
      (choice) => choice !== choiceToRemove,
    );

    const updatedFields = (ofThisType.length === 1)
      ? { ...typesWithoutThis }
      : { ...typesWithoutThis, [ofType]: updateChoicesInField() };

    onClickOption(updatedFields);
  };

  console.log('allOptions$$', allOptions);
  return (
    <SearchBarContainer aria-label={`search for ${ofType}`}>

      <SearchInput
        type="text"
        name="dropDownSearch"
        placeholder={`${ofType}s`}
        onChange={(e) => setQueryString(e.target.value)}
      />

      <OptionsWrapper>
        {allOptions?.length > 0
          && allOptions.map((option) => (
            <DropdownOption
              key={option}
              onClickOption={() => onClickOption(createUpdatePayload(ofType, chosenValues, option))}
                // {
                //   ...chosenValues,
                //   [ofType]: chosenValues[ofType] ? [...chosenValues[ofType], option] : [option],
                // },
              // )}
              ofType={ofType}
              label={option}
            />
          ))}
      </OptionsWrapper>

      {chosenValues[ofType]?.length > 0 && (
        <ChoicesWrapper>
          {chosenValues[ofType].map((singleValue) => (
            <ChosenEntity
              key={singleValue}
              value={singleValue}
              onClickRemove={() => removeChoice(singleValue)}
              ofType={ofType}
            />
          ))}
        </ChoicesWrapper>
      )}
    </SearchBarContainer>
  );
};

DropdownOption.propTypes = {
  onClickOption: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isAddFolderBtn: PropTypes.bool,
  ofType: PropTypes.string.isRequired,
};

DropdownOption.defaultProps = {
  isAddFolderBtn: false,
};

ChosenEntity.propTypes = {
  value: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  ofType: PropTypes.string.isRequired,
};

SearchComboBox.propTypes = {
  ofType: PropTypes.string.isRequired,
  chosenValues: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.arrayOf(PropTypes.string),
    mainLinks: PropTypes.arrayOf(PropTypes.string),
    briefDescription: PropTypes.string,
    teamsResponsible: PropTypes.arrayOf(PropTypes.string),
    properties: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  onClickOption: PropTypes.func.isRequired,
};

SearchComboBox.defaultProps = {
  chosenValues: {},
};

export default SearchComboBox;
