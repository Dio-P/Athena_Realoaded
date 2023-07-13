import { useEffect } from "react";
import styled from "@emotion/styled";
import MultiBtnComp from "./MultiBtnComp";
import useChildrenByIdsSearch from "../hooks/queries/useChildrenByIdsSearch";

const EntityContainer = styled.div`
  display: flex;
`;

const EntityComp = ({ entity, setDisplayedEntity }) => {

  const [returnedChildren, searchChildren] = useChildrenByIdsSearch();

  useEffect(() => {
    if (entity?.children){
      console.log("inside search children", entity);
      console.log("returnedChildren", returnedChildren);
      searchChildren(entity.children);
    }
  }, [entity]);

  return (
    <EntityContainer>
      {returnedChildren && 
      returnedChildren.map((childEntity) => (
          <MultiBtnComp
            label={childEntity.name}
            key={childEntity.name}
            onClickFunction={()=> setDisplayedEntity(childEntity)}
          />
        ))}

    </EntityContainer>
  ) 
};

export default EntityComp;