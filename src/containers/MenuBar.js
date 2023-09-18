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
  renderChosenEntity: PropTypes.func.isRequired,
  searchEntity: PropTypes.func.isRequired,
};

MenuBar.defaultProps = {
  paramsCustomObj: {},
};

export default MenuBar;
