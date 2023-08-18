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
  handleQuery,
  allFilteredResults,
  advanceQueryParameters, 
  setAdvanceQueryParameters,
  returnedTags,
  queryTags,
  tagsToSearchFor,
  setTagsToSearchFor,
  returnedNames,
  queryNames,
  nameToSearchFor,
  setNameToSearchFor,
  filteredTypes,
  filterTypes,
  typesToSearchFor,
  setTypesToSearchFor,
  filteredLinks,
  filterLinks,
  linksToSearchFor,
  setLinksToSearchFor,
  filteredBriefDescriptions,
  filterBriefDescriptions,
  briefDescriptionsToSearchFor,
  setBriefDescriptionsToSearchFor,
  filteredLeaders,
  filterLeaders,
  leadersToSearchFor,
  setLeadersToSearchFor,
}) => {

  const onClickSearch = () => {
    console.log("search was clicked");

  }

  return (
    <AdvancedSearchBlockContainer>
      <AdvancedSearch onClick={() => setIsOpen(!isOpen)}>
        Advanced Search
      </AdvancedSearch>
      {isOpen && (
        <ComboBoxContainers>
          <SearchComboBox
            // data={allFilteredResults}
            // searchFunction={handleQuery}
            ofType="tag"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            // data={allFilteredResults}
            // searchFunction={handleQuery}
            ofType="name"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            // data={allFilteredResults}
            // searchFunction={handleQuery}
            ofType="type"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            // data={allFilteredResults}
            // searchFunction={handleQuery}
            ofType="mainLink"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            // data={allFilteredResults}
            // searchFunction={handleQuery}
            ofType="briefDescription"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

          <SearchComboBox
            // data={allFilteredResults}
            // searchFunction={handleQuery}
            ofType="leader"
            chosenValues={advanceQueryParameters}
            onClickOption={setAdvanceQueryParameters}
          />

        <SearchButton
          onClick={onClickSearch}
        /> 

        </ComboBoxContainers>

      )}
    </AdvancedSearchBlockContainer>
  );
};

export default AdvancedSearchBlock;
