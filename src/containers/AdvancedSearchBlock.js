import styled from "@emotion/styled";
import SearchComboBox from "../components /SearchComboBox";

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

const SearchButton = styled.button`
  display: flex;
  width: 50px;
  height: 50px;
  align-self: center;
`;

const AdvancedSearchBlock = ({
  isOpen,
  setIsOpen,
  advanceQueryParameters, 
  setAdvanceQueryParameters,
  onClickSearch,
}) => {


  return (
    <AdvancedSearchBlockContainer>
      <AdvancedSearch onClick={() => setIsOpen(!isOpen)}>
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
            ofType="mainLink"
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

          <SearchButton onClick={onClickSearch} /> 
        </ComboBoxContainers>

      )}
    </AdvancedSearchBlockContainer>
  );
};

export default AdvancedSearchBlock;
