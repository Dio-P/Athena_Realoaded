import styled from "@emotion/styled";
import BreadcrumbsMenu from "../components /BreadcrumbsMenu";
import SearchBar from "../components /SearchBar";

const MenuBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuBar = ({ paramsCustomObj, renderChosenEntity }) => {
  return (
    <MenuBarContainer>
      hello from the menu bar
      <BreadcrumbsMenu
        paramsCustomObj={paramsCustomObj}
        renderChosenEntity={renderChosenEntity}
      />
      <SearchBar/>
    </MenuBarContainer>
  )
};

export default MenuBar