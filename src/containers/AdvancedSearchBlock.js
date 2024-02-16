import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import SearchComboBox from '../components /SearchComboBox';
import { refreshIcon } from '../helpers/svgIcons';
import useSearchComboBoxHelper from '../hooks/useSearchComboBoxHelper';
import useComboboxQueryManager from '../hooks/queries/useComboboxQueryManager';
// import useCustomSearchQuery from '../hooks/queries/useCustomSearch';

const AdvancedSearchBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ComboBoxContainers = styled.div`
  display: flex;
  background-color: red;
  width: 100%;
  height: 100%;
  min-width
`;

const AdvancedSearch = styled.div`
  background-color: green;
  display: flex;
  width: 100%;
  height: 20px;
`;

const SearchBtn = styled.button`
  display: flex;
  width: 50px;
  height: 50px;
  align-self: center;
`;

const ResetBtn = styled.button`
  display: flex;
  width: 25px;
  height: 25px;
  align-self: center;
`;

const AdvancedSearchBlock = ({
  isOpen,
  setIsOpen,
  advanceQueryParameters,
  setAdvanceQueryParameters,
  onClickSearch,
}) => {
  const [createUpdatePayload] = useSearchComboBoxHelper();
  const [nameQueryString, setNameQueryString] = useState('');
  const [mainLinksQueryString, setMainLinksQueryString] = useState('');
  const [briefDescriptionQueryString, setBriefDescriptionQueryString] = useState('');
  const [leaderQueryString, setLeaderQueryString] = useState('');

  const [nameOptions] = useComboboxQueryManager('name', nameQueryString);
  const [mainLinksOptions] = useComboboxQueryManager('mainLinks', mainLinksQueryString);
  const [briefDescriptionOptions] = useComboboxQueryManager('briefDescription', briefDescriptionQueryString);
  const [leaderOptions] = useComboboxQueryManager('leader', leaderQueryString);

  const onClickRefresh = () => {
    setAdvanceQueryParameters('');
  };

  const handleOnClickOption = (option, ofType) => {
    setAdvanceQueryParameters(createUpdatePayload(ofType, advanceQueryParameters, option));
  };

  const handleDeleteChoice = (choiceToRemove, ofType) => {
    const { [ofType]: ofThisType, ...typesWithoutThis } = advanceQueryParameters;

    const updateChoicesInField = () => ofThisType.filter(
      (choice) => choice !== choiceToRemove,
    );

    const updatedFields = (ofThisType.length === 1)
      ? { ...typesWithoutThis }
      : { ...typesWithoutThis, [ofType]: updateChoicesInField() };

    setAdvanceQueryParameters(updatedFields);
  };

  return (
    <AdvancedSearchBlockContainer>
      <AdvancedSearch
        aria-label="Advanced Search"
        onClick={() => setIsOpen(!isOpen)}
      >
        Advanced Search
      </AdvancedSearch>
      {isOpen && (
        <ComboBoxContainers>
          <SearchComboBox
            ofType="tags"
            chosenValues={advanceQueryParameters.tags}
            onClickOption={handleOnClickOption}
            onDeletingChoice={handleDeleteChoice}
            shouldDisplayChosenValues
          />

          <SearchComboBox
            ofType="type"
            chosenValues={advanceQueryParameters.type}
            onClickOption={handleOnClickOption}
            onDeletingChoice={handleDeleteChoice}
            shouldDisplayChosenValues
          />

          <SearchComboBox
            ofType="name"
            options={nameOptions}
            chosenValues={advanceQueryParameters.name}
            onClickOption={handleOnClickOption}
            onDeletingChoice={handleDeleteChoice}
            shouldDisplayChosenValues
            queryString={nameQueryString}
            onChange={setNameQueryString}
          />

          <SearchComboBox
            ofType="mainLinks"
            options={mainLinksOptions}
            chosenValues={advanceQueryParameters.mainLinks}
            onClickOption={handleOnClickOption}
            onDeletingChoice={handleDeleteChoice}
            shouldDisplayChosenValues
            queryString={mainLinksQueryString}
            onChange={setMainLinksQueryString}
          />

          <SearchComboBox
            ofType="briefDescription"
            options={briefDescriptionOptions}
            chosenValues={advanceQueryParameters.briefDescription}
            onClickOption={handleOnClickOption}
            onDeletingChoice={handleDeleteChoice}
            shouldDisplayChosenValues
            queryString={briefDescriptionQueryString}
            onChange={setBriefDescriptionQueryString}
          />

          <SearchComboBox
            ofType="leader"
            options={leaderOptions}
            chosenValues={advanceQueryParameters.leader}
            onClickOption={handleOnClickOption}
            onDeletingChoice={handleDeleteChoice}
            shouldDisplayChosenValues
            queryString={leaderQueryString}
            onChange={setLeaderQueryString}
          />

          <SearchBtn onClick={onClickSearch} aria-label="Search" />
          <ResetBtn onClick={onClickRefresh} aria-label="Refresh"> {refreshIcon} </ResetBtn>
        </ComboBoxContainers>
      )}
    </AdvancedSearchBlockContainer>
  );
};

AdvancedSearchBlock.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func.isRequired,
  advanceQueryParameters: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.arrayOf(PropTypes.string),
    mainLinks: PropTypes.arrayOf(PropTypes.string),
    briefDescription: PropTypes.arrayOf(PropTypes.string),
    leader: PropTypes.arrayOf(PropTypes.string),
  }),
  setAdvanceQueryParameters: PropTypes.func.isRequired,
  onClickSearch: PropTypes.func.isRequired,
};

AdvancedSearchBlock.defaultProps = {
  isOpen: false,
  advanceQueryParameters: {},
};

export default AdvancedSearchBlock;
