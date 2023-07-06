import './App.css';
import { useEffect } from 'react';
import useEntityByIdSearch from './hooks/queries/useEntityByIdSearch';
import MultiBtnComp from './components /MultiBtnComp';
import EntityComp from './components /EntityComp';

const MOCK_DEFAULT_STARTING_ENTITY_ID = "4";



function App() {

  const [returnedEntity, searchEntity] = useEntityByIdSearch();

  useEffect(() => {
   searchEntity(MOCK_DEFAULT_STARTING_ENTITY_ID)
  }, []);

  return (
    <div >
      {returnedEntity &&
      <div>
        the name of the entity is: {returnedEntity.name}

        <EntityComp entity={returnedEntity}/>

      </div>
      }
      Hello From the New Athena
    </div>
  );
}

export default App;
