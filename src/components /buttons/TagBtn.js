import React, { useContext } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import ThemeContext from '../../context/ThemeContext';

import style from '../../styleVariables';
import { deleteIcon } from '../../helpers/svgIcons';

const Container = styled.div`
    display: flex;
    color: black;
    background-color:  ${(props) => style.variables.btn.ofTypeTag[props.theme].backgroundColour};
    height: 20px;
    min-width: 100px;
    // width: 100%;
    margin: 5px;
    padding: 3px;
    align-items: center;
  `;

const LabelWrapper = styled.div`
    height: 100%;
    width: 100%;
    margin: 1px 2px 1px 2px;
  `;

const DeleteBtnWrapper = styled.div`
    height: 100%;
    width: 25px;
    margin: 1px 2px 1px 2px;
  `;

const DeleteBtn = ({ onClickDelete }) => (
  <DeleteBtnWrapper
    onClick={onClickDelete}
  >
    {deleteIcon}
  </DeleteBtnWrapper>
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
      <DeleteBtn onClickDelete={onClickDelete} />
      )}
    </Container>
  );
};

DeleteBtn.propTypes = {
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
