import { ButtonProps } from "@mui/material/Button";

interface BtnProps extends ButtonProps {
    btnname: string;
    isLoading?: boolean
}

export default BtnProps