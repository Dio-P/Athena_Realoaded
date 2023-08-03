import styled from "@emotion/styled";
import SearchComboBox from "../components /SearchComboBox";
import useFilterEntityByQueryString from "../hooks/queries/useFilterEntityByQueryString";
import useGetAllTags from "../hooks/queries/useGetAllTags";
import { useState } from "react";

const SearchBarContainer = styled.div`
  display: flex;
`;

const SearchButton = styled.button`
display: flex;
`;

const SearchParametersBar = () => {
  const { returnedEntities, filterEntities } = useFilterEntityByQueryString();
  const { returnedTags, getTags } = useGetAllTags();

  const [searchName, setSearchName] = useState("");
  const [searchTags, setSearchTags] = useState(""); //could there be more than one tags?

  const onClickSearch = () => {
    console.log("search was clicked");

  }

  return (
    <SearchBarContainer>
      <SearchComboBox
        data={returnedEntities} //do I need that?
        searchFunction={filterEntities}
        searchingFor="Entity"
        value={searchName}
        setValue={setSearchName}
        // onClickOption={}
        // freshlyAddedValue={}
        // preexistingData={}
      />
      <SearchComboBox
        data={returnedTags} //do I need that?
        searchFunction={getTags}
        searchingFor="tags"
        value={searchTags}
        setValue={setSearchTags}
        // onClickOption={}
        // freshlyAddedValue={}
        // preexistingData={}
      />
      <SearchButton
        onClick={onClickSearch}
      /> 
      {/* it would be nice if instead of search button the query could be triggering on typing name, or both. */}
    </SearchBarContainer>
  ) 
};

export default SearchParametersBar