import styled from "@emotion/styled";
import SearchComboBox from "../components /SearchComboBox";

const AdvancedSearchBlockContainer = styled.div`
  display: flex;
  background-color: red;
  width: 10px;
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
    <AdvancedSearchBlockContainer onClick={() => setIsOpen(!isOpen)}>
      {isOpen && (
        <>
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
        </>
      )}
    </AdvancedSearchBlockContainer>
  );
};

export default AdvancedSearchBlock;
