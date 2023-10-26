import styled from '@emotion/styled';

// const lightThemeShadow = '#2b2a28';

// export const chosenTheme = (themeName) => {
//   switch (themeName) {
//     case 'light': return 'lightTheme';
//     case 'dark': return 'darkTheme';
//     default: return 'lightTheme';
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
};

const themes = {
  light: {
    backgroundColour: colours.primaryLight,
    defaultType: colours.primaryLight,
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
  },
  dark: {
    backgroundColour: colours.primaryDark,
    defaultType: colours.primaryLight,
    shadow: colours.secondaryLight,
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
  },
};

const style = {
  variables: {
    backgroundColour: {
      light: colours.primaryLight,
      dark: colours.primaryDark,
    },
    btn: {
      typeDefault: {
        light: themes.light.defaultBtn,
        dark: themes.dark.defaultBtn,
      },
      typeAdd: {
        light: themes.light.addBtn,
        dark: themes.dark.addBtn,
      },
      typeSmall: {
        light: themes.light.smallBtn,
        dark: themes.dark.smallBtn,
      },
    },
    boxShadow: {
      large: {
        light: `${themes.light.shadow} 0.5em 0.5em 0.3em`,
        dark: `${themes.dark.shadow} 0.5em 0.5em 0.3em`,
      },
      small: {
        light: `${themes.light.shadow} 0.2em 0.2em 0.1em`,
        dark: `${themes.dark.shadow} 0.2em 0.2em 0.1em`,
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
