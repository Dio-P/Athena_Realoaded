import styled from "@emotion/styled";
import MultiBtnComp from "./MultiBtnComp";

const EntityContainer = styled.div`
  display: flex;
`;

const EntityComp = ({ entity }) => {
  return (
    <EntityContainer>
      {entity.children.map((childEntity) => (
          <MultiBtnComp
            label={childEntity.name}
            key={childEntity.name}
          />
        ))}

    </EntityContainer>
  ) 
};

export default EntityComp;