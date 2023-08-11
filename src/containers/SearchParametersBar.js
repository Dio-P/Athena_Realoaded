import { useState } from "react";
import styled from "@emotion/styled";

import SearchComboBox from "../components /SearchComboBox";
import AdvancedSearchBlock from "./AdvancedSearchBlock";

import useFilterEntityByQueryString from "../hooks/queries/useFilterEntityByQueryString";

import useQueryTags from "../hooks/queries/useQueryTags";
import useQueryNames from "../hooks/queries/useQueryNames";
import useQueryAllTypes from "../hooks/queries/useQueryAllTypes";

import { DropDownWrapper } from "../components /specialElements";


const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// general search to return an entity without middle stages 
// advanced search to set the string or strings
// when advanced search is open general search is disabled and used only to display results
const SearchParametersBar = () => {
  const [isAdvancedSearchBlockOpen, setIsAdvancedSearchBlockOpen] = useState(false);

  const { returnedEntities, filterEntities } = useFilterEntityByQueryString();
  const {filteredTypes, filterTypes} = useQueryAllTypes();

  const { returnedNames, queryNames } = useQueryNames();
  const { returnedTags, queryTags } = useQueryTags();

  const [entityToGet, setEntityToGet] = useState("");

  const [nameToSearchFor, setNameToSearchFor] = useState(""); //somewhere the logic that turns this into an empty array is repeated
  const [tagsToSearchFor, setTagsToSearchFor] = useState(""); // is this working well with multiple tags?
  const [typesToSearchFor, setTypesToSearchFor] = useState(""); // is this working well with multiple tags?

  return (
    <SearchBarContainer>

      <AdvancedSearchBlock
        isOpen={isAdvancedSearchBlockOpen}
        setIsOpen={setIsAdvancedSearchBlockOpen}
        returnedTags={returnedTags}
        queryTags={queryTags}
        tagsToSearchFor={tagsToSearchFor}
        setTagsToSearchFor={setTagsToSearchFor}
        returnedNames={returnedNames}
        queryNames={queryNames}
        searchName={nameToSearchFor}
        setNameToSearchFor={setNameToSearchFor}
        filteredTypes={filteredTypes}
        filterTypes={filterTypes}
        typesToSearchFor={typesToSearchFor} 
        setTypesToSearchFor={setTypesToSearchFor}
      />

      <SearchComboBox
        data={returnedEntities}
        searchFunction={filterEntities}
        searchingFor="Entity"
        value={entityToGet}
        setValue={setEntityToGet}
      />

    </SearchBarContainer>
  ) 
};

export default SearchParametersBar