// import "./App.css";

import React, { useEffect, useState } from 'react';
import useEntityByIdSearch from './hooks/queries/useEntityByIdSearch';
import Entity from './components /Entity';
import useParamsHelper from './hooks/useParamsHelper';
import MenuBar from './containers/MenuBar';

const firstRender = {
  cPub: { id: '4', index: 1, name: 'cPub' },
};

function App() {
  const [paramsCustomObj, setParamsCustomObj] = useState(firstRender);
  const [returnedEntity, searchEntity] = useEntityByIdSearch();

  const {
    displayedEntityId, renderChosenEntity, setSearchParams,
  } = useParamsHelper(paramsCustomObj, setParamsCustomObj);

  const [displayedEntity, setDisplayedEntity] = useState('');

  // this needs to go when we stop mocking
  useEffect(() => {
    setSearchParams({ ent: 'cPub' });
  }, []);

  useEffect(() => {
    if (displayedEntityId) {
      searchEntity(displayedEntityId);
    }
  }, [displayedEntityId]);

  useEffect(() => {
    setDisplayedEntity(returnedEntity);
  }, [returnedEntity]);

  return (
    <div>
      <MenuBar
        paramsCustomObj={paramsCustomObj}
        renderChosenEntity={renderChosenEntity}
        searchEntity={searchEntity}
      />
      {returnedEntity && (
        <Entity
          entity={displayedEntity}
          setDisplayedEntity={(child) => setDisplayedEntity(child)}
          paramsCustomObj={paramsCustomObj}
          renderChosenEntity={renderChosenEntity}
        />
      )}
    </div>
  );
}

export default App;
