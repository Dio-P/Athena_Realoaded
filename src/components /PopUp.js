import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import style from '../styleVariables';
import { deleteIcon } from '../helpers/svgIcons';
import { OverlayElem } from './specialElements';
import MultiBtnComp from './MultiBtnComp';

const PopUpWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

// the bellow height needs to change when I find a best way to make this iteractive
const PopUpContainer = styled.div`
  z-index: 101;
  position: absolute;
  width: auto;
  height: 90%;
  margin-left: -400px;
  left: 50%;
  margin-bottom: -400px;
  bottom: 50%;
`;

const ComponentToDisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${style.variables.colours.primaryLight};
`;

const PopUp = ({ isPopUpOpen, ComponentToDisplay, setIsPopUpOpen }) => (
  isPopUpOpen && (
    <PopUpWrapper>
      <OverlayElem />
      <PopUpContainer>
        <ComponentToDisplayWrapper>
          <MultiBtnComp
            onClickFunction={() => setIsPopUpOpen(false)}
            type="small"
            icon={deleteIcon}
          />
          <ComponentToDisplay />
        </ComponentToDisplayWrapper>
      </PopUpContainer>
    </PopUpWrapper>
  )
);

PopUp.propTypes = {
  isPopUpOpen: PropTypes.bool,
  ComponentToDisplay: PropTypes.instanceOf(Object).isRequired,
  setIsPopUpOpen: PropTypes.func,
};

PopUp.defaultProps = {
  isPopUpOpen: false,
  setIsPopUpOpen: () => {},
};

export default PopUp;
