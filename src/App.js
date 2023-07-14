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
  const { displayedEntityId } = useParamsHelper(
    paramsCustomObj,
    setParamsCustomObj
  );
  const [displayedEntity, setDisplayedEntity] = useState("");

  useEffect(() => {
    searchEntity(displayedEntityId);
  }, [displayedEntityId]);

  useEffect(() => {
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
          setParamsCustomObj={setParamsCustomObj}
        />
      )}
    </div>
  );
}

export default App;
