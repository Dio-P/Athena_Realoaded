import styled from "@emotion/styled";
import BreadcrumbsMenu from "../components /BreadcrumbsMenu";
import SearchBar from "../components /SearchBar";

const MenuBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuBar = () => {
  return (
    <MenuBarContainer>
      hello from the menu bar
      <BreadcrumbsMenu/>
      <SearchBar/>
    </MenuBarContainer>
  )
};

export default MenuBar