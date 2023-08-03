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

const AdvancedSearchBlock = ({
  isOpen,
  setIsOpen,
  returnedTags,
  queryTags,
  tagsToSearchFor,
  setTagsToSearchFor,
  returnedNames,
  queryNames,
  nameToSearchFor,
  setNameToSearchFor,
}) => {
  return (
    <AdvancedSearchBlockContainer>
      <AdvancedSearch onClick={() => setIsOpen(!isOpen)}>
        Advanced Search
      </AdvancedSearch>
      {isOpen && (
        <ComboBoxContainers>
          <SearchComboBox
            data={returnedTags} //do I need that?
            searchFunction={queryTags}
            searchingFor="tags"
            value={tagsToSearchFor}
            setValue={setTagsToSearchFor}
            // onClickOption={}
            // freshlyAddedValue={}
            // preexistingData={}
          />

          <SearchComboBox
            data={returnedNames}
            searchFunction={queryNames}
            searchingFor="name"
            value={nameToSearchFor}
            setValue={setNameToSearchFor}
          />

          {/* <SearchComboBox
          data={returnedTags}
          searchFunction={queryTags}
          searchingFor="name"
          value={tagsToSearchFor}
          setValue={setTagsToSearchFor}
        /> */}
        </ComboBoxContainers>
      )}
    </AdvancedSearchBlockContainer>
  );
};

export default AdvancedSearchBlock;
