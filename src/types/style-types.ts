import type { Theme } from "@mui/material/styles";
import { TypographyProps } from "@mui/material/Typography";

let theme: Theme;

type Index0 = keyof typeof theme.palette
type Index1 = keyof typeof theme.palette[Index0]

export type ExtendColorProps = [Index0, Index1] | string

export type TextProps = TypographyProps & {
    ff?: string;
    fsz?: number;
    fw?: number;
    lhgt?: string;
    colur?: string;
    show?: boolean
}

export type TextThemeProps = TypographyProps & {
    theme: Theme;
    props: TextProps
}