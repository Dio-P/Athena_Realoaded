import { array } from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

// const MOCK_DEFAULT_STARTING_ENTITY_ID = "4";

const useParamsHelper = (paramsCustomObj, setParamsCustomObj) => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedEntityId, setDisplayedEntityId] = useState("4");

  const params = Object.fromEntries([...searchParams]);

  // const paramNames = useMemo(() => Object.keys(paramsCustomObj), [paramsCustomObj]);
  // const paramString = useMemo(() => (paramNames.length > 2)? paramNames.join("->"): paramNames[0],[paramNames]);

  useEffect(() => {
    if(paramsCustomObj) {
      console.log("paramsCustomObj", paramsCustomObj);
      const paramNames = Object.keys(paramsCustomObj);
      const paramString = (paramNames.length >= 1)? paramNames.join("->"): paramNames[0];
      console.log("paramString", paramString);
      setSearchParams({ent: paramString});
      setDisplayedEntityId((Object.values(paramsCustomObj).pop()));
    }
  }, [paramsCustomObj]);

  useEffect(() => {
    // this runs also when params are added.
    // maybe it would be better instead of deleting the last to always be getting the last
    if(params) {
      console.log("params", params);
      const latestParam = params.ent.includes("->")? params.ent.split("->").pop(): params.ent;
      const objKeyToBeDeleted= Object.keys(paramsCustomObj).pop();
      console.log("objKeyToBeDeleted", objKeyToBeDeleted);
      // setParamsCustomObj({...paramsCustomObj, [objKeyToBeDeleted]: undefined})
      // setDisplayedEntityId(paramsCustomObj[latestParam]);
    }
  }, [params]);

  return {displayedEntityId }
};

export default useParamsHelper;