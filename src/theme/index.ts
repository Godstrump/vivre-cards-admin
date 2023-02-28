import { PaletteMode } from "@mui/material";

const theme = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // palette values for light mode
                  primary: {
                      main: "#FFF",
                      100: "#F2F5F9",
                      body: "#F5F5F5",
                  },
                  background: {
                      default: "#FFF",
                      body: "#000",
                  },
                  text: {
                      primary: "#000",
                  },
              }
            : {
                  // palette values for dark mode
                  primary: {
                      main: "#000",
                      body: "#000",
                  },
                  background: {
                      default: "#000",
                      body: "#FFF",
                  },
                  text: {
                      primary: "#FFF",
                  },
              }),
    },
    typography: {
        h1: "2.9rem",
        h2: "2.3rem",
        h3: "1.8rem",
        h4: "1.5rem",
        h5: "1.3rem",
        h6: "1rem",

        fontFamily: ["Poppins", '"Open Sans"'].join(","),

        fontType: {
            header: "Open Sans",
            body: "Poppins",
        },

        weights: {
            xthin: 100,
            thin: 200,
            light: 300,
            regular: 400,
            medium: 500,
            bold: 600,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 1100,
            lg: 1600,
        },
    },
});

export default theme;
