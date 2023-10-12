import React from 'react';
import styled from '@emotion/styled';
// import { css } from '@emotion/react';

import PropTypes from 'prop-types';

import capitaliseFirstLetters from '../helpers/capitaliseFirstLetters';
import styleVariables from '../styleVariables';
import {
  tickIcon,
  arrowDownIcon,
  arrowUpIcon,
  deleteIcon,
} from '../helpers/svgIcons';
// import WarningElement from './specialElements';
// import { defaultProps } from 'default-props';
// import PropTypes from 'prop-types';

const DefaultBtnWrapper = styled.div`
display: flex;
width: 100%;
// width: 14em;
cursor: pointer;
margin: 8px;
`;

const DefaultBtnContainer = styled.button`
  display: flex;
  align-content: center;
  background-color: ${styleVariables.colours.primaryBlue};
  width: 100%;
  border-radius: ${styleVariables.borderRadious.main};
  margin: 20px 0px 20px 0px;
  font-size: 18px;
  box-shadow: ${styleVariables.boxShadow.bigButton};
`;
const DefaultIconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 30px;
  margin: 5px;
`;

const DefaultLabelContainer = styled.div`
  margin: auto;
  color: ${styleVariables.colours.primaryLight};
  padding: 8px;
  min-width: 141px;
  min-height: 50px;
  max-width: 140px;
  max-height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
`;

const DefaultLabelStyle = styled.div`
display: flex;
align-items: center;
width: 50%;
font-size: 20px;
`;

const dropDownButton = {
  ContainerWrapper: styled(DefaultBtnWrapper)`
    border: solid black;
    align-content: center;
    width: 300px;
    height: 35px;
    align-items: center;
    border-radius: ${styleVariables.borderRadious.secondary};
  `,
  Container: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
  `,
  ArrowContainer: styled.div`
    height: 20px;
    width: 20px;
  `,
};

const smallBtn = {
  Wrapper: styled(DefaultBtnWrapper)`
    right: 0;
    height: 35px;
    width: 35px;
    color: black;
    background-color: ${styleVariables.colours.primaryPink};
    box-shadow: ${styleVariables.boxShadow.smallButton};
    border-radius: ${styleVariables.borderRadious.secondary};
    align-self: end;

    &:active {
      box-shadow: none;
  }
  `,
  IconContainer: styled.div`
    display: flex;
    align-items: center;
    font-size: 35px;
    margin: auto;
    width: 22px;
    height: 100%;
  `,
};

const mainBtn = {
  Wrapper: DefaultBtnWrapper,
  AddingVersionContainer: styled(DefaultBtnContainer)`
    background-color: ${styleVariables.colours.primaryPink};
    min-width: 100px;
    min-height: 50px;
    max-width: 140px;
    max-height: 60px;
    width: 90%;
    height: 90%;
    margin: 20px;
    font-size: 14px;

    &:active {
      box-shadow: none;
  }
  `,
  ClickedVersionContainer: styled.button`
    display: flex;
    align-content: center;
    background-color: ${styleVariables.colours.primaryBlue};
    width: 100%;
    border: solid ${styleVariables.colours.primaryGreen};
    border-radius: ${styleVariables.borderRadious.main};
    margin: 20px 0px 20px 10px;
    font-size: 18px;
  `,
  PlainVersionContainer: DefaultBtnContainer,
  LabelContainer: DefaultLabelContainer,
  Label: DefaultLabelStyle,
  TickBoxWrapper: styled(DefaultIconWrapper)`
    border-radius: ${styleVariables.borderRadious.main};
    background-color: ${styleVariables.colours.primaryBlue};
    min-width: 30px;
    max-width: 60px;
  `,
  TickBox: styled.div`
    border-radius: ${styleVariables.borderRadious.main};
    background-color: ${styleVariables.colours.primaryLight};
    margin: auto;
    height: 80%;
    width: 80%;
  `,
};

