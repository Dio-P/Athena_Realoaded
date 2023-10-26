import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import BreadcrumbsMenu from '../components /BreadcrumbsMenu';
import SearchBar from './SearchBar';

const MenuBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuBar = ({
  paramsCustomObj,
  renderChosenEntity,
  searchEntity,
  // theme,
  // setTheme,
}) => (
  <MenuBarContainer aria-label="menu bar">
    <BreadcrumbsMenu
      paramsCustomObj={paramsCustomObj}
      renderChosenEntity={renderChosenEntity}
    />
    <SearchBar searchEntity={searchEntity} />
  </MenuBarContainer>
);

MenuBar.propTypes = {
  paramsCustomObj: PropTypes.shape({
    cPub: PropTypes.shape({
      id: PropTypes.string,
      index: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  renderChosenEntity: PropTypes.func,
  searchEntity: PropTypes.func,
};

MenuBar.defaultProps = {
  paramsCustomObj: {},
  renderChosenEntity: () => {},
  searchEntity: () => {},
};

export default MenuBar;
