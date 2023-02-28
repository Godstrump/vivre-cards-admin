import CircularProgress from '@mui/material/CircularProgress'
import Stack, { StackProps } from '@mui/material/Stack'
import styled from '@mui/system/styled'
import { TextThemeProps } from '../../types/style-types'

const ProgressBar = ({ size }: { size: string | number }) => {
    return (
        <Wrapper my={2}>
            <CircularProgress size={size} sx={{ color: '#000' }} />
        </Wrapper>
    )
}

const Wrapper = styled(Stack)<StackProps>(
    ({ theme, ...props }: TextThemeProps) => `
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
`)

export default ProgressBar