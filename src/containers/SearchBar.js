import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import SearchComboBox from '../components /SearchComboBox';
import AdvancedSearchBlock from './AdvancedSearchBlock';

// import useFilterEntityByQueryString from '../hooks/queries/useFilterEntityByQueryString';
import AdvanceSearchResultsBox from '../components /AdvanceSearchResultsBox';
import useCustomSearchQuery from '../hooks/queries/useCustomSearch';

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// general search to return an entity without middle stages
// advanced search to set the string or strings
// when advanced search is open general search is disabled and used only to display results
const SearchBar = ({ searchEntity }) => {
  const [isAdvancedSearchBlockOpen, setIsAdvancedSearchBlockOpen] = useState(false);
  const [advanceQueryParameters, setAdvanceQueryParameters] = useState(undefined);
  // const { returnedEntities, filterEntities } = useFilterEntityByQueryString();
  // here should go the query that will trigger the advance search.

  // const [entityToGet, setEntityToGet] = useState(undefined);

  const {
    returnedEntities: returnedAdvancedSearchOptions,
    trigerAdvancedSearch,
  } = useCustomSearchQuery();
  // Should I move advance query parameters state in here ?

  useEffect(() => {
    console.log('advanceQueryParameters***', advanceQueryParameters);
  }, [advanceQueryParameters]);
  const onClickSearch = () => {
    console.log('advanceQueryParameters', advanceQueryParameters);
    trigerAdvancedSearch(advanceQueryParameters);
  };

  return (
    <SearchBarContainer aria-label="Search Bar">

      <AdvancedSearchBlock
        isOpen={isAdvancedSearchBlockOpen}
        setIsOpen={setIsAdvancedSearchBlockOpen}
        advanceQueryParameters={advanceQueryParameters}
        setAdvanceQueryParameters={setAdvanceQueryParameters}
        onClickSearch={onClickSearch}
      />

      {!isAdvancedSearchBlockOpen
        ? (
          <SearchComboBox
            ofType="entity"
            // chosenValues={entityToGet}
            onClickOption={searchEntity}
          />
        ) : (
          <AdvanceSearchResultsBox
            advanceSearchResults={returnedAdvancedSearchOptions}
            onClickOption={searchEntity}
          />
        )}
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  searchEntity: PropTypes.func,
};

SearchBar.defaultProps = {
  searchEntity: () => {},
};

export default SearchBar;
