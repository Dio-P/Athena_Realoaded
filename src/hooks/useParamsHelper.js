import { array } from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

// const MOCK_DEFAULT_STARTING_ENTITY_ID = "4";

const useParamsHelper = (paramsCustomObj, setParamsCustomObj) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedEntityId, setDisplayedEntityId] = useState("4");

  const params = Object.fromEntries([...searchParams]);

  useEffect(() => {
    if(params.ent){
      console.log("params", params);
      const latestParam = params.ent.split("->").pop();
      if(paramsCustomObj[latestParam]) {
        setDisplayedEntityId(paramsCustomObj[latestParam]);
      } else {
        console.log("paramsCustomObj", paramsCustomObj);
        console.log("latestParam :", latestParam, "was not found in the obj");
      }
    }
  }, [params.ent])

  const createUpdatedParamsObjs = (updatedParamsNames, id) => {
    let newObj = {};
    updatedParamsNames.map(
      (name, index) =>
        (newObj = { ...newObj, [name]: { id, index, name } })
    );
    return newObj;
  };

  const getUpdatedParamsNames = (name, updatedParamsObjArray, isUserRenderingPreviousEntity) => {
    const updatedArray = updatedParamsObjArray.map((paramObj) => 
      paramObj.name
    );
    if(!isUserRenderingPreviousEntity){
      updatedArray.push(name);
    }
    console.log(updatedArray);
    return updatedArray
  };

  const renderChosenEntity = (entityName, entityId, paramsObj) => {
    // when breadcrumb element is clicked to delete all the following indexes from the box.
    // to delete all the params after the chosen one
    // recreate the new params box

    // is there a chance that the entity name will not be unique should I check for this?
    console.log("inside renderChosenEntity");
    const isUserRenderingPreviousEntity =
      Object.values(paramsObj).includes(entityName);
    console.log("paramsObj", paramsObj);
    const oldParamsObjArray = Object.values(paramsObj);
    const chosenEntityIndex = isUserRenderingPreviousEntity
      ? paramsObj[entityName].index
      : oldParamsObjArray.length + 1;

      console.log("oldParamsObjArray", oldParamsObjArray);
    const updatedParamsObjArray = oldParamsObjArray.filter(
      (param) => !(param.index > chosenEntityIndex)
    );

    const updatedParamsNames = getUpdatedParamsNames(entityName, updatedParamsObjArray, isUserRenderingPreviousEntity )
      console.log("updatedParamsNames", updatedParamsNames);
    const newParamsUrlString = updatedParamsNames.join("->");
    console.log("newParamsUrlString", newParamsUrlString);
    const updatedParamsObjs = createUpdatedParamsObjs(
      updatedParamsNames,
      entityId
    );

    console.log("updatedParamsObjs", updatedParamsObjs);
    setParamsCustomObj(updatedParamsObjs);
    setSearchParams({ ent: newParamsUrlString });
  };

  return { displayedEntityId, renderChosenEntity, setSearchParams };
};

export default useParamsHelper;
