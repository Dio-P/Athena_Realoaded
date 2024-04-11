import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import style from '../../styleVariables';

const MainContainer = styled.div`
  display: flex;
  margin: auto;
`;

const CustomeRadioBtn = styled.div`
  display: flex;
  background-color: ${(props) => style.variables.btn.ofTypeRadio[props.theme][props.active ? 'active' : 'inactive']};
  color: ${(props) => style.variables.btn.ofTypeRadio[props.theme][props.active ? 'activeTypeColour' : 'inactiveTypeColour']};
  box-shadow: ${(props) => style.variables.boxShadow[props.active ? 'large' : 'small'].dark};
  padding: 10px;
`;

const setAllElseToFalse = (allElse) => {
  const allElseFalse = {};
  Object.keys(allElse).forEach((each) => {
    allElseFalse[each] = false;
  });

  return allElseFalse;
};

const RadioBtn = ({
  label,
  value,
  setValue,
  theme,
}) => {
  const [userChosenBtn, setUserChosenBtn] = useState({});
  useEffect(() => {
    if (label) {
      const initUserChosenBtn = {};
      label.forEach((option) => {
        initUserChosenBtn[option] = false;
      });
      setUserChosenBtn(initUserChosenBtn);
    }
  }, []);

  return (
    <MainContainer role="button" value={value} theme={theme}>
      {label.map((singleLabel) => {
        const { [singleLabel]: thisBtn, ...allOtherBtn } = userChosenBtn;
        const falseAllElse = setAllElseToFalse(allOtherBtn);
        const newUserChosenBtn = { ...falseAllElse, [singleLabel]: true };
        return (
          <CustomeRadioBtn
            onClick={() => {
              setUserChosenBtn(newUserChosenBtn);
              setValue(singleLabel);
            }}
            active={userChosenBtn[singleLabel]}
            theme={theme}
          >
            {singleLabel}
          </CustomeRadioBtn>
        );
      })}
    </MainContainer>
  );
};

export default RadioBtn;

RadioBtn.propTypes = {
  label: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

RadioBtn.defaultProps = {
  value: undefined,
};
