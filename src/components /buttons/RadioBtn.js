import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import style from '../../styleVariables';
import ThemeContext from '../../context/ThemeContext';

const theme = useContext(ThemeContext);

const MainContainer = styled.div`
  display: flex;
  color: 
`;

const TwinBtn = styled.div`
  display: flex;
  background-color: : ${(props) => style.variables.btn.ofTypeRadio[theme][props.active ? 'active' : 'inactive']};

`;

const RadioBtn = ({
  leftLabel,
  rightLabel,
  value,
  setValue,
}) => {
  const [userChoseBtn, setUserChoseBtn] = useState({ left: false, right: false });
  return (
    <MainContainer role="button" value={value}>
      <TwinBtn
        onClick={() => {
          setUserChoseBtn({ left: true, right: false });
          setValue(leftLabel);
        }}
        active={userChoseBtn.left}
      >
        {leftLabel}
      </TwinBtn>
      <TwinBtn
        onClick={() => {
          setUserChoseBtn({ left: false, right: true });
          setValue(rightLabel);
        }}
        active={userChoseBtn.right}
      >
        {rightLabel}
      </TwinBtn>
    </MainContainer>
  );
};

export default RadioBtn;

RadioBtn.propTypes = {
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

RadioBtn.defaultProps = {
  value: undefined,
};
