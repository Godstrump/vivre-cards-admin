import Stack from "@mui/material/Stack"
import { StackProps } from "@mui/system"
import styled from "@mui/system/styled"
import Props from "../../types/props.type"
import { TextThemeProps } from "../../types/style-types"
import VerifiedIcon from '@mui/icons-material/Verified';
import PauseIcon from '@mui/icons-material/PauseCircleFilled';
import DangerousIcon from '@mui/icons-material/Dangerous';

interface StatusBadgeProps extends Props { }

const StatusBadge = ({ status, isError, ...props }: StatusBadgeProps): JSX.Element => {
    
    const handleStatus = (status: unknown, complianceErr: unknown) => {
        if ((status === 'false' && !complianceErr) || !status && !complianceErr || status === 'PENDING' && !complianceErr) return {
            bkg: '#C4C4C4',
            color: '#FFF',
            status: <Stack 
                    spacing={2}
                    direction="row" 
                    justifyContent="center" 
                    alignItems="center"
                    >
                        <PauseIcon fontSize="small" />PENDING
                    </Stack>
        }

        if ((status === 'false' && complianceErr) || !status && complianceErr) return {
            bkg: '#FF0000',
            color: '#FFF',
            status: <Stack 
                        spacing={2}
                        direction="row" 
                        justifyContent="center" 
                        alignItems="center"
                    >
                            <DangerousIcon fontSize="small" />DENIED
                    </Stack>
        }
        return {
            bkg: '#DDF2E5',
            color: '#1E6262',
            status: <Stack 
                        spacing={2}
                        direction="row" 
                        justifyContent="center" 
                        alignItems="center"
                    >
                            <VerifiedIcon fontSize="small" />VERIFIED
                    </Stack>
        }
    }

    return (
        <Badge
            {...props}
            fc={handleStatus(status, isError).color}
            bkg={handleStatus(status, isError).bkg}
        >
            {handleStatus(status, isError).status}
        </Badge>
    )
}

const Badge = styled(Stack)<StackProps>(
    ({ theme, ...props }: TextThemeProps) => `
    padding: 5px;
    background-color: ${props?.bkg};
    color: ${props?.fc};
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 10px;
`)

export default StatusBadge