import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import style from '../../styleVariables';

const MainContainer = styled.div`
  display: flex;
  margin: auto;
`;

const LeftTwinBtn = styled.div`
  display: flex;
  background-color: ${(props) => style.variables.btn.ofTypeRadio[props.theme][props.active ? 'active' : 'inactive']};
  color: ${(props) => style.variables.btn.ofTypeRadio[props.theme][props.active ? 'activeTypeColour' : 'inactiveTypeColour']};
  box-shadow: ${(props) => style.variables.boxShadow[props.active ? 'large' : 'small'].dark};
  padding: 10px;
`;

const RightTwinBtn = styled.div`
  display: flex;
  background-color: ${(props) => style.variables.btn.ofTypeRadio[props.theme][props.active ? 'active' : 'inactive']};
  color: ${(props) => style.variables.btn.ofTypeRadio[props.theme][props.active ? 'activeTypeColour' : 'inactiveTypeColour']};
  box-shadow: ${(props) => style.variables.boxShadow[props.active ? 'large' : 'small'].dark};
  // box-shadow: 
  padding: 10px;

`;

const RadioBtn = ({
  leftLabel,
  rightLabel,
  value,
  setValue,
  theme,
}) => {
  const [userChoseBtn, setUserChoseBtn] = useState({ left: false, right: false });
  console.log('theme in radio', theme);
  return (
    <MainContainer role="button" value={value} theme={theme}>
      <LeftTwinBtn
        onClick={() => {
          setUserChoseBtn({ left: true, right: false });
          setValue(leftLabel);
        }}
        active={userChoseBtn.left}
        theme={theme}
      >
        {leftLabel}
      </LeftTwinBtn>
      <RightTwinBtn
        onClick={() => {
          setUserChoseBtn({ left: false, right: true });
          setValue(rightLabel);
        }}
        active={userChoseBtn.right}
        theme={theme}
      >
        {rightLabel}
      </RightTwinBtn>
    </MainContainer>
  );
};

export default RadioBtn;

RadioBtn.propTypes = {
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

RadioBtn.defaultProps = {
  value: undefined,
};
