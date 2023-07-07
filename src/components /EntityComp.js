import { useEffect } from "react";
import styled from "@emotion/styled";
import MultiBtnComp from "./MultiBtnComp";
import useChildrenByIdsSearch from "../hooks/queries/useChildrenByIdsSearch";

const EntityContainer = styled.div`
  display: flex;
`;

const EntityComp = ({ entity }) => {

  const [returnedChildren, searchChildren] = useChildrenByIdsSearch();

  useEffect(() => {
    if (entity?.children){
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
          />
        ))}

    </EntityContainer>
  ) 
};

export default EntityComp;