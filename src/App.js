import "./App.css";
import { useEffect, useState } from "react";
import useEntityByIdSearch from "./hooks/queries/useEntityByIdSearch";
import MultiBtnComp from "./components /MultiBtnComp";
import EntityComp from "./components /EntityComp";
import useParamsHelper from "./hooks/useParamsHelper";
import MenuBar from "./containers/MenuBar";

function App() {
  const [returnedEntity, searchEntity] = useEntityByIdSearch();

  const [paramsCustomObj, setParamsCustomObj] = useState({
    cPub: { id: "4", index: 1, name: "cPub" },
  });
  const {
    displayedEntityId, renderChosenEntity, setSearchParams
  } = useParamsHelper(paramsCustomObj, setParamsCustomObj);
  const [displayedEntity, setDisplayedEntity] = useState("");
// this needs to go when we stop mocking
  useEffect(() => {
    setSearchParams({ent: "cPub"}) 
  }, []);
  // every time the params change this should rerun
  useEffect(() => {
    if (displayedEntityId) {
      console.log("displayedEntityId", displayedEntityId);
      searchEntity(displayedEntityId);
    }
  }, [displayedEntityId]);

  useEffect(() => {
    setDisplayedEntity(returnedEntity);
  }, [returnedEntity]);

  const changeEntity = (child) => {
    setDisplayedEntity(child);
  };

  return (
    <div>
      <MenuBar
        paramsCustomObj={paramsCustomObj}
      />
      {returnedEntity && (
        <EntityComp
          entity={displayedEntity}
          setDisplayedEntity={(child) => changeEntity(child)}
          paramsCustomObj={paramsCustomObj}
          renderChosenEntity={renderChosenEntity}
        />
      )}
    </div>
  );
}

export default App;
