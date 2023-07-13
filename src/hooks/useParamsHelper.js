import { array } from "prop-types";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useParamsHelper = (paramsCustomObj) => {
  
  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const paramString = useMemo(() => Object.keys(paramsCustomObj).join("->"),[paramsCustomObj]);

  useEffect(() => {
    console.log("paramString", paramString);
      setSearchParams(paramString); 
  }, [paramsCustomObj]);

};

export default useParamsHelper;