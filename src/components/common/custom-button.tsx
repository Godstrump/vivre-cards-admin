import Button, { ButtonProps } from "@mui/material/Button";
import styled from "@mui/system/styled";
import BtnProps from "../../types/custom-button.type";
import ProgressCircle from "./progress-circle";



const CustomButton = ({ btnname, isLoading, ...props}: BtnProps) => {
  return (
    <ActionBtn {...props}>
        {isLoading ? <ProgressCircle size={20} /> : btnname}
    </ActionBtn>
  )
}

const ActionBtn = styled(Button)<ButtonProps>
(({ theme }) => `
  background-color: #000;
  cursor: pointer;
  width: max-content;
  min-width: 120px;
  height: 45px;

  &[disabled] {
    opacity: 0.5;
    color: #DCDAD1;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #424242;
  }
`)

export default CustomButton