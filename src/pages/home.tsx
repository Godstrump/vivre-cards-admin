import { TargetedEvent } from "preact/compat"
import { useMemo, useRef, useState } from "preact/hooks"
import Stack from "@mui/material/Stack"
import { useFetchRateQuery, useFetchTotalDepositQuery, useFetchTotalSpentQuery, useSaveRateMutation } from "../redux/txns/txn-api.slice"
import RateType from "../types/rate.type"
import RateCard from "../components/common/rate-card"
import DashboardCards from "../components/common/dasboard-cards"
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import styled from '@mui/system/styled'
import Box, { BoxProps } from '@mui/material/Box'
import CardTxnType, { CardsTotalSpent } from "../types/card-txns.type"
import { TotalTxnDeposit } from "../types/txn.type"
import UseQueryType from "../types/query.type"
import { useFetchTotalUsersQuery } from "../redux/users/user-api.slice"
import { TotalUsersType } from "../types/user.type"
import Table from "../components/ui/table"
import { cardTxnHeader, cardTxnsDataColumn } from "../utils/constants"
import { useFetchAllCardTxnsQuery } from "../redux/cards/card-api.slice"
import Data from "../types/data-response.type";
import StackCard from "../components/ui/stack-cards"

const Home = () => {
    const { data, isFetching } = useFetchRateQuery<{ data: RateType, isFetching: boolean }>()
    const [mutate, { isLoading }] = useSaveRateMutation<{ mutate: RateType, isLoading: boolean }>()
    const { data: cardTotalSpent, isFetching: loadingTotalSpent } = useFetchTotalSpentQuery<UseQueryType<CardsTotalSpent>>()
    const { data: totalDeposit, isFetching: loadingTotalDeposit } = useFetchTotalDepositQuery<UseQueryType<TotalTxnDeposit>>()
    const { data: totalUsers, isFetching: loadingTotalUsers } = useFetchTotalUsersQuery<UseQueryType<TotalUsersType>>()
    const { data: cardTxnsData, isFetching: loadingTxns } = useFetchAllCardTxnsQuery<UseQueryType<Data<CardTxnType>>>({pgs: 5, pgn: 1})
    const [edit, setEdit] = useState(false)
    const rateRef = useRef<HTMLInputElement>(null)
    const feeRef = useRef<HTMLInputElement>(null)
    const chargeRef = useRef<HTMLInputElement>(null)

    const handleEdit = () => {        
        setEdit(prev => !prev)
    }

    const handleSubmit = async (event: TargetedEvent<any, Event>) => {
        event.preventDefault()
        event.stopPropagation()
        const rate = rateRef.current?.value;
        const fee = feeRef.current?.value;
        const charge = chargeRef.current?.value
        if (rate && fee && charge) {
            await mutate({
                rate: +rate,
                fee: +fee,
                charge: +charge
            })
        }
        setEdit(false)
    }

    const Lists = useMemo(() => 
        [
            { label: 'Users', icon: <PeopleIcon />, total: totalUsers?.totalUsers, loading: loadingTotalUsers },
            { label: 'Active Users', icon: <PeopleIcon />, total: totalUsers?.totalActiveUsers, loading: loadingTotalUsers },
            { label: 'Total spent', icon: <MonetizationOnIcon />, total: cardTotalSpent?.totalSpent, loading: loadingTotalSpent },
            { label: 'Deposits', icon: <CreditScoreIcon />, total: totalDeposit?.totalDeposits ?? 0, loading: loadingTotalDeposit }
        ]
    ,[cardTotalSpent, totalDeposit, totalUsers, loadingTotalDeposit, loadingTotalUsers, loadingTotalUsers])

    return (
        <Stack spacing={6} pb={5}>
            <Totalcards>
                {Lists.map(item => 
                    <DashboardCards 
                        cardName={item.label} 
                        total={item.total} 
                        icon={item.icon} 
                        loading={item.loading}
                    />
                )}
            </Totalcards>
            <RateCard 
                data={data} 
                dataLoading={isFetching}
                isLoading={isLoading} 
                handleEdit={handleEdit} 
                rateRef={rateRef}
                chargeRef={chargeRef}
                feeRef={feeRef}
                showInputs={edit}
                submit={handleSubmit}
            />
            <StackCard>
                <Table
                    headData={cardTxnHeader}
                    bodyData={cardTxnsData?.data}
                    columns={cardTxnsDataColumn}
                    loading={loadingTxns}
                />  
            </StackCard>
        </Stack>
    )
}

const Totalcards = styled(Box)<BoxProps>(({ theme }) => `
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 50px;
`)

export default Home