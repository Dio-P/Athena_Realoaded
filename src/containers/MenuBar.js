import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import BreadcrumbsMenu from '../components /BreadcrumbsMenu';
import SearchBar from './SearchBar';

const MenuBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThemeToggle = styled.button`
  background-color: red;
  height: 25px;
  width: 25px;
`;

const MenuBar = ({
  paramsCustomObj,
  renderChosenEntity,
  searchEntity,
  theme,
  setTheme,
}) => (
  <MenuBarContainer aria-label="menu bar">
    <BreadcrumbsMenu
      paramsCustomObj={paramsCustomObj}
      renderChosenEntity={renderChosenEntity}
    />
    <ThemeToggle onClick={() => setTheme(
      theme === 'dark' ? 'light' : 'dark',
    )}
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
  theme: PropTypes.string,
  setTheme: PropTypes.func,
};

MenuBar.defaultProps = {
  paramsCustomObj: {},
  renderChosenEntity: () => {},
  searchEntity: () => {},
  theme: 'light',
  setTheme: () => {},
};

export default MenuBar;
