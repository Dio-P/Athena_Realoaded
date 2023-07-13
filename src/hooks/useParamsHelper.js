import { array } from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

// const MOCK_DEFAULT_STARTING_ENTITY_ID = "4";

const useParamsHelper = (paramsCustomObj) => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedEntityId, setDisplayedEntityId] = useState("4");

  const params = Object.fromEntries([...searchParams]);
  const paramNames = useMemo(() => Object.keys(paramsCustomObj), [paramsCustomObj]);
  const paramString = useMemo(() => (paramNames.length > 1)? paramNames.join("->"): paramNames[0],[paramNames]);

  useEffect(() => {
    console.log("paramNames", paramNames); 
    console.log("paramNames.length > 1", paramNames.length > 1, paramNames[0]); 
  }, [paramNames]);

  useEffect(() => {
    if(paramsCustomObj) {
      console.log("paramsCustomObj", paramsCustomObj);
      console.log("paramString", paramString);
      setSearchParams(paramString);
      console.log("Object.values(paramsCustomObj)[-1]", Object.values(paramsCustomObj));
      console.log("paramsCustomObj", paramsCustomObj);
      setDisplayedEntityId((Object.values(paramsCustomObj).pop()[0]) || "4");
    }
  }, [paramsCustomObj]);

  useEffect(() => {
    console.log("params", params); 
  }, [params]);

  useEffect(() => {
    console.log("displayedEntityId", displayedEntityId); 
  }, [displayedEntityId]);

  return {displayedEntityId}
};

export default useParamsHelper;