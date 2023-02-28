import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { TargetedEvent } from 'preact/compat';
import { useNavigate } from 'react-router-dom';
import { useFetchUsersQuery } from '../redux/users/user-api.slice';
import User from '../types/user.type';
import Data from '../types/data-response.type';
import ApiResponse from '../types/api-response.type';
import { USERS } from '../utils/routes';
import Template from '../components/common/template';
import { userTableHeaders as tableHeaders, userDataColumns as dataColumns, PAGE_SIZE } from '../utils/constants'
// import { useAppDispatch } from '../app/hooks';

type UserQueryType = {
    data: Data<User>;
    isFetching: boolean;
    error: ApiResponse<null>
}

const Users = () => {
    const navigate = useNavigate()
    // const dispatch = useAppDispatch()
    const [tab, setTab] = useState('all')
    const { data, isFetching, error, refetch } = useFetchUsersQuery<UserQueryType>()
    const [currentPage, setCurrentPage] = useState<number>(1)

    const statuses = useMemo(() => [
        { status: 'All', tab: 'all', total: data?.totalPageSize },
        { status: 'Active', tab: 'active', total: 0 },
        { status: 'Pending', tab: 'pending', total: 0 },
        { status: 'Suspended', tab: 'suspend', total: 0 },
    ], [data?.totalPageSize])

    const handleNavigate = (e: any, id: unknown) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`${USERS}/${id}`)
    }

    const handleSuspend = (e: TargetedEvent<any, Event>, id: unknown) => {
        console.log(id);
    }

    const menuData = useMemo(() =>[
        { label: 'Suspend user', action: handleSuspend },
        { label: 'View user', action: handleNavigate },
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
        route="Users"
    />
    );
};

export default Users;
