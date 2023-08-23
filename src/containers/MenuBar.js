import styled from "@emotion/styled";
import BreadcrumbsMenu from "../components /BreadcrumbsMenu";
import SearchParametersBar from "./SearchParametersBar";

const MenuBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuBar = ({ paramsCustomObj, renderChosenEntity, searchEntity }) => {

  return (
    <MenuBarContainer aria-label="menu bar" >
      <BreadcrumbsMenu
        paramsCustomObj={paramsCustomObj}
        renderChosenEntity={renderChosenEntity}
      />
      <SearchParametersBar searchEntity={searchEntity}/>
    </MenuBarContainer>
  )
};

export default MenuBar