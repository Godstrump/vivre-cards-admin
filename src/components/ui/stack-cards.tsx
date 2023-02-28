import Stack, { StackProps } from '@mui/material/Stack'
import styled from '@mui/system/styled'
import Props from '../../types/props.type'

const StackCard = (props: Props) => {
    return (
        <BoxCard bgcolor={'#FFF'} px={2} pt={2} pb={1} borderRadius={2} {...props}>
            {props?.children}
        </BoxCard>
    )
}

const BoxCard = styled(Stack)<StackProps>(({ theme, ...props }) => ({
    boxShadow: `0px 0px 2px .5px rgba(217,217,217,0.52)`,
}))

export default StackCard
