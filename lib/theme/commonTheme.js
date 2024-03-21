import {
  ColorIconInverse,
  ColorIconSubtle,
  ColorTextDisabled,
  ColorTextInverse,
  ColorTextPrimary,
  ColorTextPrimarySubtle,
} from "./build/js/tokens";
import {
  error,
  neutralGrey,
  orange,
  primary,
  purple,
  secondary,
  success,
} from "./colors";

export const paletteTheme = {
  // palette values for light mode

  // primary
  primary: {
    main: primary[60],
    contrastText: "#fff",
  },
  // secondary
  secondary: {
    main: secondary[60],
  },
  // error
  error: {
    main: error[60],
    contrastText: "#fff",
  },
  // warning
  warning: {
    main: orange[60],
    contrastText: "#fff",
  },
  // info
  info: {
    main: purple[60],
    contrastText: "#fff",
  },

  // success
  success: {
    main: success[60],
    contrastText: "#fff",
  },

  // grey
  grey: {
    main: neutralGrey[60],
    contrastText: "#fff",
  },

  contrastText: "#fff",
  text: {
    primary: ColorTextPrimary,
    secondary: ColorTextPrimarySubtle,
  },
};
export const paletteDarkTheme = {
  // palette values for dark mode
  primary: purple,
  divider: purple[70],
  background: {
    default: purple[90],
    paper: purple[90],
  },
  // text: {
  //   primary: "#fff",
  //   secondary: grey[500],
  // },
};
export const buttonTheme = {
  MuiButtonBase: {
    defaultProps: {
      // The props to change the default for.
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },

  MuiButton: {
    variants: [
      {
        props: { variant: "outlined" },
        style: {
          textTransform: "none",
          color: ColorTextPrimary,
          border: `1px solid ${ColorTextPrimary}`,
          // "&.MuiButton-outlinedPrimary": {
          //   color: "red",
          //   borderColor: "red",
          // },
        },
      },
      {
        props: { variant: "contained" },
        style: {
          textTransform: "none",
          color: ColorTextInverse,
          "& .MuiIcon-root": {
            color: ColorIconInverse,
          },
        },
      },
      {
        props: { disabled: true },
        style: {
          "& .MuiIcon-root": {
            color: ColorIconSubtle,
          },
        },
      },
    ],
    styleOverrides: {
      root: {
        padding: "8px 24px",
        height: "34px",
        // borderRadius: 6,
      },
    },
  },
};
export const buttonDarkTheme = {
  MuiButtonBase: {
    defaultProps: {
      // The props to change the default for.
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  MuiButton: {
    // variants: [
    //   {
    //     props: { variant: "contained" },
    //     style: {
    //       textTransform: "none",
    //       border: `10px dashed red`,
    //     },
    //   },
    // ],
    // styleOverrides: {
    //   // Name of the slot
    //   root: {
    //     // Some CSS
    //     fontSize: "1rem",
    //   },
    // },
  },
};

export const inputOutlineTheme = {
  styleOverrides: {
    root: {
      height: "42px",

      "& .MuiInputBase-input": {
        // backgroundColor: ColorTextInverse,
        border: 0,
        fontSize: 14,
        fontWeight: 400,
        color: ColorTextPrimary,
        padding: "12px 16px",
        fontFamily: "'Inter','Noto-Sans-Myanmar', sans-serif",
        "&::placeholder": {
          color: ColorTextDisabled,
          opacity: 1,
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: 6,
        borderColor: neutralGrey[30],
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: primary[60],
      },
      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: neutralGrey[30],
        borderWidth: 1,
      },
      "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: neutralGrey[30],
        borderWidth: 1,
      },
    },
  },
};

export const paperTheme = {
  MuiPaper: {
    styleOverrides: {
      // Name of the slot
      root: {
        // Some CSS
        color: ColorTextPrimary,
      },
    },
  },
};
