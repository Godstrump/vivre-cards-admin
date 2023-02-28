import { Ref } from 'preact/hooks';
import EditIcon from '@mui/icons-material/Edit';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Box, { BoxProps } from "@mui/material/Box"
import styled from "@mui/system/styled"
import RateType from "../../types/rate.type"
import CustomButton from "./custom-button"
import StackCard from "../ui/stack-cards"
import { Text, TextInput } from '../../theme/styles'
import { TargetedEvent } from 'preact/compat';
import Skeleton from '@mui/material/Skeleton';

interface RateCardProps {
    data: RateType;
    isLoading: boolean;
    showInputs: boolean;
    handleEdit: () => void;
    rateRef: Ref<HTMLInputElement>;
    chargeRef: Ref<HTMLInputElement>;
    feeRef: Ref<HTMLInputElement>;
    dataLoading: boolean;
    submit: (event: TargetedEvent<any, Event>) => Promise<void>
}

type InputTextProps = {
    isInput: boolean;
    inputRef: Ref<HTMLInputElement>;
    textName: string | number;
}

const InputText = ({ isInput, inputRef, ...props }: InputTextProps) => {
    return isInput ? 
    <RateInput variant="filled" inputRef={inputRef} /> : 
    <Text fsz={50} fw={700} lhgt={30}>{props.textName}</Text>
}

const RateCard = ({ data, isLoading, showInputs, ...props }: RateCardProps) => {
    return !props.dataLoading ? (
        <BoxCard p={3}>
            <EditIcon onClick={() => props.handleEdit()} />
            <RateBox p={5}>
                <Text fsz={20} fw={600} lhgt={17}>Rate:</Text>
                <InputText isInput={showInputs} textName={data?.rate} inputRef={props.rateRef} />
                <Text fsz={20} fw={600} lhgt={17}>Charge (%):</Text>
                <InputText textName={`${data?.charge * 100}%`} isInput={showInputs} inputRef={props.chargeRef} />
                <Text fsz={20} fw={600} lhgt={17}>Fee ($):</Text>
                <InputText isInput={showInputs} textName={`$${data?.fee}`} inputRef={props.feeRef} />
            </RateBox>
            {showInputs ? <CustomButton btnname="save" loading={isLoading} sx={{ width: '100%' }} onClick={props.submit} /> : <></>}
        </BoxCard>
  ) : <Skeleton variant="rectangular" width={509.78} height={382} sx={{ margin: 0 }} />
}

const BoxCard = styled(StackCard)
    (({ theme }) => `
    width: max-content;
    height: 30%;
    max-height: 30%;
    color: #000;

    & svg {
        align-self: flex-end;
        visibility: hidden;
        cursor: pointer;
    }

    &:hover svg {
        visibility: visible;
    }
`)

const RateBox = styled(Box)
<BoxProps>(({ theme }) => ({
    display: 'grid', 
    gridTemplateColumns: 'max-content 1fr', 
    columnGap: 64, 
    rowGap: 70 , 
    alignItems: 'flex-start', 
    justifyContent: 'center'
}))

const RateInput = styled(TextField)
<TextFieldProps>(({ theme }) => `
    width: 195.66px;
    padding: 0;
    margin: 0;
    
    & .MuiInputBase-root {
        background: ${theme?.palette.background.default};
        padding: 0;
        height: 30px;

        & fieldset {
            border: none;
        }

        & input {
            font-size: 50px;
            line-height: 30px;
            font-weight: 700;
            background-color: #FFF;
            padding: 0;
        }

        &::before {
            bottom: -10px;
        }
        
        &::after {
            bottom: -10px;
            border: 1px solid #000;
        }
    }
`)

export default RateCard