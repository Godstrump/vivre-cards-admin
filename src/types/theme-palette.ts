import { PaletteOptions } from "@mui/material";

interface ThemePalette extends PaletteOptions {
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
}

export default ThemePalette