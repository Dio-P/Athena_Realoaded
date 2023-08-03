import styled from "@emotion/styled";
import SearchComboBox from "../components /SearchComboBox";
import useFilterEntityByQueryString from "../hooks/queries/useFilterEntityByQueryString";

import useQueryTags from "../hooks/queries/useQueryTags";
import useQueryNames from "../hooks/queries/useQueryNames";

import AdvancedSearchBlock from "./AdvancedSearchBlock";
import { useState } from "react";

const SearchBarContainer = styled.div`
  display: flex;
`;

const SearchButton = styled.button`
display: flex;
`;

const SearchParametersBar = () => {
  const { returnedEntities, filterEntities } = useFilterEntityByQueryString();

  const { returnedNames, queryNames } = useQueryNames();
  const { returnedTags, queryTags } = useQueryTags();

  const [searchName, setSearchName] = useState("");

  const [nameToSearchFor, setNameToSearchFor] = useState("");
  const [tagsToSearchFor, setTagsToSearchFor] = useState(""); //could there be more than one tags?

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

      <AdvancedSearchBlock
        returnedTags={returnedTags}
        getTags={queryTags}
        tagsToSearchFor={tagsToSearchFor}
        setTagsToSearchFor={setTagsToSearchFor}
        returnedNames={returnedNames}
        queryNames={queryNames}
        searchName={nameToSearchFor}
        setNameToSearchFor={setNameToSearchFor}
      />
      
      <SearchButton
        onClick={onClickSearch}
      /> 
      {/* it would be nice if instead of search button the query could be triggering on typing name, or both. */}
    </SearchBarContainer>
  ) 
};

export default SearchParametersBar