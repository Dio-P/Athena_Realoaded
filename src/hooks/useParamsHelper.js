import { array } from "prop-types";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const MOCK_TEST_PARAMS = encodeURIComponent(["cpub", "authoring", "optimo"].join("->"));

const useParamsHelper = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  useEffect(() => {
    setSearchParams(MOCK_TEST_PARAMS); 
  }, []);

};

export default useParamsHelper;