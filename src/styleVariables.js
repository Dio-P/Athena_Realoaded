import styled from "@emotion/styled";

const styleVariables = {
  colours: {
    primaryBlue: "#1d4587",
    primaryPink: "#e6056e",
    primaryGreen: "#1ee685",
    primaryOrange: "#458406",
    secondaryBlue: "#8A96E5",
    secondaryPink: "#FD81B5",
    secondaryOrange: "#E09200",
    tertiaryBlue: "#D0D6F6",
    tertiaryPink: "#FCB0D0",
    tertiaryOrange: "#FFA500",
    primaryLight: "#ffffff",
  },
  borderRadious: {
    main: "15px 10%",
    secondary: "10px",
  },
  boxShadow: {
    bigButton: "#2b2a28 0.5em 0.5em 0.3em",
    smallButton: "#2b2a28 0.2em 0.2em 0.1em",
  },
  popupElements:{
    LabelInputPair: styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 5px 20px ;
    & label {
      margin-bottom: 5px;
    }
  }`,
  },
  // customStyledElements: {
  //   SmallButton: styled.div`
  //   display: flex;
  //   align-items: center;
  //   font-size: 35px;
  //   margin: auto;
  //   height: 100%;
  //   cursor: pointer;
  // `
  // },
};

export default styleVariables;
