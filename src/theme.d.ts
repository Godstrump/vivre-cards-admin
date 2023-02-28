import {
    Theme as MUITheme,
    ThemeOptions as MUIThemeOptions,
    PaletteOptions as MUIPaletteOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Theme extends MUITheme {
        palette: {
            primary: {
                main: string;
                body: string;
            };
            background: {
                default: string;
                body: string;
            };
            text: {
                primary: string;
            };
        };
        typography: {
            h1: string;
            h2: string;
            h3: string;
            h4: string;
            h5: string;
            h6: string;
    
            fontFamily: string;
    
            fontType: {
                header: string;
                body: string;
            };    
            weights: {
                xthin: number;
                thin: number;
                light: number;
                regular: number;
                medium: number;
                bold: number;
            };
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions extends MUIThemeOptions {
        palette: {
            primary: {
                main: string;
                body: string;
            };
            background: {
                default: string;
                body: string;
            };
            text: {
                primary: string;
            };
        };
        typography: {
            h1: string;
            h2: string;
            h3: string;
            h4: string;
            h5: string;
            h6: string;
    
            fontFamily: string;
    
            fontType: {
                header: string;
                body: string;
            };    
            weights: {
                xthin: number;
                thin: number;
                light: number;
                regular: number;
                medium: number;
                bold: number;
            };
        };
    }

    interface PaletteOptions extends MUIPaletteOptions {
        palette: {
            primary: {
                main: string;
                body: string;
            };
            background: {
                default: string;
                body: string;
            };
            text: {
                primary: string;
            };
        };
    }
    export function createTheme(options?: CustomThemeOptions): Theme;
}