const TagBtn = {
  Container: styled.div`
    display: flex;
    color: white;
    background-color: ${styleVariables.colours.primaryBlue};
    height: 20px;
    width: 90px;
    margin: 5px;
    padding: 3px;
    align-items: center;
  `,
  // LabelIconWrapper: styled.div`
  //   width: 100%;
  //   height: 100%;
  // `,
  XBoxWrapper: styled.div`
    height: 100%;
    width: 25px;
    margin: 1px 2px 1px 2px;
  `,
};

const TagButton = ({
  label,
  onClickFunction,
  aria,
  withDelete,
  type,
}) => (
  <TagBtn.Container
    aria-label={aria || `${type} button`}
  >
    {label}
    {withDelete && (
    <TagBtn.XBoxWrapper
      onClick={onClickFunction}
    >
      {deleteIcon}
    </TagBtn.XBoxWrapper>
    )}
  </TagBtn.Container>
);

const SmallButton = ({
  icon,
  onClickFunction,
  // type,
  aria,
}) => (
  <smallBtn.Wrapper
    onClick={onClickFunction}
    aria-label={aria || `${icon.props['aria-label']} button`}
  >
    <smallBtn.IconContainer>{icon}</smallBtn.IconContainer>
  </smallBtn.Wrapper>
);

const MainButton = ({
  CustomButtonContainer,
  type,
  label,
  clicked,
  onClickFunction,
  aria,
  icon,
  // change all the above to 'aria-labelledby': ariaLabelledBy,
}) => {
  const props = aria || type
    ? {
      onClick: onClickFunction,
      'aria-label': aria || `${type} button`,
    }
    : {
      onClick: onClickFunction,
    };

  const isCheckbox = type === 'checkbox';
  return (
    <mainBtn.Wrapper
      {...props}
    >
      <CustomButtonContainer>
        <mainBtn.LabelContainer>
          <mainBtn.Label>{capitaliseFirstLetters(label)}</mainBtn.Label>

          {icon
          && (
          <DefaultIconWrapper>
            {icon}
          </DefaultIconWrapper>
          )}

        </mainBtn.LabelContainer>

        { isCheckbox && (
          <mainBtn.TickBoxWrapper>
            <mainBtn.TickBox>{clicked && tickIcon}</mainBtn.TickBox>
          </mainBtn.TickBoxWrapper>
        )}
      </CustomButtonContainer>
    </mainBtn.Wrapper>
  );
};

const DropDownButton = ({
  onClickFunction,
  isMenuOpen,
  freshlyAddedValue,
  chosenValue,
  type,
  aria,
}) => {
  const folderName = freshlyAddedValue?.name || chosenValue;
  const dropDownButtonTitle = (freshlyAddedValue || chosenValue)
    ? `Folder to display new part in: ${capitaliseFirstLetters(folderName)}`
    : 'Choose a folder to display part in';
  return (
    <dropDownButton.ContainerWrapper aria-label={aria || `${type} button`}>
      <dropDownButton.Container onClick={onClickFunction}>
        <div> {dropDownButtonTitle} </div>
        <dropDownButton.ArrowContainer>
          {isMenuOpen ? arrowUpIcon : arrowDownIcon}
        </dropDownButton.ArrowContainer>
      </dropDownButton.Container>
    </dropDownButton.ContainerWrapper>
  );
};

