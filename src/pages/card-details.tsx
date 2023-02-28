import { useState, useEffect, useMemo } from 'preact/hooks';
import styled from '@mui/system/styled';
import Portal from '../components/common/portal'
import BoxCard from '../components/ui/stack-cards'
import Box, { BoxProps } from '@mui/material/Box';
import CardDesign from '../components/ui/card-design';
import { TextThemeProps } from '../types/style-types';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { useFetchCardQuery } from '../redux/cards/card-api.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import CardType from '../types/card.type'
import StackDetails from '../components/common/stack-details';
import { cardTxnHeader, cardTxnsDataColumn } from '../utils/constants';
import { useAppSelector } from '../app/hooks';
import { selectDrawer } from '../redux/users/user.selectors';
import { entering, leaving } from '../theme/transitions';
import DataTable from '../components/common/data-table';
import { 
  DRAWER_WIDTH, 
  userColumns, 
  userLabels } from '../utils/constants'
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { CARDS } from '../utils/routes';
import { TargetedEvent } from 'preact/compat';
import CardTxnType from '../types/card-txns.type';
import DataResponse from '../types/data-response.type';
import UseQueryType from 'src/types/query.type';

const columns = {
  1: userColumns[1],
  2: userColumns[2],
  3: userColumns[3],
  4: userColumns[4],
  5: userColumns[7],
}

const labels = [
  {label: userLabels[0]['label'], icon: ''},
  {label: userLabels[1]['label'], icon: ''},
  {label: userLabels[2]['label'], icon: ''},
  {label: userLabels[3]['label'], icon: ''},
  {label: userLabels[6]['label'], icon: ''}
]

const userIdxArr = Object.keys(columns)

const CardPage = () => {
  const navigate = useNavigate()
  const drawer = useAppSelector(selectDrawer)
  const { pathname } = useLocation()
  const [cardId] = useState(pathname.split('/')[3])
  const { data, isFetching } = useFetchCardQuery<{ data: CardType, isFetching: boolean }>(cardId)
  const { data: cardTxnsData, isFetching: isLoading, error, refetch } = useFetchCardQuery<UseQueryType<DataResponse<CardTxnType>>>(cardId)

  const [open, setOpen] = useState(false);  
  const [currentPage, setCurrentPage] = useState(1)

  const handleExit = (e: TargetedEvent<any, Event>) => {
    // e.preventDefault();
    e.stopPropagation()
    navigate(CARDS)
    setOpen(false)
  }

  const preventExit = (e: TargetedEvent<any, Event>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (!open) setOpen(true)
  }, [open])

  useEffect(() => {
    return () => setOpen(false)
  }, [])

  const menuData = useMemo(() =>[
  ], []) 

  const handleNavigate = () => {}
  
  const handlePage = (event: TargetedEvent<any, Event>, pgn: number) => {
    event.preventDefault()
    refetch()
    setCurrentPage(pgn)
  }

  const handleCount = (total: number, size: number) => {        
    return isNaN(total) ? 1 : Math.ceil(total / size);
  }

  return (
    <Portal isOpen={open} handleClick={handleExit}>
      <StackCard onClick={preventExit} drawer={drawer} loading={isFetching}>
        <Exit onClick={handleExit}>
          <CloseIcon fontSize="inherit" color="inherit" />
        </Exit>
        <Wrapper>
          <CardDesign
            name={data?.card_name} 
            n={1}
            loading={isFetching}
            cardNumber={`**** **** **** ${data?.last_four}`} 
            expiry={`${data?.card_details?.expiration_date?.month}/${data?.card_details?.expiration_date?.year}`} 
            style={{ marginRight: 10, height: 'max-content', marginTop: 'auto', marginBottom: 'auto' }}
          />
          <Divider orientation="vertical" flexItem />
          <StackDetails 
            idxArr={userIdxArr} 
            labels={labels} 
            details={data?.owner} 
            columns={columns} 
            loading={isFetching} 
            dtsx={{ rowGap: 10 }}
            n={7}
            ifsx={{ rowGap: 10 }}
            sx={{ height: 'max-content' }}
          />
        </Wrapper>
        <BoxCard mt={1}>
          <DataTable 
              headData={cardTxnHeader}
              bodyData={cardTxnsData?.data}
              columns={cardTxnsDataColumn}
              loading={isLoading}
              handleNavigate={handleNavigate}
              menuData={menuData}
              //Pagination props
              handleChange={handlePage}
              isData={cardTxnsData?.data?.length}
              currentPage={currentPage}
              isLoading={isLoading}
              count={handleCount(cardTxnsData?.totalPageSize, cardTxnsData?.pageSize)}
          />
        </BoxCard>
      </StackCard>
    </Portal>
  )
}

const StackCard = styled(BoxCard, 
  { shouldForwardProp: (prop: string) => prop !== 'drawer' })(
  ({ theme, drawer, loading }) => ({
    ...(!loading && {     
      ...entering(theme, 'width')
    }),
    overflowX: 'hidden',
    overflowY: 'auto',
    height: 500,
    maxHeight: 500,
    position: 'relative',
    ...(drawer && {
      ...entering(theme, 'margin-left'),
      marginLeft: DRAWER_WIDTH
    }),
    ...(!drawer && {
      ...leaving(theme, 'margin-left'),
      marginLeft: 0
    })
}))

const Exit = styled(IconButton)<IconButtonProps>(
  ({ theme, ...props }) => `
  position: absolute;
  right: 0;
  top: 0;
  color: #000;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    transform: scale(1.8)
  }
`)

const Wrapper = styled(Box)<BoxProps>(
  ({ theme, ...props }: TextThemeProps) => `
  width: 100%;
  display: grid;
  grid-template-columns: calc(50% - 5px) 10px calc(50% - 5px);
  white-space: wrap;
`)

export default CardPage