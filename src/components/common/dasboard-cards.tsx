import { JSXInternal } from 'preact/src/jsx';
import Stack from '@mui/material/Stack'
import styled from '@mui/system/styled'
import StackCard from '../ui/stack-cards'
import { Text } from '../../theme/styles'
import Skeleton from '@mui/material/Skeleton';

interface DashboardCardsProps {
  cardName: string;
  total: number;
  icon: JSXInternal.Element;
  loading: boolean
}

const DashboardCards = ({ cardName, total, icon, ...props }: DashboardCardsProps) => {
  
  return !props.loading ? (
    <BoxCard p={3} spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          {icon}
          <Text fsz={20} fw={600}>{cardName}</Text>
        </Stack>
        <Text asx={{ alignSelf: 'flex-end' }} fsz={19} fw={700}>{total}</Text>
    </BoxCard>
  ) : (
    <Skeleton variant="rectangular" width='100%' height={107} sx={{ margin: 0 }} />
  )
}

const BoxCard = styled(StackCard)
    (({ theme }) => `
    width: 100%;
    height: max-content;
    max-height: max-content;
    color: #000;
    background-color: #FFF;
`)

export default DashboardCards