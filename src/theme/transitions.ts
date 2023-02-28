import { Theme, CSSObject } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../utils/constants";

let theme: Theme;

type EaseType = keyof typeof theme.transitions.easing

export const entering = (
    theme: Theme,
    type: Array<string> | string,
    tx?: EaseType
): CSSObject => ({
    transition: theme.transitions.create(type, {
        easing: theme.transitions.easing[tx ?? 'sharp'],
        duration: theme.transitions.duration.enteringScreen,
    }),
});

export const leaving = (
    theme: Theme,
    type: Array<string> | string,
    tx?: EaseType
): CSSObject => ({
    transition: theme.transitions.create(type, {
        easing: theme.transitions.easing[tx ?? 'sharp'],
        duration: theme.transitions.duration.leavingScreen,
    }),
});

export const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    ...entering(theme, "width"),
    overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
    ...leaving(theme, "width"),
    overflowX: "hidden",
    zIndex: "1500",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
