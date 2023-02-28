import { useMemo, useState } from "preact/hooks";
import { Outlet, useNavigate, useParams  } from "react-router-dom"
import Stack, { StackProps } from "@mui/material/Stack";
import Box, { BoxProps } from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import styled from "@mui/system/styled";
import Button, { ButtonProps } from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import User from "../types/user.type"
import { useFetchCompanyQuery, useFetchUserQuery } from "../redux/users/user-api.slice"
import { useFetchCardsQuery } from "../redux/cards/card-api.slice";
import BoxCard from '../components/ui/stack-cards'
import { TextThemeProps } from "../types/style-types"
import StatusBadge from "../components/ui/status-badge"
import Menu from "../components/common/menu";
import { Text } from '../theme/styles'
import CreditCard from "../components/ui/card-design";
import CardType from '../types/card.type';
import Company from "../types/company.type";
import { TargetedEvent } from "preact/compat";
import Empty from "../components/common/empty";
import StackDetails from "../components/common/stack-details";
import { userColumns, userLabels, companyColumns, companyLabels, LOG_STATE } from "../utils/constants";
import { USERS } from "../utils/routes";
import { useAppDispatch } from "../app/hooks";
import { addLog } from "../redux/app-logs/app-log.reducer";

const userIdxArr = Object.keys(userColumns)
const companyIdxArr = Object.keys(companyColumns)

const UserPage = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { data, isFetching } = useFetchUserQuery<{ data: User, isFetching: boolean }>(userId)
    const { data: cardData, isFetching: isFetchingCards } = useFetchCardsQuery<{ data: CardType[], isFetching: boolean }>(userId)
    const { data: companyData, isFetching: isFetchingComppany } = useFetchCompanyQuery<{ data: Company, isFetching: boolean }>(userId)   
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };    
    const handleSuspend = (e: TargetedEvent<any, Event>, id: unknown) => {

    }

    // const handleApproval = (e: TargetedEvent<any, Event>, id: unknown) => {

    // } 

    const handleCompliance = (e: TargetedEvent<any, Event>, companyId: unknown) => {  
        e.preventDefault();
        e.stopPropagation();
        if (companyId === undefined) {
            LOG_STATE.msg = 'User compliance is null';
            LOG_STATE.location = 'User details';
            return dispatch(addLog(LOG_STATE))
        }
        navigate(`${USERS}/${userId}/view-compliance/${companyId}`)
        handleClose()
    }    

    const menuData = useMemo(() =>[
        { label: 'Suspend user', action: handleSuspend },
        { label: 'View compliance', action: (e:TargetedEvent<any, Event>) => handleCompliance(e, companyData?._id) },
    ], [companyData])    

    return (
        <BoxCard>
            <Text ml={3} my={2} ff="Open Sans" fsz={30} fw={700}>Personal details</Text>
            {!isFetching ? 
            <Wrapper>
                <UserStatus m={3}>
                    <Passport></Passport>
                    <Stack height="max-content" alignSelf="center">
                        <StatusBadge
                            sx={{ px: 3, py: 1, fontSize: 20, ml: 8 }} status={data?.hasComplianceApproved} isError={data?.hasComplianceError} />
                        <StatusButton onClick={handleClick} fontSize={30}>CHANGE STATUS</StatusButton>
                        <Menu open={open} handleClose={handleClose} anchorEl={anchorEl} data={menuData} id={userId} />
                    </Stack>
                </UserStatus>
                <Divider orientation="vertical" flexItem />
                <StackDetails 
                    idxArr={userIdxArr} 
                    labels={userLabels} 
                    details={data} 
                    columns={userColumns} 
                    loading={isFetching} 
                    sx={{ mt: .9 }}
                />
            </Wrapper> : 
            <Wrapper>
                <UserStatus>
                    <Skeleton width={200} height={400} sx={{ mt: -7.75, ml: 3.25 }} />
                    <Stack height="max-content" alignSelf="center">
                        <Skeleton width={157.08} height={46} sx={{ ml: 9 }} />
                        <Skeleton width={157.08} height={26.5} sx={{ ml: 9 }} />
                    </Stack>
                </UserStatus>
                <Divider orientation="vertical" flexItem />
            </Wrapper>}
            <Box mt={3} width="100%" mb={6.25}>
                <Text ml={3} my={2} ff="Open Sans" fsz={30} fw={700}>Company details</Text>
                <Wrapper mb="20px">
                    <StackDetails 
                        idxArr={companyIdxArr} 
                        labels={companyLabels} 
                        details={companyData} 
                        columns={companyColumns} 
                        loading={isFetchingComppany}
                        sx={{ height: 'max-content', width: '95%', maxWidth: '95%' }}
                    />
                    <Divider orientation="vertical" flexItem />
                    <Box height={550} maxHeight={550} sx={{ overflowY: 'auto'}}>
                        <FlexCards>
                            {cardData?.length && !isFetchingCards ? 
                            cardData?.map(card => 
                                <CreditCard
                                    key={card.last_four}
                                    name={card.card_name} 
                                    cardNumber={`**** **** **** ${card.last_four}`} 
                                    expiry={`${card.card_details?.expiration_date.month}/${card.card_details?.expiration_date.year}`} 
                                />
                            ) : !cardData?.length && !isFetchingCards ? <Empty wdth={190} /> :
                            [...Array(3).keys()].map(row => 
                                <Skeleton 
                                    sx={{ ml: 3, mt: -8.63, borderRadius: 5 }} 
                                    key={row} width={381} 
                                    height={380}  
                                />
                            )}
                        </FlexCards>
                    </Box>
                </Wrapper>
            </Box>
            <Outlet />
        </BoxCard>
    )
}

const Wrapper = styled(Box)<BoxProps>(
    ({ theme, ...props }: TextThemeProps) => `
    width: 100%;
    display: grid;
    grid-template-columns: calc(50% - 5px) 10px calc(50% - 5px);
    white-space: wrap;
`)

const UserStatus = styled(Box)<BoxProps>(
    ({ theme, ...props }: TextThemeProps) => `
    justify-self: flex-start;
    display: flex;
    height: max-content;
`)

const Passport = styled(Box)<BoxProps>(
    ({ theme, ...props }: TextThemeProps) => `
    width: 200px;
    height: 270PX;
    border: 1px solid #000;
`)

const StatusButton = styled(Button)<ButtonProps>(
    ({ theme, ...props}: TextThemeProps) => `
    height: max-content;
    background-color: ${theme.palette.background.body};
    color: ${theme.palette.primary.main};
    margin-left: 64px;
    margin-top: 20px;
    font-family: Open Sans;

    &:hover {
        background-color: ${theme.palette.primary.body};
        color: ${theme.palette.background.body}
    }
`)

const FlexCards = styled(Box)<BoxProps>(
    ({ theme, ...props}) => `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    height: 100%;
`)

export default UserPage