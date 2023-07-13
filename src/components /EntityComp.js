import { useEffect } from "react";
import styled from "@emotion/styled";
import MultiBtnComp from "./MultiBtnComp";
import useChildrenByIdsSearch from "../hooks/queries/useChildrenByIdsSearch";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

const EntityContainer = styled.div`
  display: flex;
`;

const ThisEntityContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-direction: column;
  margin: 5px 15px 5px 15px;
  width: 100%

`;

const EntityInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 5px 10px 5px;
  padding: 10px;
`;

const EntityChildrenBox = styled.div`
  display: flex;
`;

const EntityComp = ({ entity, setDisplayedEntity, paramsCustomObj, setParamsCustomObj }) => {

  
  const [returnedChildren, searchChildren] = useChildrenByIdsSearch();

  useEffect(() => {
    if(entity?.name){
      setParamsCustomObj({...paramsCustomObj, [entity.name]: entity.id});
    }
     
  }, [entity]);

  useEffect(() => {
    if (entity?.children){
      searchChildren(entity.children);
    }
  }, [entity]);

  return (
    <EntityContainer>
      <ThisEntityContainer>
        <h1>{capitaliseFirstLetters(entity.name)}</h1>
        <EntityInfoBox>
          <label>
            description: 
          </label>
        {/* {editDescription? */}
        {/* <input value={entity.briefDescription}/> */}
        {/* : */}
          <div>
            {entity.briefDescription}
          </div>
        {/* } */}
        </EntityInfoBox>
      </ThisEntityContainer>

      {returnedChildren && 
      <EntityChildrenBox>
        {returnedChildren.map((childEntity) => (
            <MultiBtnComp
              label={childEntity.name}
              key={childEntity.name}
              onClickFunction={()=> setDisplayedEntity(childEntity)}
              // type={childEntity.type}
            />
          ))}
      </EntityChildrenBox>
        }

    </EntityContainer>
  ) 
};

export default EntityComp;