import styled from "@emotion/styled";
import BreadcrumbsMenu from "../components /BreadcrumbsMenu";
import SearchParametersBar from "./SearchParametersBar";

const MenuBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuBar = ({ paramsCustomObj, renderChosenEntity }) => {

  return (
    <MenuBarContainer>
      <BreadcrumbsMenu
        paramsCustomObj={paramsCustomObj}
        renderChosenEntity={renderChosenEntity}
      />
      <SearchParametersBar/>
    </MenuBarContainer>
  )
};

export default MenuBar