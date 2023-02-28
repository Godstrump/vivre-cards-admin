import type { Theme } from "@mui/material/styles";
import { ExtendColorProps } from "src/types/style-types";

const extendColor = (theme: Theme, colur: ExtendColorProps) =>
    Array.isArray(colur)
        ? theme.palette[colur[0]][colur[1]]
        : colur;


export default extendColor