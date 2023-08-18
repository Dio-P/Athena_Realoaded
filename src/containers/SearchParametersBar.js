import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import SearchComboBox from "../components /SearchComboBox";
import AdvancedSearchBlock from "./AdvancedSearchBlock";

import useFilterEntityByQueryString from "../hooks/queries/useFilterEntityByQueryString";
import AdvanceSearchResultsBox from "../components /AdvanceSearchResultsBox";

import useQueryTags from "../hooks/queries/useQueryTags";
import useQueryNames from "../hooks/queries/useQueryNames";
import useQueryAllTypes from "../hooks/queries/useQueryAllTypes";
import useGetAllLinks from "../hooks/queries/useGetAllLinks";
import useGetAllBriefDescriptions from "../hooks/queries/useGetAllBriefDescriptions";
import useGetAllLeaders from "../hooks/queries/useGetAllLeaders";
import useGetAllOfType from "../hooks/queries/useGetAllOfType";


import { DropDownWrapper } from "../components /specialElements";


const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// general search to return an entity without middle stages 
// advanced search to set the string or strings
// when advanced search is open general search is disabled and used only to display results
const SearchParametersBar = ({searchEntity}) => {
  const [isAdvancedSearchBlockOpen, setIsAdvancedSearchBlockOpen] = useState(false);
  // const [allFilteredResults, setAllFilteredResults] = useState("");
  const [advanceQueryParameters, setAdvanceQueryParameters] = useState("");

  // const { filteredResults, handleQuery } = useGetAllOfType();

  // useEffect(() => {
  //   console.log('filteredResults@@', filteredResults);
  //   setAllFilteredResults({...allFilteredResults, ...filteredResults}) 
  // }, [filteredResults]);

  const { returnedEntities, filterEntities } = useFilterEntityByQueryString();
  // const {filteredTypes, filterTypes} = useQueryAllTypes();
  // const { filteredLinks, filterLinks } = useGetAllLinks();
  // const { filteredBriefDescriptions, filterBriefDescriptions } = useGetAllBriefDescriptions();
  // const { filteredLeaders, filterLeaders } = useGetAllLeaders();

  // const { returnedNames, queryNames } = useQueryNames();
  // const { returnedTags, queryTags } = useQueryTags();

  const [entityToGet, setEntityToGet] = useState("");

  // const [nameToSearchFor, setNameToSearchFor] = useState(""); //somewhere the logic that turns this into an empty array is repeated
  // const [tagsToSearchFor, setTagsToSearchFor] = useState(""); // is this working well with multiple tags?
  // const [typesToSearchFor, setTypesToSearchFor] = useState(""); // is this working well with multiple tags?
  // const [linksToSearchFor, setLinksToSearchFor] = useState(""); // is this working well with multiple tags?
  // const [briefDescriptionsToSearchFor, setBriefDescriptionsToSearchFor] = useState(""); // is this working well with multiple tags?
  // const [leadersToSearchFor, setLeadersToSearchFor] = useState(""); // is this working well with multiple tags?

  return (
    <SearchBarContainer>

      <AdvancedSearchBlock
        isOpen={isAdvancedSearchBlockOpen}
        setIsOpen={setIsAdvancedSearchBlockOpen}
        // handleQuery={handleQuery}
        advanceQueryParameters={advanceQueryParameters}
        setAdvanceQueryParameters={setAdvanceQueryParameters}
        // allFilteredResults={allFilteredResults}
        // returnedTags={returnedTags}
        // queryTags={queryTags}
        // tagsToSearchFor={tagsToSearchFor}
        // setTagsToSearchFor={setTagsToSearchFor}
        // returnedNames={returnedNames}
        // queryNames={queryNames}
        // searchName={nameToSearchFor}
        // setNameToSearchFor={setNameToSearchFor}
        // filteredTypes={filteredTypes}
        // filterTypes={filterTypes}
        // typesToSearchFor={typesToSearchFor} 
        // setTypesToSearchFor={setTypesToSearchFor}
        // filteredLinks={filteredLinks}
        // filterLinks={filterLinks}
        // linksToSearchFor={linksToSearchFor}
        // setLinksToSearchFor={setLinksToSearchFor}
        // filteredBriefDescriptions={filteredBriefDescriptions}
        // filterBriefDescriptions={filterBriefDescriptions}
        // briefDescriptionsToSearchFor={briefDescriptionsToSearchFor}
        // setBriefDescriptionsToSearchFor={setBriefDescriptionsToSearchFor}
        // filteredLeaders={filteredLeaders}
        // filterLeaders={filterLeaders}
        // leadersToSearchFor={leadersToSearchFor}
        // setLeadersToSearchFor={setLeadersToSearchFor}
      />

      <SearchComboBox
        data={returnedEntities}
        searchFunction={filterEntities}
        searchingFor="Entity"
        chosenValues={entityToGet}
        setValue={setEntityToGet}
      />
      <AdvanceSearchResultsBox
        advanceSearchResults={returnedEntities}
        onClickOption={searchEntity}
        
      />

    </SearchBarContainer>
  ) 
};

export default SearchParametersBar