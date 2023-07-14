import "./App.css";
import { useEffect, useState } from "react";
import useEntityByIdSearch from "./hooks/queries/useEntityByIdSearch";
import MultiBtnComp from "./components /MultiBtnComp";
import EntityComp from "./components /EntityComp";
import useParamsHelper from "./hooks/useParamsHelper";

function App() {
  const [returnedEntity, searchEntity] = useEntityByIdSearch();

  const [paramsCustomObj, setParamsCustomObj] = useState({
    cPub: { id: "4", index: 1, name: "cPub" },
  });
  const {
    displayedEntityId, renderChosenEntity
  } = useParamsHelper(paramsCustomObj, setParamsCustomObj);
  const [displayedEntity, setDisplayedEntity] = useState("");

  // every time the params change this should rerun
  useEffect(() => {
    console.log("search is about to happen");
    searchEntity(displayedEntityId);
  }, [displayedEntityId]);

  useEffect(() => {
    console.log("DisplayedEntity is about to be set");
    console.log("returnedEntity", returnedEntity);
    setDisplayedEntity(returnedEntity);
  }, [returnedEntity]);

  const changeEntity = (child) => {
    setDisplayedEntity(child);
  };

  return (
    <div>
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
