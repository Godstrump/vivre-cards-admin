import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { Fragment, TargetedEvent } from 'preact/compat';
import ApiResponse from '../types/api-response.type';
import { CARDS } from '../utils/routes';
import Template from '../components/common/template'
import { useFetchAllCardsQuery } from '../redux/cards/card-api.slice';
import DataResponse from '../types/data-response.type';
import CardType from '../types/card.type';
import { cardsTableHeaders as tableHeaders, cardsDataColumns as dataColumns, PAGE_SIZE } from '../utils/constants'

type UserQueryType = {
    data: DataResponse<CardType>;
    isFetching: boolean;
    error: ApiResponse<null>
}

const Cards = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState('all')
    const { data, isFetching, error, refetch } = useFetchAllCardsQuery<UserQueryType>()
    const [currentPage, setCurrentPage] = useState<number>(1)

    const statuses = useMemo(() => [
        { status: 'All', tab: 'all', total: data?.totalPageSize },
        { status: 'Active', tab: 'active', total: 0 },
        { status: 'Frozen', tab: 'pending', total: 0 },
    ], [data?.totalPageSize])

    const handleNavigate = (e: any, id: unknown) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`${CARDS}/${id}`)
    }

    const handleSuspend = (e: TargetedEvent<any, Event>, id: unknown) => {
        console.log(id);

    }

    const handleDetails = (e: TargetedEvent<any, Event>, id: unknown) => {
        console.log(id);
    }

    const menuData = useMemo(() =>[
        { label: 'Freeze card', action: handleSuspend },
        { label: 'View card', action: handleDetails },
    ], [])

    const handleCurrentPage = (pgn: number) => {
        refetch()
        setCurrentPage(pgn);
    }


    // useEffect(() => {
    //   switch (tab) {
    //     case value:

    //         break;

    //     default:
    //         break;
    //   }

    //   return () => {

    //   }
    // }, [tab])


    return (
        <Fragment>
            <Template 
                statuses={statuses} 
                tableHeaders={tableHeaders} 
                columns={dataColumns}
                tableData={data?.data}
                tab={tab}
                handleTab={setTab}
                handleNavigate={handleNavigate}
                isFetching={isFetching}
                totalPageSize={data?.totalPageSize}
                pageSize={PAGE_SIZE}
                menuData={menuData}
                getCurrentPage={handleCurrentPage}
                currentPage={currentPage}
                route="Cards"
            />
            <Outlet />
        </Fragment>
    );
};

export default Cards;
