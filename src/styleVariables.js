import styled from '@emotion/styled';

// const lightthemeStylehadow = '#2b2a28';

// export const chosenthemeStyle = (themeStyleName) => {
//   switch (themeStyleName) {
//     case 'light': return 'lightthemeStyle';
//     case 'dark': return 'darkthemeStyle';
//     default: return 'lightthemeStyle';
//   }
// };

export const colours = {
  primaryBlue: '#1d4587',
  primaryPink: '#e6056e',
  primaryGreen: '#1ee685',
  primaryOrange: '#458406',
  secondaryBlue: '#8A96E5',
  secondaryPink: '#FD81B5',
  secondaryOrange: '#E09200',
  tertiaryBlue: '#D0D6F6',
  tertiaryPink: '#FCB0D0',
  tertiaryOrange: '#FFA500',
  primaryLight: '#ffffff',
  secondaryLight: '#fcfaf5',
  primaryDark: '#11223d',
  secondaryDark: '#2b2a28',
  black: '#000000',
  grey: '#808080',
};

export const themeStyle = {
  light: {
    backgroundColour: colours.primaryLight,
    defaultTypeColour: colours.secondaryDark,
    shadow: colours.secondaryDark,
    defaultBtn: {
      typeColour: colours.primaryLight,
      backgroundColour: colours.primaryBlue,
    },
    addBtn: {
      typeColour: colours.primaryLight,
      backgroundColour: colours.primaryPink,
    },
    smallBtn: {
      typeColour: colours.primaryLight,
      backgroundColour: colours.primaryPink,
    },
    tagBtn: {
      typeColour: colours.primaryLight,
      backgroundColour: colours.primaryBlue,
    },
    radioBtn: {
      activeTypeColour: colours.black,
      inactiveTypeColour: colours.grey,
      typeColour: colours.black,
      backgroundColour: colours.primaryPink,
      active: colours.primaryPink,
      inactive: colours.secondaryPink,
    },
  },
  dark: {
    backgroundColour: colours.primaryDark,
    defaultTypeColour: colours.secondaryLight,
    shadow: colours.secondaryLight,
    defaultBtn: {
      typeColour: colours.primaryLight,
      backgroundColour: colours.primaryLight,
    },
    addBtn: {
      typeColour: colours.primaryLight,
      backgroundColour: colours.primaryPink,
    },
    smallBtn: {
      typeColour: colours.primaryLight,
      backgroundColour: colours.primaryPink,
    },
    tagBtn: {
      typeColour: colours.primaryDark,
      backgroundColour: colours.primaryLight,
    },
    radioBtn: {
      activeTypeColour: colours.black,
      inactiveTypeColour: colours.grey,
      backgroundColour: colours.primaryPink,
      active: colours.primaryPink,
      inactive: colours.secondaryPink,
    },
  },
};

const style = {
  variables: {
    typeColour: {
      light: themeStyle.light.defaultTypeColour,
      dark: themeStyle.dark.defaultTypeColour,
    },
    backgroundColour: {
      light: themeStyle.light.backgroundColour,
      dark: themeStyle.dark.backgroundColour,
    },
    btn: {
      ofTypeDefault: {
        light: themeStyle.light.defaultBtn.backgroundColour,
        dark: themeStyle.dark.defaultBtn.backgroundColour,
      },
      ofTypeAdd: {
        light: themeStyle.light.addBtn,
        dark: themeStyle.dark.addBtn,
      },
      ofTypeSmall: {
        light: themeStyle.light.smallBtn,
        dark: themeStyle.dark.smallBtn,
      },
      ofTypeRadio: {
        light: themeStyle.light.radioBtn,
        dark: themeStyle.dark.radioBtn,
      },
      ofTypeTag: {
        light: themeStyle.light.tagBtn,
        dark: themeStyle.dark.tagBtn,
      },
    },
    boxShadow: {
      large: {
        light: `${themeStyle.light.shadow} 0.5em 0.5em 0.3em`,
        dark: `${themeStyle.dark.shadow} 0.5em 0.5em 0.3em`,
      },
      small: {
        light: `${themeStyle.light.shadow} 0.2em 0.2em 0.1em`,
        dark: `${themeStyle.dark.shadow} 0.2em 0.2em 0.1em`,
      },
    },
    borderRadious: {
      main: '15px 10%',
      secondary: '10px',
    },
    popupElements: {
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
  },
};

export default style;
