import styled from "@emotion/styled";
import SearchComboBox from "../components /SearchComboBox";

const AdvancedSearchBlockContainer = styled.div`
  display: flex;
`;
const AdvancedSearchBlock = ({
  returnedTags,
  queryTags,
  tagsToSearchFor,
  setTagsToSearchFor,
  returnedNames,
  queryNames,
  nameToSearchFor,
  setNameToSearchFor
  
}) => {
  return (
    <AdvancedSearchBlockContainer>
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
        data={returnedEntitiesByName} //do I need that?
        searchFunction={filterEntities}
        searchingFor="Entity"
        value={searchName}
        setValue={setSearchName}
        // onClickOption={}
        // freshlyAddedValue={}
        // preexistingData={}
      />

      <SearchComboBox
        data={returnedTags}
        searchFunction={queryTags}
        searchingFor="name"
        value={tagsToSearchFor}
        setValue={setTagsToSearchFor}
      />
    </AdvancedSearchBlockContainer>
  );
};

export default AdvancedSearchBlock;
