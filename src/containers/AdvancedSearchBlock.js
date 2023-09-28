import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import SearchComboBox from '../components /SearchComboBox';
import { refreshIcon } from '../helpers/svgIcons';
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
  const onClickRefresh = () => {
    setAdvanceQueryParameters('');
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
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            ofType="name"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            ofType="type"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            ofType="mainLinks"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            ofType="briefDescription"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            ofType="leader"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
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
