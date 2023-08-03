import { useState } from "react";
import styled from "@emotion/styled";

import SearchComboBox from "../components /SearchComboBox";
import AdvancedSearchBlock from "./AdvancedSearchBlock";

import useFilterEntityByQueryString from "../hooks/queries/useFilterEntityByQueryString";

import useQueryTags from "../hooks/queries/useQueryTags";
import useQueryNames from "../hooks/queries/useQueryNames";

import { DropDownWrapper } from "../components /specialElements";


const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchButton = styled.button`
display: flex;
`;

// general search to return an entity without middle stages 
// advanced search to set the string or strings
// when advanced search is open general search is disabled and used only to display results
const SearchParametersBar = () => {
  const [isAdvancedSearchBlockOpen, setIsAdvancedSearchBlockOpen] = useState(false);

  const { returnedEntities, filterEntities } = useFilterEntityByQueryString();

  const { returnedNames, queryNames } = useQueryNames();
  const { returnedTags, queryTags } = useQueryTags();

  const [entityToGet, setEntityToGet] = useState([]);

  const [nameToSearchFor, setNameToSearchFor] = useState([]);
  const [tagsToSearchFor, setTagsToSearchFor] = useState([]); // is this working well with multiple tags?

  const onClickSearch = () => {
    console.log("search was clicked");

  }

  return (
    <SearchBarContainer>
      <SearchComboBox
        data={returnedEntities} //do I need that?
        searchFunction={filterEntities}
        searchingFor="Entity"
        value={entityToGet}
        setValue={setEntityToGet}
        // onClickOption={}
        // freshlyAddedValue={}
        // preexistingData={}
      />

      <AdvancedSearchBlock
          isOpen={isAdvancedSearchBlockOpen}
          setIsOpen={setIsAdvancedSearchBlockOpen}
          returnedTags={returnedTags}
          getTags={queryTags}
          tagsToSearchFor={tagsToSearchFor}
          setTagsToSearchFor={setTagsToSearchFor}
          returnedNames={returnedNames}
          queryNames={queryNames}
          searchName={nameToSearchFor}
          setNameToSearchFor={setNameToSearchFor}
        />
      {/* <AdvancedSearchBlock
        returnedTags={returnedTags}
        getTags={queryTags}
        tagsToSearchFor={tagsToSearchFor}
        setTagsToSearchFor={setTagsToSearchFor}
        returnedNames={returnedNames}
        queryNames={queryNames}
        searchName={nameToSearchFor}
        setNameToSearchFor={setNameToSearchFor}
      /> */}
      {/* it would be nice if instead of search button the query could be triggering on typing name, or both. */}
    </SearchBarContainer>
  ) 
};

export default SearchParametersBar