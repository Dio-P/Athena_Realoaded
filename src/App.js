// import "./App.css";

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ThemeContext from './context/ThemeContext';
import useEntityByIdSearch from './hooks/queries/useEntityByIdSearch';

import style from './styleVariables';
import Entity from './components /Entity';
import useParamsHelper from './hooks/useParamsHelper';
import MenuBar from './containers/MenuBar';

const AthenaContainer = styled.div`
  background-color: ${(props) => style.variables.backgroundColour[props.theme]};
  color: ${(props) => style.variables.typeColour[props.theme]};
  height:100vh;
`;

const firstRender = {
  cPub: { id: '4', index: 1, name: 'cPub' },
};

const App = () => {
  const [paramsCustomObj, setParamsCustomObj] = useState(firstRender);
  const [returnedEntity, searchEntity] = useEntityByIdSearch();

  const {
    displayedEntityId, renderChosenEntity, setSearchParams,
  } = useParamsHelper(paramsCustomObj, setParamsCustomObj);

  const [displayedEntity, setDisplayedEntity] = useState(undefined);
  const [theme, setTheme] = useState('light');

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
    <ThemeContext.Provider value={theme}>
      <AthenaContainer theme={theme}>
        <MenuBar
          paramsCustomObj={paramsCustomObj}
          renderChosenEntity={renderChosenEntity}
          searchEntity={searchEntity}
          theme={theme}
          setTheme={setTheme}
        />
        {returnedEntity && (
          <Entity
            entity={displayedEntity}
            setDisplayedEntity={(child) => setDisplayedEntity(child)}
            paramsCustomObj={paramsCustomObj}
            renderChosenEntity={renderChosenEntity}
            theme={theme}
          />
        )}
      </AthenaContainer>
    </ThemeContext.Provider>
  );
};

export default App;
