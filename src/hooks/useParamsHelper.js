import { array } from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

// const MOCK_DEFAULT_STARTING_ENTITY_ID = "4";

const useParamsHelper = (paramsCustomObj, setParamsCustomObj) => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedEntityId, setDisplayedEntityId] = useState("4");

  const params = Object.fromEntries([...searchParams]);

  const paramNames = useMemo(() => Object.keys(paramsCustomObj), [paramsCustomObj]);
  const paramString = useMemo(() => (paramNames.length > 2)? paramNames.join("->"): paramNames[0],[paramNames]);

  useEffect(() => {
    if(paramsCustomObj) {
      console.log("paramString", paramString);
      setSearchParams(paramString);
      setDisplayedEntityId((Object.values(paramsCustomObj).pop()[0]));
    }
  }, [paramsCustomObj]);

  useEffect(() => {
    if(params) {
      console.log("params", params);
      // const latestParam = params.split("->").pop()[0];
      // const paramToBeDeleted= Object.values(paramsCustomObj).pop()[0];
      // setParamsCustomObj({...paramsCustomObj, [paramToBeDeleted]: undefined})
      // setDisplayedEntityId(paramsCustomObj[latestParam]);

      // console.log("params", params);
      // const oldObjArray = Array.from(paramsCustomObj);
      // console.log("oldObjArray", oldObjArray);
      // const notNeeded = oldObjArray.pop()[0];
      // const allParams = params.split("->");
      // const {notNeeded, ...allParams} = paramsCustomObj
      // setParamsCustomObj({...allParams,})
      // setSearchParams(paramString);
      // setDisplayedEntityId(paramsCustomObj[latestParam]);
    }
  }, [params]);

  return {displayedEntityId }
};

export default useParamsHelper;