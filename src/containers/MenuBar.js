import styled from "@emotion/styled";
import BreadcrumbsMenu from "../components /BreadcrumbsMenu";
import SearchComboBox from "../components /SearchComboBox";
import useFilterEntityByQueryString from "../hooks/queries/useFilterEntityByQueryString";

const MenuBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuBar = ({ paramsCustomObj, renderChosenEntity }) => {

  const { returnedEntities, filterEntities } = useFilterEntityByQueryString();

  return (
    <MenuBarContainer>
      <BreadcrumbsMenu
        paramsCustomObj={paramsCustomObj}
        renderChosenEntity={renderChosenEntity}
      />
      <SearchComboBox
        data={returnedEntities} //do I need that?
        searchFunction={filterEntities}
        // onClickOption={}
        // freshlyAddedValue={}
        // preexistingData={}
      />
    </MenuBarContainer>
  )
};

export default MenuBar