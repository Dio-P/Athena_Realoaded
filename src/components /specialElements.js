import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { warningIcon, magnifyingGlassIcon } from '../helpers/svgIcons';
import style from '../styleVariables';

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  margin-bottom: 3px;
`;

const MagnifyingGlassIconWrapper = styled.div`
  width: 23px;
  height: 23px;
  padding: 3px;
`;

const CustomSearchInput = styled.input`
width: 100%;
margin-right: 3px;
border-radius: ${style.variables.borderRadious.main};
`;

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

export const SearchInput = ({
  searchingQuery,
  onChange,
  name,
  placeholder,
  disabled,
  ofType,
}) => (
  <SearchInputWrapper>
    <MagnifyingGlassIconWrapper>{magnifyingGlassIcon}</MagnifyingGlassIconWrapper>
    <CustomSearchInput
      type="text"
      name={name}
      value={searchingQuery}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={`${ofType} input`}
    />
  </SearchInputWrapper>
);

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

SearchInput.propTypes = {
  searchingQuery: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  ofType: PropTypes.string,
};

SearchInput.defaultProps = {
  searchingQuery: undefined,
  onChange: () => {},
  name: 'search',
  placeholder: 'search',
  disabled: false,
  ofType: undefined,
};
