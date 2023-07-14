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

  // useEffect(() => {
  //   if (paramsCustomObj) {
  //     console.log("paramsCustomObj", paramsCustomObj);
  //     const paramNames = Object.keys(paramsCustomObj);
  //     const paramString =
  //       paramNames.length >= 1 ? paramNames.join("->") : paramNames[0];
  //     console.log("paramString", paramString);
  //     setSearchParams({ ent: paramString });
  //     setDisplayedEntityId(Object.values(paramsCustomObj).pop());
  //   }
  // }, [paramsCustomObj]);

  // useEffect(() => {
  //   // this runs also when params are added.
  //   // maybe it would be better instead of deleting the last to always be getting the last
  //   if (params) {
  //     console.log("params", params);
  //     const latestParam = params.ent.split("->").pop();
  //     setDisplayedEntityId(paramsCustomObj[latestParam].id);
  //     const objKeyToBeDeleted = Object.keys(paramsCustomObj).pop();
  //     console.log("objKeyToBeDeleted", objKeyToBeDeleted);
  //     // setParamsCustomObj({...paramsCustomObj, [objKeyToBeDeleted]: undefined})
  //     // setDisplayedEntityId(paramsCustomObj[latestParam]);
  //   }
  // }, [params]);

  useEffect(() => {
    const latestParam = params.ent.split("->").pop();
    if(paramsCustomObj[latestParam]) {
      setDisplayedEntityId(paramsCustomObj[latestParam]);
    } else {
      console.log("param was not found in the obj")
    }
  }, [params])

  const createUpdatedParamsObjs = (updatedParamsNames, id) => {
    let newObj = {};
    updatedParamsNames.map(
      (name, index) =>
        (newObj = { ...newObj, [name]: { id, index, name } })
    );
    return newObj;
  };

  const getUpdatedParamsNames = (name, updatedParamsObjArray, isUserRenderingPreviousEntity) => {
    const updatedArray = updatedParamsObjArray.map(
      (paramObj) => paramObj.name
    );
    if(!isUserRenderingPreviousEntity){
      updatedArray.push(name);
    }
    return updatedArray
  };

  const renderChosenEntity = (entityName, entityId, paramsObj) => {
    // when breadcrumb element is clicked to delete all the following indexes from the box.
    // to delete all the params after the chosen one
    // recreate the new params box

    // is there a chance that the entity name will not be unique should I check for this?
    const isUserRenderingPreviousEntity =
      Object.values(paramsObj).includes(entityName);
    const oldParamsObjArray = Array.from(paramsObj);
    const chosenEntityIndex = isUserRenderingPreviousEntity
      ? paramsObj[entityName].index
      : oldParamsObjArray.length + 1;

    const updatedParamsObjArray = oldParamsObjArray.filter(
      (param) => !(param.index > chosenEntityIndex)
    );

    const updatedParamsNames = getUpdatedParamsNames(entityName, updatedParamsObjArray, isUserRenderingPreviousEntity )
  
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

  // const addNewEntity = (name, paramsObj) => {
  //   const updatedParamsObjs = createUpdatedParamsObjs(updatedParamsNames, paramsObj);
  //   // setParamsCustomObj(...paramsCustomObj, [entityName]: { id: newObj[entityName].id, index, name })
  // }

  // const renderChosenEntity = (entityName, paramsObj) => {
  //   // to handle everything around rendering a chosen element from breadcrump or by clicking on it.
  //   const isUserRenderingPreviousEntity = Object.values(paramsCustomObj).includes(entityName);

  //   addOrDellEntities(entityName, paramsObj);
  // if (isUserRenderingPreviousEntity) {
  //   // is there a chance that the entity name will not be unique should I check for this?
  //   addOrDellEntities(entityName, paramsObj)
  // } if (!isUserRenderingPreviousEntity) {
  //   addNewEntity(entityName, paramsObj)
  // }
  // }

  return { displayedEntityId, renderChosenEntity };
};

export default useParamsHelper;