const MultiBtnComp = ({
  label,
  clicked,
  type,
  icon,
  onClickFunction,
  // renderConditional,
  isMenuOpen,
  freshlyAddedValue,
  chosenValue,
  aria,
}) => {
  if (type === 'small') {
    return (
      <SmallButton
        icon={icon}
        onClickFunction={onClickFunction}
        type={type}
        aria={aria}
      />
    );
  }
  if (type === 'add') {
    return (
      <MainButton
        CustomButtonContainer={mainBtn.AddingVersionContainer}
        type={type}
        label={label}
        clicked={clicked}
        onClickFunction={onClickFunction}
        aria={aria}
        icon={icon}
      />
    );
  }
  if (type === 'checkbox' && !!clicked) {
    return (
      <MainButton
        CustomButtonContainer={mainBtn.ClickedVersionContainer}
        type={type}
        label={label}
        clicked={clicked}
        onClickFunction={onClickFunction}
        aria={aria}
      />
    );
  }
  if (type === 'dropDown') {
    return (
      <DropDownButton
        onClickFunction={onClickFunction}
        isMenuOpen={isMenuOpen}
        freshlyAddedValue={freshlyAddedValue}
        chosenValue={chosenValue}
        type={type}
        aria={aria}
        providingAdditionalOption
      />
    );
  }
  if (type === 'tagWithX') {
    return (
      <TagButton
        onClickFunction={onClickFunction}
        label={label}
        type={type}
        aria={aria}
        withDelete
      />
    );
  }
  if (type === 'tag') {
    return (
      <TagButton
        label={label}
        type={type}
        aria={aria}
        withDelete={false}
      />
    );
  }
  return (
    <div>
      <MainButton
        CustomButtonContainer={mainBtn.PlainVersionContainer}
        label={label}
        clicked={clicked}
        onClickFunction={onClickFunction}
        aria={aria}
      />
      {/* {renderConditional(label) && <WarningElement info='will be deleted if not choosen' />} */}
    </div>
  );
};

TagButton.propTypes = {
  label: PropTypes.string,
  onClickFunction: PropTypes.func,
  aria: PropTypes.string,
  withDelete: PropTypes.bool,
  type: PropTypes.string,
};

TagButton.defaultProps = {
  label: '...',
  onClickFunction: () => {},
  aria: '',
  withDelete: false,
  type: 'checkbox', // do we need that there
};

SmallButton.propTypes = {
  icon: PropTypes.instanceOf(Object),
  onClickFunction: PropTypes.func.isRequired,
  // type: PropTypes.string, // do we need that there
  aria: PropTypes.string,
};

SmallButton.defaultProps = {
  icon: <> </>,
  // type: '',
  aria: '',
};

MainButton.propTypes = {
  CustomButtonContainer: PropTypes.instanceOf(Object), // is this the right value?
  type: PropTypes.string, // ??
  label: PropTypes.string,
  clicked: PropTypes.bool,
  onClickFunction: PropTypes.func,
  aria: PropTypes.string,
  icon: PropTypes.instanceOf(Object),
};

MainButton.defaultProps = {
  CustomButtonContainer: mainBtn.PlainVersionContainer,
  type: undefined,
  label: '...',
  clicked: false,
  onClickFunction: () => {},
  aria: '',
  icon: undefined,
};

DropDownButton.propTypes = {
  onClickFunction: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  freshlyAddedValue: PropTypes.string, // ???
  chosenValue: PropTypes.string, // ???
  type: PropTypes.string, // ??
  aria: PropTypes.string,
};

DropDownButton.defaultProps = {
  onClickFunction: () => {},
  isMenuOpen: false,
  freshlyAddedValue: '', // ??
  chosenValue: '',
  type: '', // ??
  aria: '', // ??
};

MultiBtnComp.propTypes = {
  label: PropTypes.string,
  clicked: PropTypes.bool,
  type: PropTypes.string,
  icon: PropTypes.instanceOf(Object),
  onClickFunction: PropTypes.func,
  // renderConditional: PropTypes.,
  isMenuOpen: PropTypes.bool,
  freshlyAddedValue: PropTypes.string,
  chosenValue: PropTypes.string,
  aria: PropTypes.string,
};
MultiBtnComp.defaultProps = {
  label: '...',
  clicked: false,
  type: '', // ??
  icon: undefined,
  onClickFunction: () => {},
  // renderConditional: PropTypes.,
  isMenuOpen: false,
  freshlyAddedValue: '',
  chosenValue: '',
  aria: '',
};

export default MultiBtnComp;

// refactoring:
// 'if you leave this folder empty it will be deleted'
// change all the arias and aria labelledby props to this syntax 'aria-labelledby': ariaLabelledBy,
// create emotion css components to refer partly to avoid those huge emotion blocks at the top.
// change the if statements of the main component to swap
