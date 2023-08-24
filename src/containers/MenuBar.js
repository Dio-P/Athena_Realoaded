import styled from "@emotion/styled";
import BreadcrumbsMenu from "../components /BreadcrumbsMenu";
import SearchBar from "./SearchBar";

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
      <SearchBar searchEntity={searchEntity}/>
    </MenuBarContainer>
  )
};

export default MenuBar