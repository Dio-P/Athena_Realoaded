import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { warningIcon } from '../helpers/svgIcons';
// import styleVariables from '../styleVariables';

const WarningElementWrapper = styled.div`
  color: red;
  margin: 5px 20px 8px;
  display: flex;
  flex-flow: row wrap;
`;

const WarningHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WarningIconContainer = styled.div`
  height: 20px;
  width: 20px;
`;

const Overlay = styled.div`
  opacity: 0.9;
  background-color: #686B6E;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  position: fixed;
`;

export const WarningElement = ({ info }) => (
  <WarningElementWrapper>
    <WarningHeaderContainer>
      <WarningIconContainer>
        {warningIcon}
      </WarningIconContainer>
      <strong>Warning: </strong>
    </WarningHeaderContainer>
    {` ${info}`}
  </WarningElementWrapper>
);

export const OverlayElem = () => (
  <Overlay />
);

// const SearchBarWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   width: 200px;
//   margin-bottom: 3px;
// `;

// const MagnifyingGlassIconWrapper = styled.div`
//   width: 23px;
//   height: 23px;
//   padding: 3px;
// `;

// const SearchInput = styled.input`
// width: 100%;
// margin-right: 3px;
// border-radius: ${styleVariables.borderRadious.main};
// `;

// export const SearchBar = ({ searchingQuery, search }) => (
//   <SearchBarWrapper>
//     <MagnifyingGlassIconWrapper>{magnifyingGlassIcon}</MagnifyingGlassIconWrapper>
//     <SearchInput
//       type="text"
//       name="dropDownSearch"
//       value={searchingQuery}
//       onChange={search}
//     />
//   </SearchBarWrapper>
// );

// export const DropDownWrapper = ({Component, isOpen, setIsOpen}) => (
//   <DropDownWrapperContainer onClick={() => setIsOpen(false)}>
//     { isOpen &&
//       <Component/>
//     }
//   </DropDownWrapperContainer>
// );

WarningElement.propTypes = {
  info: PropTypes.string.isRequired,
};
