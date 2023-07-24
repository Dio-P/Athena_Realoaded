import styled from "@emotion/styled";
import BreadcrumbsMenu from "../components /BreadcrumbsMenu";
import SearchComboBox from "../components /SearchComboBox";

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
      <SearchComboBox
        // data={} //do I need that?
        onClickOption={}
        freshlyAddedValue={}
        preexistingData={}
      />
    </MenuBarContainer>
  )
};

export default MenuBar