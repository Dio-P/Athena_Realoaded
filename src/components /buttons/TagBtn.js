import React, { useContext } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import ThemeContext from '../../context/ThemeContext';

import style from '../../styleVariables';
import { deleteIcon } from '../../helpers/svgIcons';

const Container = styled.div`
    display: flex;
    color: white;
    background-color:  ${(props) => style.variables.btn.ofTypeTag[props.theme].backgroundColour};
    height: 20px;
    max-width: 200px;
    margin: 5px;
    padding: 3px;
    align-items: center;
  `;

const LabelWrapper = styled.div`
    height: 100%;
    margin: 1px 2px 1px 2px;
  `;

const XBoxWrapper = styled.div`
    height: 100%;
    width: 25px;
    margin: 1px 2px 1px 2px;
  `;

const XBox = ({ onClickDelete }) => (
  <XBoxWrapper
    onClick={onClickDelete}
  >
    {deleteIcon}
  </XBoxWrapper>
);

const TagBtn = ({
  label,
  onClickDelete,
  aria,
  hasDeleteOption,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Container
      aria-label={aria}
      theme={theme}
    >
      <LabelWrapper>
        {label}
      </LabelWrapper>
      {hasDeleteOption && (
      <XBox onClickDelete={onClickDelete} />
      )}
    </Container>
  );
};

XBox.propTypes = {
  onClickDelete: PropTypes.func.isRequired,
};

TagBtn.propTypes = {
  label: PropTypes.string,
  onClickDelete: PropTypes.func,
  aria: PropTypes.string,
  hasDeleteOption: PropTypes.bool,
};

TagBtn.defaultProps = {
  label: undefined,
  onClickDelete: () => {},
  aria: '',
  hasDeleteOption: false,
};

export default TagBtn;
