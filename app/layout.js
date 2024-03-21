"use client";
import Image from "next/image";
import { StoreProvider } from "./StoreProvider";
import {
  buttonTheme,
  inputOutlineTheme,
  paletteTheme,
  paperTheme,
} from "../lib/theme/commonTheme";
import "./styles/globals.css";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { typoSystem } from "../lib/theme/typoSystem";
import React from "react";
import { neutralGrey } from "../lib/theme/colors";
import { ColorIconSubtle } from "../lib/theme/build/js/tokens";
import { CssBaseline } from "@mui/material";

export default function RootLayout({ children }) {
  const theme = React.useMemo(
    () =>
      createTheme({
        spacing: (factor) => `${0.25 * factor}rem`, // (Bootstrap strategy)
        palette: {
          ...paletteTheme,
        },
        components: {
          ...paperTheme,
          buttonTheme,
          MuiOutlinedInput: { ...inputOutlineTheme },
          MuiDivider: {
            styleOverrides: {
              root: {
                color: neutralGrey[30],
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                // borderRadius: "10px",
                height: "24px",
              },
              label: {
                // color: neutralGrey[70],
                // paddingRight: "4px",
              },
              avatar: {
                width: "18px",
                height: "18px",
              },
              // sizeSmall: {},
              sizeCustom: {
                fontSize: "24px",
              },
              // borderPill: {
              //   borderRadius: "100px",
              // },
              // borderRounded: {
              //   borderRadius: "3px",
              // },
            },
          },
          MuiMenu: {
            styleOverrides: {
              list: {
                // padding: "8px",
                borderRadius: "4px",
              },
            },
          },
          MuiList: {
            styleOverrides: {
              root: {
                borderRadius: "4px",
                padding: 0,
              },
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                "&:hover": {
                  background: "transparent",
                  // backgroundColor: primary[10],
                },
              },
            },
          },
          MuiListItemText: {
            styleOverrides: {
              root: {
                // paddingLeft: 12,
              },
            },
          },
          MuiListItemIcon: {
            styleOverrides: {
              root: {
                // color: neutralGrey[60],
                minWidth: "initial",
                margin: 0,
              },
            },
          },
          MuiCssBaseline: {
            // styleOverrides: `
            // // @font-face {
            // //   font-family: 'AvenirBold';
            // //   font-style: normal;
            // //   font-display: swap;
            // //   // font-weight: 400;
            // //   src:  url(${AvenirBold}) format('truetype');
            // // }
            // `,
          },
          MuiTableRow: {
            styleOverrides: {
              root: {
                "&.MuiTableRow-hover:hover": {
                  backgroundColor: "#f0f7fd", // Customize the hover background color
                },
              },
            },
          },
          MuiIcon: {
            styleOverrides: {
              root: {
                fontSize: 16,
                color: ColorIconSubtle,
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: ColorIconSubtle,
              },
            },
          },
        },
        shape: {
          borderRadius: 4,
        },
        typography: {
          ...typoSystem,
          button: {
            fontSize: "0.875rem", // set font size for button variant
            fontWeight: "600",
            lineHeight: "18px",
            textTransform: "capitalize",
            "&.MuiButton-sizeSmall": {
              fontSize: "0.75rem",
              lineHeight: "16px",
            },
            "&.MuiButton-sizeLarge": {
              fontSize: "1rem",
              lineHeight: "20px",
            },
          },
        },
      }),
    []
  );
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>Test</title>

          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/icons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
        </head>
        <body>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
