import { array } from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// const MOCK_DEFAULT_STARTING_ENTITY_ID = '4';

const useParamsHelper = (paramsCustomObj, setParamsCustomObj) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedEntityId, setDisplayedEntityId] = useState('');
  const [paramsUrl, setParamsUrl] = useState('');

  const params = Object.fromEntries([...searchParams]);

  useEffect(() => {
    if (paramsUrl) {
      setSearchParams({ ent: paramsUrl });
    }
  }, [paramsUrl]);

  const isInBreadcrumb = (entityName) => Object.keys(paramsCustomObj).includes(entityName);

  const createUpdatedParamsObjs = (updatedParamsNames, newEntId, paramsObj) => {
    console.log('paramsObj', paramsObj);
    let newObj = {};
    const getId = (name) => {
      console.log('isInBreadcrumb(name)', name, isInBreadcrumb(name));
      return isInBreadcrumb(name) ? paramsObj[name].id : newEntId;
    };

    updatedParamsNames.map((name, index) => 
    (newObj = { ...newObj, [name]: { id: getId(name), index, name } })
    );
    return newObj;
  };

  const getUpdatedParamsNames = (name, updatedParamsObjArray) => {
    const updatedArray = updatedParamsObjArray.map((paramObj) => paramObj.name);
    if (!isInBreadcrumb(name)) {
      updatedArray.push(name);
    }
    console.log(updatedArray);
    return updatedArray;
  };

  const renderChosenEntity = (entityName, entityId, paramsObj) => {
    // when breadcrumb element is clicked to delete all the following indexes from the box.
    // to delete all the params after the chosen one
    // recreate the new params box

    // is there a chance that the entity name will not be unique should I check for this?
    const oldParamsObjArray = Object.values(paramsObj);
    const chosenEntityIndex = isInBreadcrumb(entityName)
      ? paramsObj[entityName].index
      : oldParamsObjArray.length + 1;

    const updatedParamsObjArray = oldParamsObjArray.filter(
      (param) => !(param.index > chosenEntityIndex),
    );

    const updatedParamsNames = getUpdatedParamsNames(entityName, updatedParamsObjArray);
    const newParamsUrlString = updatedParamsNames.join('->');

    const updatedParamsObjs = createUpdatedParamsObjs(
      updatedParamsNames,
      entityId,
      paramsObj,
    );

    console.log('updatedParamsObjs', updatedParamsObjs);
    setParamsCustomObj(updatedParamsObjs);
    setParamsUrl(newParamsUrlString);
    console.log('about to setDisplayedEntityId to :', entityId);
    setDisplayedEntityId(entityId);
  };

  useEffect(() => {
    if (params.ent) {
      // console.log('params', params);
      const latestParam = params.ent.split('->').pop();
      // console.log('********latestParam', latestParam, paramsCustomObj[latestParam]);
      if (paramsCustomObj[latestParam]) {
        console.log('about to setDisplayedEntityId to :', paramsCustomObj, paramsCustomObj[latestParam].id);
        renderChosenEntity(latestParam, paramsCustomObj[latestParam].id, paramsCustomObj);
      } else {
        console.log('latestParam :', latestParam, 'was not found in the obj');
      }
    }
  }, [params.ent]);

  return { displayedEntityId, renderChosenEntity, setSearchParams };
};

export default useParamsHelper;
