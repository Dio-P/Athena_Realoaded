import './App.css';
import { useEffect, useState } from 'react';
import useEntityByIdSearch from './hooks/queries/useEntityByIdSearch';
import MultiBtnComp from './components /MultiBtnComp';
import EntityComp from './components /EntityComp';
import useParamsHelper from './hooks/useParamsHelper';

const MOCK_DEFAULT_STARTING_ENTITY_ID = "4";



function App() {

  const [returnedEntity, searchEntity] = useEntityByIdSearch();

  const [paramsCustomObj, setParamsCustomObj] = useState({});
  useParamsHelper(paramsCustomObj)
  const [displayedEntity, setDisplayedEntity] = useState("");

  

  useEffect(() => {
   searchEntity(MOCK_DEFAULT_STARTING_ENTITY_ID);
  }, []);

  useEffect(() => {
    setDisplayedEntity(returnedEntity);
  }, [returnedEntity]);

  const changeEntity = (child) => {
    setDisplayedEntity(child) 
  }

  return (
    <div>
      {returnedEntity &&
        <EntityComp 
          entity={displayedEntity} 
          setDisplayedEntity={(child)=>changeEntity(child)}
          paramsCustomObj={paramsCustomObj}
          setParamsCustomObj={setParamsCustomObj}
        />
      }
    </div>
  );
}

export default App;
