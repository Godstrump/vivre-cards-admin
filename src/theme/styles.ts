import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import Typography, { TypographyProps} from "@mui/material/Typography";
import extendColor from '../utils/extend-color'
import { TextThemeProps } from "../types/style-types";
import { TableCell, TableCellProps, TextField, TextFieldProps } from "@mui/material";
import { entering } from "./transitions";

export const Img = styled("img")(({ theme, ...props }) => ({
    height: props?.hgt,
    width: props?.wdth,
    objectFit: props?.obf ?? "cover",
    objectPosition: "center",
    backgroundOrigin: "border-box",
    backgroundClip: "border-box",
    position: "static",
    border: props?.border ?? "none",
    borderRadius: props?.br ?? 0,
}));

export const Wrapper = styled(Box)(({theme}) => ({
    width: '100%',
    maxWidth: '100%',
    borderRadius: 5,
    padding: 10,
}))

export const Text = styled(Typography)
    <TypographyProps>
(
    ({ theme, ...props }: TextThemeProps) => `
    display: flex;
    color: ${extendColor(theme, props?.colur)};
    font-family: ${props?.ff ?? 'Poppins'};
    font-size: ${props?.fsz ?? 16}px;
    font-weight: ${props?.fw ?? 500};
    line-height: ${props?.lhgt ?? '19'}px;
  `
) as typeof Typography

export const Tablecell = styled(TableCell)<TableCellProps>(
    ({ theme, ...props }: TextThemeProps) => `
        padding: 12px;
        font-size: .7vw;
        font-weight: ${props?.fw ?? 400};
        font-family: ${props?.ff ?? 'Poppins'};
        display: ${props?.show ? 'table-cell' : 'none'};
    `
)

export const TextInput = styled(TextField)<TextFieldProps>
    (({ theme }) => `
    width: 400px;
    border: none;
    margin: 0;
    border-radius: 6px;
    
    & .MuiInputBase-root {
        background: ${theme?.palette.background.default};
        border: 1px solid #e3e3e3;
        border-radius: 6px;
        font-family: Poppins;
        height: 50px;

        & fieldset {
            border: none;
        }

        & input {
            border: none;
            font-size: 14px;
            line-height: 18px;
            font-weight: 400;
        }

        & input[disabled] {
            cursor: not-allowed;
        }

        &:hover {
            outline: 1px solid ${theme.palette.background.body};
            transitions: all .5s
        }
    }
`)
