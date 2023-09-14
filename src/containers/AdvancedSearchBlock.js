import styled from "@emotion/styled";
import SearchComboBox from "../components /SearchComboBox";
import { refreshIcon } from "../helpers/svgIcons";
import useCustomSearchQuery from "../hooks/queries/useCustomSearch";

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
    setAdvanceQueryParameters("");
  };

  console.log("inside advanced search block");
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
            key="tags"
            ofType="tags"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            key="name"
            ofType="name"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            key="type"
            ofType="type"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            key="mainLink"
            ofType="mainLink"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            key="briefDescription"
            ofType="briefDescription"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            key="leader"
            ofType="leader"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchBtn onClick={onClickSearch} aria-label="Search" />
          <ResetBtn onClick={onClickRefresh} aria-label="Refresh" > {refreshIcon} </ResetBtn>
        </ComboBoxContainers>
      )}
    </AdvancedSearchBlockContainer>
  );
};

export default AdvancedSearchBlock;
