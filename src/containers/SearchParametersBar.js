import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import SearchComboBox from "../components /SearchComboBox";
import AdvancedSearchBlock from "./AdvancedSearchBlock";

import useFilterEntityByQueryString from "../hooks/queries/useFilterEntityByQueryString";
import AdvanceSearchResultsBox from "../components /AdvanceSearchResultsBox";
import useCustomSearchQuery from "../hooks/queries/useCustomSearch";


const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// general search to return an entity without middle stages 
// advanced search to set the string or strings
// when advanced search is open general search is disabled and used only to display results
const SearchParametersBar = ({searchEntity}) => {
  const [isAdvancedSearchBlockOpen, setIsAdvancedSearchBlockOpen] = useState(false);
  const [advanceQueryParameters, setAdvanceQueryParameters] = useState("");
  const { returnedEntities, filterEntities } = useFilterEntityByQueryString();
  // here should go the query that will trigger the advance search.
  
  const [entityToGet, setEntityToGet] = useState("");

  const {returnedEntities: returnedAdvancedSearchOptions, trigerAdvancedSearch} = useCustomSearchQuery();
  // Should I move advance query parameters state in here ?

  const onClickSearch = () => {
    console.log('advanceQueryParameters', advanceQueryParameters);
    trigerAdvancedSearch(advanceQueryParameters); 
  }

  return (
    <SearchBarContainer>

      <AdvancedSearchBlock
        isOpen={isAdvancedSearchBlockOpen}
        setIsOpen={setIsAdvancedSearchBlockOpen}
        advanceQueryParameters={advanceQueryParameters}
        setAdvanceQueryParameters={setAdvanceQueryParameters}
        onClickSearch={onClickSearch} 
      />

      {!isAdvancedSearchBlockOpen?
        <SearchComboBox
          data={returnedEntities}
          searchFunction={filterEntities}
          searchingFor="Entity"
          chosenValues={entityToGet}
          setValue={setEntityToGet}
        />
      :
        <AdvanceSearchResultsBox
          advanceSearchResults={returnedAdvancedSearchOptions}
          onClickOption={searchEntity}
        />
      }
    </SearchBarContainer>
  ) 
};

export default SearchParametersBar