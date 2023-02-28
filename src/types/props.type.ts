import { StyledComponentProps, SxProps } from "@mui/material";
import { CSSProperties } from "preact/compat";

interface Props {
    [x: string | number]: CSSProperties | StyledComponentProps | SxProps | JSX.Element[] | JSX.Element | string | number | unknown
}

export default Props