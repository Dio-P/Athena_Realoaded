import styled from "@emotion/styled";
import SearchComboBox from "../components /SearchComboBox";
import useFilterEntityByQueryString from "../hooks/queries/useFilterEntityByQueryString";
import useGetAllTags from "../hooks/queries/useGetAllTags";

const SearchBarContainer = styled.div`
  display: flex;
`;

const SearchParametersBar = () => {
  const { returnedEntities, filterEntities } = useFilterEntityByQueryString();
  const { returnedTags, getTags } = useGetAllTags();

  return (
    <SearchBarContainer>
      <SearchComboBox
        data={returnedEntities} //do I need that?
        searchFunction={filterEntities}
        searchingFor="Entity"
        // onClickOption={}
        // freshlyAddedValue={}
        // preexistingData={}
      />
      <SearchComboBox
        data={returnedTags} //do I need that?
        searchFunction={getTags}
        searchingFor="tags"
        // onClickOption={}
        // freshlyAddedValue={}
        // preexistingData={}
      />
    </SearchBarContainer>
  ) 
};

export default SearchParametersBar